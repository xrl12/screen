import { defineStore } from 'pinia'
import type { positionInfoType } from 'js-web-screen-shot/dist/lib/type/ComponentType'

enum StoreEnum {
  CUT_IMG_PATH = 'cut_img_path',
}

const use_cut_img_store = defineStore('cut_img', {
  state: () => ({
    [StoreEnum.CUT_IMG_PATH]: [],
  }),
  actions: {
    setCutImgPath(path: positionInfoType) {
      this[StoreEnum.CUT_IMG_PATH].push(path as never)
    },
    clearCutImgPath() {
      this[StoreEnum.CUT_IMG_PATH] = []
    },
    getCutImgPath(index: number) {
      return this[StoreEnum.CUT_IMG_PATH]
    },
  },
})

export default use_cut_img_store
