import { ElMessage } from 'element-plus'
import type { MessageParams } from 'element-plus'
import type { DesktopCapturerSource } from 'electron'

/**
 * @desc 创建一个弹框
 * */
export const show_alert = (options: MessageParams) => {
  return ElMessage(options)
}

/**
 * @desc 获取所有的屏幕源
 * */
export const get_capture_screen = (): Promise<DesktopCapturerSource[]> => {
  return window.electron.CaptureScreen()
}

/**
 * @desc 打开一个新的窗口
 * */
export const open_new_window = (): undefined => {
  window.electron.OpenWindow()
}

// 获取指定id设备的视频流
export function getInitStream(
  source: { id: string },
  audio?: boolean,
): Promise<MediaStream | null> {
  return new Promise((resolve) => {
    // 获取指定窗口的媒体流
    // 此处遵循的是webRTC的接口类型  暂时TS类型没有支持  只能断言成any
    //
    ;(navigator.mediaDevices as any)
      .getUserMedia({
        audio: audio
          ? {
              mandatory: {
                chromeMediaSource: 'desktop',
              },
            }
          : false,
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: source.id,
          },
        },
      })
      .then((stream: MediaStream) => {
        resolve(stream)
      })
      .catch((error: unknown) => {
        console.log(error)
        resolve(null)
      })
  })
}
