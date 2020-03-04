const electron = require('electron');
const {app, BrowserWindow, ipcMain} = electron;

app.on('ready', () => {
	let win = new BrowserWindow({
		webPreferences: {
			nodeIntegration: true
		}
	});
	// TODO find a way to add option to open with dev tools using npm
	win.webContents.openDevTools();
	win.loadFile('index.html');
});

ipcMain.on('save', (event, text) => {
	console.log('ipcMain save', event, text)
});