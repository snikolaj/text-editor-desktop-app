const electron = require('electron');
const fs = require('fs');
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
	fs.writeFile('example.txt', text, (err) => {
		if (err) {
			console.log('... There was an error', err)
			return;
		}
		console.log('File has been saved')
	});
});