const electron = require('electron');
const {app, BrowserWindow} = electron;

app.on('ready', () => {
	let win = new BrowserWindow({});
	// TODO find a way to add option to open with dev tools using npm
	// win.webContents.openDevTools();
	win.loadFile('index.html');
});