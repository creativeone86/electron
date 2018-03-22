const electron = require('electron');
require('dotenv').config();
const {
	app,
	BrowserWindow,
	Menu,
	globalShortcut,
	ipcMain
} = electron;
const menuTemplate = [
	{
		label: 'File',
		submenu: [
			{
				label: 'Add task',
				accelerator: 'CommandOrControl+N',
				click: createAddWindow
			},
			{
				label: 'Clear all tasks',
				accelerator: 'CommandOrControl+Alt+C',
				click: () => {
					mainWindow.webContents.send('todo:clear');
				}
			},
			{
				label: 'Quit',
				accelerator: 'CommandOrControl+Q',
				click: () => {
					app.quit();
				}
			}
		]
	}
];

let mainWindow;
let addWindow;

function createAddWindow() {
	addWindow = new BrowserWindow({
		width: 300,
		height: 200,
		title: 'Add new Todo'
	});

	addWindow.loadURL(`file://${__dirname}/add.html`);
	addWindow.on('closed', () => addWindow = null);
}

// ips listeners
ipcMain.on('todo:add', (event, todo) => {
	mainWindow.webContents.send('todo:add', todo);
	addWindow.close();
});


app.on('ready', () => {
	mainWindow = new BrowserWindow({});
	mainWindow.loadURL(`file://${__dirname}/main.html`);
	mainWindow.on('closed', () => app.quit());
	const mainMenu = Menu.buildFromTemplate(menuTemplate);
	Menu.setApplicationMenu(mainMenu);
});

app.on('will-quit', () => {
	globalShortcut.unregisterAll();
});

if(process.env.MODE === 'development') {
	menuTemplate.push({
		label: 'Developer',
		submenu: [
			{role: 'reload'},
			{
				label: 'Toggle debugged',
				accelerator: 'CommandOrControl+D',
				click: (item, focusedWindow) => {
					focusedWindow.toggleDevTools();
				}
			}
		]
	});
}
