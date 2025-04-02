import { contextBridge, ipcRenderer } from 'electron'
import type { api_key } from './type'
import { channel_enum } from '../enum/'
import { DefaultConfig } from '../enum/type'

const api: api_key = {
  [channel_enum.CAPTURE_SCREEN]: () => ipcRenderer.invoke(channel_enum.CAPTURE_SCREEN),
  [channel_enum.EV_SEND_DESKTOP_CAPTURER_SOURCE]: () =>
    ipcRenderer.invoke(channel_enum.EV_SEND_DESKTOP_CAPTURER_SOURCE),
  [channel_enum.SET_FULL_SCREEN]: () => {
    ipcRenderer.send(channel_enum.SET_FULL_SCREEN)
  },
  [channel_enum.CANCEL_FULL_SCREEN]: () => {
    ipcRenderer.send(channel_enum.CANCEL_FULL_SCREEN)
  },
  [channel_enum.GET_CONFIG]: (): Promise<DefaultConfig> => {
    return ipcRenderer.invoke(channel_enum.GET_CONFIG)
  },
  // OpenWindow: () => ipcRenderer.send(channel_enum.OPEN_WINDOW),
  // CLoseWindow: () => ipcRenderer.send(channel_enum.CLOSE_WINDOW),
}
contextBridge.exposeInMainWorld('electron', api)
