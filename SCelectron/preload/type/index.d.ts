import { channel_enum } from '../../enum'
// 创建一个类型，其中有两个类型是传进来的
export type api_key = {
  // invoke_method: (channel: channel, option?: option) => Promise<res>
  [channel_enum.CAPTURE_SCREEN]: () => Promise<Electron.DesktopCapturerSource[]>
  [channel_enum.EV_SEND_DESKTOP_CAPTURER_SOURCE]: () => void
  [channel_enum.SET_FULL_SCREEN]: () => void
  [channel_enum.CANCEL_FULL_SCREEN]: () => void
  // OpenWindow: () => void
  // OpenDevtools?: () => void
  // CLoseWindow: () => void
}
