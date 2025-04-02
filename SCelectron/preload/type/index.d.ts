import { channel_enum } from '../../enum'
import { DefaultConfig } from '../../enum/type'
export type api_key = {
  // invoke_method: (channel: channel, option?: option) => Promise<res>
  [channel_enum.CAPTURE_SCREEN]: () => Promise<Electron.DesktopCapturerSource[]>
  [channel_enum.EV_SEND_DESKTOP_CAPTURER_SOURCE]: () => void
  [channel_enum.SET_FULL_SCREEN]: () => void
  [channel_enum.CANCEL_FULL_SCREEN]: () => void
  [channel_enum.GET_CONFIG]: () => Promise<DefaultConfig>
}
