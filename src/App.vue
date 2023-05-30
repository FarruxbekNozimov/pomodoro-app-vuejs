<script setup>
import { ref, onMounted } from 'vue'

const settingOpen = ref(false)
const changeSetting = () => (settingOpen.value = !settingOpen.value)

const minute = ref(0)
const end = ref(10)
let isStart = ref(false)
let myInterval

const start = () => {
  isStart.value = true
  myInterval = setInterval(() => {
    if (minute.value <= 0 && end.value <= 0) return stop()
    if (end.value <= 0) {
      minute.value--
      end.value = 59
    }
    end.value--
  }, 100)
}

const stop = () => {
  isStart.value = false
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
    <div class="absolute top-0 right-0 flex">
      <div
        class="transition-transform duration-300 transform translate-x-4 dark:bg-black dark:shadow-slate-500 shadow-md dark:text-white text-black-text font-bold p-4 rounded-lg animate-slideInFromLeft w-[300px] mt-5 mr-2"
        :class="settingOpen ? 'block' : 'hidden'"
      >
        <div class="flex items-center justify-between mb-7">
          <span class="font-bold text-lg">Settings</span>
          <i class="bx bx-cross font-bold text-lg cursor-pointer"></i>
        </div>
        <div class="flex items-center justify-between mt-7">
          <span>Dark mode</span>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" class="sr-only peer" />
            <div
              class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-black after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-slate-500"
            ></div>
          </label>
        </div>
        <div class="flex items-center justify-between mt-7">
          <span>Focus length</span>
          <input
            type="number"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:text-white w-20 py-1 px-2 text-center"
            max="60"
            maxlength="2"
            min="1"
          />
        </div>
      </div>
      <i
        class="cursor-pointer m-5 bx bx-cog hover:bx-spin text-2xl xl dark:text-white text-dark-text"
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

input[type='number'] {
  -webkit-appearance: textfield;
  -moz-appearance: textfield;
  appearance: textfield;
}
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  background: black;
  /* -webkit-appearance: none; */
}
</style>
