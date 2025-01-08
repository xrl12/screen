// 创建一个类型，其中有两个类型是传进来的
export type api_key = {
  // invoke_method: (channel: channel, option?: option) => Promise<res>
  CaptureScreen: () => Promise<Electron.DesktopCapturerSource[]>
  OpenWindow: () => void
  OpenDevtools?: () => void
  'ev:send-desktop-capturer_source': () => void
}
