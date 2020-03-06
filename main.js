const electron = require('electron');
const fs = require('fs');
const {app, BrowserWindow, ipcMain, dialog} = electron;
let win;
let filePath;

app.on('ready', () => {
	win = new BrowserWindow({
		webPreferences: { nodeIntegration: true }
	});
	win.webContents.openDevTools();
	win.loadFile('index.html');
});

ipcMain.on('save', (event, text) => {
	var saveFile = (fullpath) => {
		fs.writeFile(fullpath, text, (err) => {
			err ? console.log('... There was an error', err) : console.log(fullpath, 'File has been saved');
		});
	}
	if (!filePath) {
		dialog.showSaveDialog(win, { defaultPath: 'filename.txt' }, (fullpath) => {
			if (fullpath) {
				saveFile(fullpath);
				filePath = fullpath;
			}
		});
	} else {
		saveFile(filePath);
	}
});