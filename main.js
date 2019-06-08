/*                     HTML5 Electron Application                       */
/*      Based on https://github.com/electron/electron-quick-start       */
/*               and https://github.com/ElectronForConstruct            */

// Load required modules
const {app, BrowserWindow} = require('electron')
const gotTheLock = app.requestSingleInstanceLock()

// Close the application if more than one instance was started
if (!gotTheLock){
	app.quit()
}

// Apply chrome arguments
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required') // Fix music not playing
app.commandLine.appendSwitch('limit-fps', '60') // Limit framerate

// Prevent garbage collector from closing application windows
let mainWindow

// Create main application window
function createMainWindow(){
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
	frame: true,
	resizable: true,
	show: false,
	title: 'HTML5 Electron Application',
    webPreferences: {
      nodeIntegration: true,
    }
  })

  // Load application content
  // HTML5 file
  mainWindow.loadFile('game/index.html')

  // Show the main window when application content was loaded successfuly
  mainWindow.webContents.on('did-finish-load', () => {
	  mainWindow.show();
  });

  // Emit when the window was closed
  mainWindow.on('closed', function(){
    mainWindow = null
  })
}

// Create the application window when Electron is ready
app.on('ready', () => {
    createMainWindow();
});

// Quit application when all windows are closed
app.on('window-all-closed', function () {
  // And on macOS as well
  app.quit()
})