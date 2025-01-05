import { contextBridge, ipcRenderer } from 'electron'
import type { api_key } from './type'

const api: api_key = {
  CaptureScreen: () => ipcRenderer.invoke('CaptureScreen'),
  OpenWindow: () => ipcRenderer.send('OpenWindow'),
}
contextBridge.exposeInMainWorld('electron', api)
