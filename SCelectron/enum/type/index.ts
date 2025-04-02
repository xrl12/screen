export interface DefaultConfig {
  screen_capture: string
  record_screen: string
  previous: string
  next: string
}

export type ChannelEnum = {
  CAPTURE_SCREEN: 'CaptureScreen'
  EV_SEND_DESKTOP_CAPTURER_SOURCE: 'ev:send-desktop-capturer_source'
  SET_FULL_SCREEN: 'SetFullScreen'
  CANCEL_FULL_SCREEN: 'cancel_full_screen'
  GET_CONFIG: 'GetConfig'
}
