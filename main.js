const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('path');

let mainWindow;
let quizWindows = [];

function getResourcePath(...segments) {
  if (app.isPackaged) {
    return path.join(process.resourcesPath, 'app', ...segments);
  }
  return path.join(__dirname, ...segments);
}

function createLauncher() {
  mainWindow = new BrowserWindow({
    width: 680,
    height: 580,
    minWidth: 560,
    minHeight: 480,
    titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
    backgroundColor: '#0d0d0d',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    show: false,
    title: 'Language Quiz'
  });

  mainWindow.loadFile(getResourcePath('launcher.html'));

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
    quizWindows.forEach(w => { if (!w.isDestroyed()) w.close(); });
    quizWindows = [];
  });
}

function openQuiz(filename, title) {
  const quizPath = getResourcePath('quizzes', filename);

  const win = new BrowserWindow({
    width: 720,
    height: 820,
    minWidth: 560,
    minHeight: 600,
    titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
    backgroundColor: '#0d0d0d',
    title: title,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: false,
    },
    show: false,
  });

  win.loadFile(quizPath);

  win.once('ready-to-show', () => {
    win.show();
  });

  win.on('closed', () => {
    quizWindows = quizWindows.filter(w => w !== win);
  });

  quizWindows.push(win);
}

ipcMain.on('open-quiz', (event, { filename, title }) => {
  openQuiz(filename, title);
});

function buildMenu() {
  const template = [
    ...(process.platform === 'darwin' ? [{
      label: app.name,
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideOthers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    }] : []),
    {
      label: 'File',
      submenu: [
        process.platform === 'darwin' ? { role: 'close' } : { role: 'quit' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'zoom' },
        ...(process.platform === 'darwin' ? [
          { type: 'separator' },
          { role: 'front' }
        ] : [])
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
