import { app } from 'electron'
import path from 'path'
import '@/utils/register_handle.ts'
import { createWindow } from './utils'
import { default_value } from './enum'

app.whenReady().then(() => {
  const win = createWindow(
    'dashboard/name',
    // 'show_img',
    { debug: true },
    {
      title: '截图小工具',
      width: default_value.MAIN_WINDOW_WIDTH,
      frame: false,
      height: default_value.MAIN_WINDOW_HEIGHT,
      transparent: true,
      roundedCorners: false,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: path.join(__dirname, '../preload/index.js'),
      },
    },
  )
  win.setBackgroundColor('rgba(0, 0, 0, 0)')
  win.webContents.setWindowOpenHandler(() => {
    return {
      action: 'allow',
      overrideBrowserWindowOptions: {
        webPreferences: {
          preload: path.join(__dirname, '../preload/index.js'),
        },
      },
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
