import { desktopCapturer, BrowserWindow, webContents } from 'electron'
import { ipcMain } from 'electron'
import { createWindow } from './'

const enum channel_enum {
  CAPTURE_SCREEN = 'CaptureScreen',
  OPEN_WINDOW = 'OpenWindow',
  EV_SEND_DESKTOP_CAPTURER_SOURCE = 'ev:send-desktop-capturer_source',
  // OPEN_DEVTOOL = 'OpenDevtool',
}

/**
 * @desc 获取屏幕源
 * */
ipcMain.handle(channel_enum.CAPTURE_SCREEN, async (): Promise<Electron.DesktopCapturerSource[]> => {
  return await desktopCapturer.getSources({ types: ['screen'] })
})

/**
 * @desc 打开一个新的截图窗口
 * */
ipcMain.on(channel_enum.OPEN_WINDOW, (): BrowserWindow => {
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

/**
 * @desc 打开一个控制台
 * */
// ipcMain.handle(channel_enum.OPEN_DEVTOOL, opendevt)
// 修复electron18.0.0-beta.5 之后版本的BUG: 无法获取当前程序页面视频流
const selfWindws = async () =>
  await Promise.all(
    webContents
      .getAllWebContents()
      .filter((item) => {
        const win = BrowserWindow.fromWebContents(item)
        return win && win.isVisible()
      })
      .map(async (item) => {
        const win = BrowserWindow.fromWebContents(item)
        const thumbnail = await win?.capturePage()
        // 当程序窗口打开DevTool的时候  也会计入
        return {
          name: win?.getTitle() + (item.devToolsWebContents === null ? '' : '-dev'), // 给dev窗口加上后缀
          id: win?.getMediaSourceId(),
          thumbnail,
          display_id: '',
          appIcon: null,
        }
      }),
  )
// 获取设备窗口信息
ipcMain.handle(channel_enum.EV_SEND_DESKTOP_CAPTURER_SOURCE, async () => {
  return [
    ...(await desktopCapturer.getSources({ types: ['window', 'screen'] })),
    ...(await selfWindws()),
  ]
})
