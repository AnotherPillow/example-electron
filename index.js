const {app, BrowserWindow, ipcMain} = require('electron')
//const path = require('path');
const fs = require('fs');
var win;

function createWindow() {
    win = new BrowserWindow({
        width: 800, // Window width
        height: 600, // Window height
        webPreferences: {
            preload: __dirname + '/preload.js', // Preload script, used to communicate with the renderer process
            nodeIntegration: true // Allow node integration
        },
        //alwaysOnTop: true, // Always on top, remove comments to enable
        // frame: false, // Remove frame, remove comments to enable
    })
    win.loadFile('renderer/index.html') //Load renderer/index.html as the window content

    win.on('closed', () => {
        win = null; // Dereference the window object
    });

    setTimeout(() => {
        win.webContents.send('intro', { // Send a message to the renderer process on channel 'intro'
            message: 'Hello from the main process!' // Message to send, can be a string, dictionary, array, etc.
        }); // Send a message to the renderer process
    }, 800)
}

app.on('ready', () => createWindow()); // Create window when app is ready

ipcMain.on('listdir', (_event, data) => { // Listen for a message on channel 'listdir', sent from the renderer process
    console.log(data); // Log the data
    fs.readdir(__dirname, (err, files) => { // Read the directory
        if (err) {
            console.log(err); // Log the error
            return;
        }
        win.webContents.send('listdir', { // Send a message to the renderer process on channel 'listdir'
            files: files // Message to send, can be a string, dictionary, array, etc.
        }); // Send a message to the renderer process
    });
})