const electron = require('electron');
const fs = require('fs');
const {app, BrowserWindow, ipcMain, dialog} = electron;
let win

app.on('ready', () => {
	win = new BrowserWindow({
		webPreferences: { nodeIntegration: true }
	});
	win.webContents.openDevTools();
	win.loadFile('index.html');
});

ipcMain.on('save', (event, text) => {
	dialog.showSaveDialog(win, { defaultPath: 'filename.txt' }, (fullpath) => {
		if (fullpath) {
			fs.writeFile(fullpath, text, (err) => {
				err ? console.log('... There was an error', err) : console.log(fullpath, 'File has been saved');
			});
		}
	});
});