// src/global.d.ts
import type { api_key } from '../SCelectron/preload/type'

declare global {
  interface Window {
    electron: api_key
  }
}
