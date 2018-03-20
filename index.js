const electron = require('electron');
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
				label: 'Add task'
			},
			{
				label: 'Quit'
			}
		]
	}
];

let mainWindow;

app.on('ready', () => {
	mainWindow = new BrowserWindow({});
	mainWindow.loadURL(`file://${__dirname}/main.html`);
	mainWindow.maximize();

	const mainMenu = Menu.buildFromTemplate(menuTemplate);
	Menu.setApplicationMenu(mainMenu);
});
