import { desktopCapturer, BrowserWindow, webContents } from 'electron'
import { ipcMain, screen } from 'electron'

import { channel_enum, DEFAULT_CONFIG_PATH, default_value } from '../enum'
import type { DefaultConfig } from '../enum/type'
import { get_config } from './index'
import path from 'path'

/**
 * @desc 获取屏幕源
 * */
ipcMain.handle(channel_enum.CAPTURE_SCREEN, async (): Promise<Electron.DesktopCapturerSource[]> => {
  return await desktopCapturer.getSources({ types: ['screen'] })
})

// 获取设备窗口信息
ipcMain.handle(channel_enum.EV_SEND_DESKTOP_CAPTURER_SOURCE, async () => {
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
  return [
    ...(await desktopCapturer.getSources({ types: ['window', 'screen'] })),
    ...(await selfWindws()),
  ]
})

/**
 * @desc 获取到配置文件
 * */
ipcMain.handle(channel_enum.GET_CONFIG, async (): Promise<DefaultConfig> => {
  return get_config(path.join(DEFAULT_CONFIG_PATH, '.screen'))
})

// 修改窗口宽和高
ipcMain.on(channel_enum.SET_FULL_SCREEN, (event) => {
  // 将当前窗口宽度和高度设置为100%
  const win = BrowserWindow.fromWebContents(event.sender)
  win.setBackgroundColor('rgba(0, 0, 0, 0)')
  // 覆盖在当前的窗口上，使其全屏
  // win.setFullScreen(true)
  const { width, height } = screen.getPrimaryDisplay().size
  if (win) {
    // 获取当前屏幕的宽度和高度
    win.setSize(width, height, false)
    win.setBackgroundColor('rgba(0, 0, 0, 0)')
    // win.setBackgroundColor('rgb(0, 0, 0)')
    // win.setSize(width, height, false)
    win.setMenuBarVisibility(false) // 隐藏菜单栏
    // win.setResizable(false) // 禁止调整窗口大小
    win.setPosition(0, 0) // 将窗口位置设置为左上角
    win.setAlwaysOnTop(true) // 将窗口放在所有窗口最上面
  }
})

/**
 * @desc 取消全屏
 * */
ipcMain.on(channel_enum.CANCEL_FULL_SCREEN, (event) => {
  // 将当前窗口宽度和高度设置为100%
  const win = BrowserWindow.fromWebContents(event.sender)
  // 获取当前窗口的宽度和高度
  const { width, height } = screen.getPrimaryDisplay().size
  if (win) {
    win.setFullScreen(false)
    win.setBackgroundColor('hsla(200, 20%, 50%, 0)')
    win.setSize(default_value.MAIN_WINDOW_WIDTH, default_value.MAIN_WINDOW_HEIGHT, false)
    win.setMenuBarVisibility(false) // 隐藏菜单栏
    win.setResizable(true) // 禁止调整窗口大小
    win.setPosition(
      Math.round((width - default_value.MAIN_WINDOW_WIDTH) / 2),
      Math.round((height - default_value.MAIN_WINDOW_HEIGHT) / 2),
    ) // 将窗口位置设置为屏幕中
    win.setAlwaysOnTop(false) // 将窗口放在所有窗口最上面
  }
})


