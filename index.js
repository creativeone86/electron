const electron = require('electron');
const {app, BrowserWindow, ipcMain} = electron;
const ffmpeg = require('fluent-ffmpeg');
let mainWindow;

app.on('ready', () => {
	console.log('App is now ready.');

	mainWindow = new BrowserWindow({});
	mainWindow.maximize();
	mainWindow.openDevTools();

	mainWindow.loadURL(`file://${__dirname}/index.html`);
});

ipcMain.on('video:submit', (event, path) => {
	ffmpeg.ffprobe(path, (err, metadata) => {
		mainWindow.webContents.send('video:metadata', metadata.format.duration);
	});
});