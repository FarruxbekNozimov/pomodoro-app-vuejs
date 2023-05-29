<script setup>
import { ref, onMounted } from 'vue'

const settingOpen = ref(false)
const changeSetting = () => (settingOpen.value = !settingOpen.value)

const minute = ref(1)
const end = ref(0)
let isStart = ref(false)
let myInterval

const start = () => {
  isStart = true
  // stop()
  myInterval = setInterval(() => {
    end.value--
    if (minute.value == 0 && end.value == 0) return stop()
    if (end.value <= 0) {
      minute.value--
      end.value = 59
    }
  }, 100)
}

const stop = () => {
  console.log('stop')
  isStart = false
  clearInterval(myInterval)
}

const formatNum = (number) => number.toString().padStart(2, '0')
</script>

<template>
  <div class="dark">
    <div
      class="font-['Roboto_Flex'] dark:bg-dark-bg bg-light-bg dark:text-light-text text-center h-screen w-screen py-20"
    >
      <button
        class="flex items-center justify-center border mx-auto rounded-full gap-1 dark:border-light-bg border-dark-text dark:bg-dark-text/50 bg-dark-text/10 hover:bg-dark-text/30 dark:hover:bg-dark-text/80 cursor-pointer px-3 py-0.5 duration-300 mb-5"
      >
        <i class="bx bx-coffee text-2xl"></i>
        <span class="font-semibold text-lg">Long Break</span>
      </button>
      <h2 class="font-bold text-10xl leading-none">{{ formatNum(minute) }}</h2>
      <h2 class="font-bold text-10xl leading-none">{{ formatNum(end) }}</h2>
      <div class="flex items-center justify-center p-5 gap-5">
        <button
          class="flex items-center justify-center py-2 px-3 rounded-2xl bg-sky-blue/20 text-4xl duration-300"
        >
          <i class="bx bx-dots-horizontal-rounded"></i>
        </button>
        <button
          v-if="isStart"
          class="flex items-center justify-center py-3 px-5 rounded-2xl bg-sky-blue text-5xl duration-300"
          @click="stop"
        >
          <i class="bx bx-pause"></i>
        </button>
        <button
          v-else
          class="flex items-center justify-center py-3 px-5 rounded-2xl bg-sky-blue text-5xl duration-300"
          @click="start"
        >
          <i class="bx bx-play"></i>
        </button>
        <button
          class="flex items-center justify-center py-2 px-3 rounded-2xl bg-sky-blue/20 text-4xl duration-300"
        >
          <i class="bx bx-skip-next"></i>
        </button>
      </div>
    </div>
    <div class="absolute top-0 right-0 flex items-center">
      <div
        class="transition-transform duration-300 transform translate-x-4 dark:bg-dark-black dark:shadow-light-bg shadow text-white font-bold py-2 px-4 rounded-2xl animate-slideInFromLeft"
        :class="settingOpen ? 'block' : 'hidden'"
      >
        Child Element
      </div>
      <i
        class="cursor-pointer m-5 bx bx-cog hover:bx-spin text-2xl xl text-white"
        @click="changeSetting"
      ></i>
    </div>
  </div>
</template>

<style scoped>
@keyframes slideInFromLeft {
  0% {
    transform: translateX(-200%);
  }
  50% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
