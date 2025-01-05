<template>
  <div>
    <vue-cropper
      ref="cropper"
      :img="imageSrc"
      :output-size="1"
      :output-type="'png'"
      :info="true"
      :can-move="true"
      :fixed="true"
      :fixed-number="[1, 1]"
      :full="true"
      :can-move-box="true"
      :center-box="true"
      :fixed-box="true"
      :can-scale="true"
      :auto-crop="true"
      :auto-crop-width="200"
      :auto-crop-height="200"
    />
    <button @click="getCropData">Get Crop Data</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VueCropper from 'vue-cropper'

const imageSrc = ref('path/to/your/image.jpg')
const cropper = ref(null)

const getCropData = () => {
  console.log(cropper, 'abd')
  if (cropper.value) {
    cropper.value.getCropData((data) => {
      console.log(data)
    })
  }
}
</script>

<style scoped>
/* Add any custom styles here */
</style>
