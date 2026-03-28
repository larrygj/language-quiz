const { app, BrowserWindow, ipcMain, Menu, shell } = require('electron');
const path = require('path');

let mainWindow;

function createLauncher() {
  mainWindow = new BrowserWindow({
    width: 680,
    height: 600,
    minWidth: 560,
    minHeight: 500,
    titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
    backgroundColor: '#0d0d0d',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
    },
    show: false,
    title: 'Language Quiz'
  });

  mainWindow.loadFile(path.join(__dirname, 'launcher.html'));

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

ipcMain.on('open-quiz', (event, { filename, title }) => {
  const quizPath = path.join(__dirname, 'quizzes', filename);

  const win = new BrowserWindow({
    width: 750,
    height: 850,
    minWidth: 580,
    minHeight: 650,
    titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
    backgroundColor: '#0d0d0d',
    title: title,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: false,
      webSecurity: false,
      allowRunningInsecureContent: true,
    },
    show: false,
  });

  win.loadURL('file://' + quizPath);

  win.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    const altPath = path.join(process.resourcesPath, 'app', 'quizzes', filename);
    win.loadURL('file://' + altPath);
  });

  win.once('ready-to-show', () => {
    win.show();
  });
});

function buildMenu() {
  const template = [
    ...(process.platform === 'darwin' ? [{
      label: app.name,
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    }] : []),
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'togglefullscreen' }
      ]
    }
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

app.whenReady().then(() => {
  buildMenu();
  createLauncher();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createLauncher();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
