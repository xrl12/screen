import { app, BrowserWindow, type BrowserWindowConstructorOptions, globalShortcut } from 'electron'

export const BASE_PATH = __dirname
export const open_dev_tools = (win: BrowserWindow): void => {
  // 监听Mac的command+shift+i
  globalShortcut.register('Command+Shift+I', () => {
    win.webContents.toggleDevTools()
  })
}

export const createWindow = (
  url_path: string,
  option: { debug?: boolean },
  a?: BrowserWindowConstructorOptions,
): BrowserWindow => {
  option = Object.assign({ debug: false }, option)
  const mainWindow = new BrowserWindow(a)

  // 消失菜单栏
  mainWindow.setMenuBarVisibility(false)

  // 如果是debug，则就打开开发者工具
  if (option.debug) {
    open_dev_tools(mainWindow)
  }
  if (!app.isPackaged) {
    mainWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}/${url_path}`).then(() => {})
  } else {
  }
  return mainWindow
}
