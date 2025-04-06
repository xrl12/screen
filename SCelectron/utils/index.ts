import { app, BrowserWindow, type BrowserWindowConstructorOptions, globalShortcut } from 'electron'
import { default_config } from '../enum'
import * as fs from 'node:fs'
import type { DefaultConfig } from '../enum/type'

/**
 * @desc 打开开发者工具，查看当前激活的窗口，打开开发者工具
 * */
export const open_dev_tools = (): void => {
  globalShortcut.register('Command+Shift+I', () => {
    BrowserWindow.getFocusedWindow().webContents.toggleDevTools()
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
    open_dev_tools()
  }
  if (!app.isPackaged) {
    mainWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}/${url_path}`).then(() => {})
  } else {

  }
  return mainWindow
}

export const get_config = (path: string | null): DefaultConfig => {
  if (path === null) {
    return default_config
  } else {
    let obj = {}
    // 判断当前path是否存在，如果存在读取配置，如果不存在就返回默认值
    if (fs.existsSync(path)) {
      try {
        obj = Object.assign({}, default_config, JSON.parse(fs.readFileSync(path, 'utf8')))
      } catch {
        obj = default_config
      }
      return <DefaultConfig>obj
    }
  }
}
