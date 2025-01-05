import { app } from 'electron'
import path from 'path'
import '@/utils/register_handle.ts'
import { createWindow } from './utils'

app.whenReady().then(() => {
  createWindow(
    'dashboard',
    { debug: true },
    {
      width: 800,
      height: 100,
      maxHeight: 100,
      maxWidth: 800,
      minWidth: 800,
      minHeight: 100,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: path.join(__dirname, '../preload/index.js'),
      },
    },

  )
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
