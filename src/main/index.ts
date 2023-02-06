import { app, shell, BrowserWindow, dialog, ipcMain } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import icon from '../../resources/icon.png?asset';
import fs from 'fs';
import path from 'path';

let mainWindow;

function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron');

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

let activeFolder;

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
const getFileFromUser = async () => {
  const folder = await dialog.showOpenDialog({
    properties: ['openDirectory', 'createDirectory']
  });

  if (!folder) {
    return;
  }

  activeFolder = path.resolve(folder.filePaths[0]);

  const fileContents = fs.readdirSync(activeFolder);

  if (fileContents.length > 0) {
    const contents = fileContents.reduce(
      (res, item) => {
        if (item.indexOf('id') > -1 || item.indexOf('en') > -1) {
          const filePath = path.resolve(folder.filePaths[0], item);
          const fileBuffer = fs.readFileSync(filePath);
          const content = Buffer.from(fileBuffer).toString();
          if (item.indexOf('id') > -1) {
            res.id = JSON.parse(content);
          }
          if (item.indexOf('en') > -1) {
            res.en = JSON.parse(content);
          }
        }
        return res;
      },
      { id: {}, en: {}, values: {}, path: activeFolder }
    );

    if (Object.keys(contents.id).length > 0 || Object.keys(contents.en).length > 0) {
      Object.assign(contents.values, { ...contents.id }, { ...contents.en });
      return contents;
    }
  }
  fs.writeFileSync(`${activeFolder}/id-ID.json`, JSON.stringify({}, null, 2));
  fs.writeFileSync(`${activeFolder}/en-EN.json`, JSON.stringify({}, null, 2));

  return { id: {}, en: {}, values: {}, path: activeFolder };
};

const saveAsFile = async (data) => {
  const folder = await dialog.showSaveDialog(mainWindow, {
    properties: ['treatPackageAsDirectory'],
    title: 'locale'
  });
  if (!folder) return;

  if (folder.filePath) {
    const savePath = path.resolve(folder.filePath);
    fs.mkdirSync(savePath);
    fs.writeFileSync(`${savePath}/id-ID.json`, JSON.stringify(data.id, null, 2));
    fs.writeFileSync(`${savePath}/en-EN.json`, JSON.stringify(data.en, null, 2));
  }
};

const saveFile = async (data) => {
  if (activeFolder) {
    const savePath = path.resolve(activeFolder);
    if (!fs.existsSync(savePath)) {
      fs.mkdirSync(savePath);
    }
    if (data.id && data.en) {
      fs.writeFileSync(`${savePath}/id-ID.json`, JSON.stringify(data.id, null, 2));
      fs.writeFileSync(`${savePath}/en-EN.json`, JSON.stringify(data.en, null, 2));
    }
  }
};

ipcMain.handle('open-file', async () => {
  const response = await getFileFromUser();
  return response;
});

ipcMain.handle('save-as-file', async (_, data) => {
  const response = await saveAsFile(data);
  return response;
});

ipcMain.handle('save-file', async (_, data) => {
  const response = await saveFile(data);
  return response;
});
