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
    /**
     * @desc 将图片路径添加进去
     * */
    addCutImgPath(path: positionInfoType) {
      this[StoreEnum.CUT_IMG_PATH].push(path as never)
    },
    /**
     * @desc 清除所有的图片路径
     * */
    clearCutImgPath() {
      this[StoreEnum.CUT_IMG_PATH] = []
    },
    /**
     * @desc 获取指定下标的图片路径
     * */
    getCutImgPath(index: number): positionInfoType | undefined {
      return this[StoreEnum.CUT_IMG_PATH]?.[index]
    },
    /**
     * @desc 获取到所有的图片路径
     * */
    getAllCutImgPath(): positionInfoType[] {
      return this[StoreEnum.CUT_IMG_PATH]
    },
  },
})

export default use_cut_img_store
