const electron = require('electron');
const fs = require('fs');
const {app, BrowserWindow, ipcMain, dialog} = electron;
let win;
let filePath;

app.on('ready', () => {
	win = new BrowserWindow({
		webPreferences: { nodeIntegration: true }
	});
	win.loadFile('index.html');
});

ipcMain.on('save', (event, text) => {
	const { exec } = require("child_process");

	exec("run.bat", (error, stdout, stderr) => {
		if (error) {
			console.log(`error: ${error.message}`);
			return;
		}
		if (stderr) {
			console.log(`stderr: ${stderr}`);
			return;
		}
		win.webContents.send('saved', stdout);
	});

	//win.webContents.send('saved', fs.readFileSync(stdout));
});

/*ipcMain.on('save', (event, text) => {
	var saveFile = (fullpath) => {
		fs.writeFile(fullpath, text, (err) => {
			if (err) console.log('... There was an error', err);
			console.log(fullpath, 'File has been saved');
			console.log('win', win)
			win.webContents.send('saved', 'success');
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
});*/