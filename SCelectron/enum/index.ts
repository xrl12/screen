import type { ChannelEnum } from './type'

export const channel_enum: ChannelEnum = {
  CAPTURE_SCREEN: 'CaptureScreen',
  EV_SEND_DESKTOP_CAPTURER_SOURCE: 'ev:send-desktop-capturer_source',
  SET_FULL_SCREEN: 'SetFullScreen',
  CANCEL_FULL_SCREEN: 'cancel_full_screen',
  GET_CONFIG: 'GetConfig',
}

export const default_value = {
  MAIN_WINDOW_WIDTH: 800,
  MAIN_WINDOW_HEIGHT: 100,
}

export const default_config = {
  screen_capture: 'Ctrl+Shift+S',
  record_screen: 'Ctrl+Shift+R',
  previous: 'Ctrl+Shift+P',
  next: 'Ctrl+Shift+N',
}

export const DEFAULT_CONFIG_PATH = process.env.HOME || void 0
