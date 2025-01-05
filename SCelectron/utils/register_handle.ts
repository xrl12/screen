import { desktopCapturer, BrowserWindow } from 'electron'
import { ipcMain } from 'electron'
import { createWindow } from './'

/**
 * @desc 获取屏幕源
 * */
ipcMain.handle('CaptureScreen', async (): Promise<Electron.DesktopCapturerSource[]> => {
  return await desktopCapturer.getSources({ types: ['screen'] })
})

/**
 * @desc 打开一个新的截图窗口
 * */
ipcMain.on('OpenWindow', (): BrowserWindow => {
  const window = createWindow(
    'screen_capture',
    { debug: true },
    {
      autoHideMenuBar: true, // 自动隐藏菜单栏
      useContentSize: true, // width 和 height 将设置为 web 页面的尺寸
      movable: false, // 是否可移动
      frame: false, // 无边框窗口
      resizable: false, // 窗口大小是否可调整
      hasShadow: false, // 窗口是否有阴影
      transparent: true, // 使窗口透明
      fullscreenable: true, // 窗口是否可以进入全屏状态
      fullscreen: true, // 窗口是否全屏
      simpleFullscreen: true, // 在 macOS 上使用 pre-Lion 全屏
      alwaysOnTop: true, // 窗口是否永远在别的窗口的上面
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    },

  )
  return window
})
