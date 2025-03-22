import { defineStore } from 'pinia'

enum StoreEnum {
  IMG_STORE = 'img_store',
}

const use_cut_img_store = defineStore('cut_img', {
  state: () => ({
    [StoreEnum.IMG_STORE]: [],
  }),
  actions: {
    setImg(img: string) {
      this[StoreEnum.IMG_STORE].push(img as never)
    },
    removeImg(index: number) {
      this[StoreEnum.IMG_STORE].splice(index, 1)
    },
    resetImg() {
      this[StoreEnum.IMG_STORE] = []
    },
    getImg() {
      return this[StoreEnum.IMG_STORE]
    },
  },
})

export default use_cut_img_store
