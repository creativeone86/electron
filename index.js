const electron = require('electron');
require('dotenv').config();
const {
	app,
	BrowserWindow,
	Menu
} = electron;
const menuTemplate = [
	{
		label: 'File',
		submenu: [
			{
				label: 'Add task',
				click: createAddWindow
			},
			{
				label: 'Quit',
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
}

app.on('ready', () => {
	mainWindow = new BrowserWindow({});
	mainWindow.loadURL(`file://${__dirname}/main.html`);

	mainWindow.on('closed', () => app.quit());
	// mainWindow.maximize();

	const mainMenu = Menu.buildFromTemplate(menuTemplate);
	Menu.setApplicationMenu(mainMenu);
});

if(process.env.MODE === 'development') {
	menuTemplate.push({
		label: 'Developer',
		submenu: [
			{
				label: 'Toggle debugged',
				click: (item, focusedWindow) => {
					focusedWindow.toggleDevTools();
				}
			}
		]
	});
}
