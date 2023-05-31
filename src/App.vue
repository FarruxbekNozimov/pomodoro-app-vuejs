<script setup>
import { ref, onMounted } from 'vue'
import sound from './assets/mp3/ringtone.mp3'
// import worknotif from './assets/mp3/worknotif.mp3'

const settingOpen = ref(false)
const changeSetting = () => (settingOpen.value = !settingOpen.value)

// MAIN SETTINGS
const isDark = ref(true)
const focusTime = ref(1)
const shortBreak = ref(1)
const longBreak = ref(1)
const minute = ref(focusTime.value)
const end = ref(0)

let isStart = ref(false)
let myInterval
const status = ref('work_time')

const start = () => {
  isStart.value = true
  myInterval = setInterval(() => {
    if (minute.value <= 0 && end.value <= 0) {
      stop()
      changeStatus()
      return start()
    }
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

const changeStatus = () => {
  stop()
  if (status.value == 'work_time') {
    minute.value = focusTime.value
    status.value = 'short_break'
    soundPlayBreak()
  } else {
    minute.value = shortBreak.value
    status.value = 'work_time'
    soundPlayWork()
  }
  end.value = 0
  start()
}

const formatNum = (number) => number.toString().padStart(2, '0')

const changeMode = () => {
  localStorage.setItem('mode', isDark.value ? 'light' : 'dark')
  isDark.value = !isDark.value
}

onMounted(() => {
  if (localStorage.getItem('mode')) {
    isDark.value = localStorage.getItem('mode') == 'dark' ? true : false
  } else {
    localStorage.setItem('mode', 'dark')
    isDark.value = true
  }
})

// const soundPlayBreak = () => {
//   let soundPlayer = document.getElementById('notifSound')
//   console.log(soundPlayer)
//   soundPlayer.play()
// }
// soundPlayBreak()
// const soundPlayWork = () => {
//   let soundPlayer = document.getElementById('notifSoundWork')
//   soundPlayer.play()
// }
</script>

<template>
  <audio :src="sound" controls class="opacity-0 w-0 h-0 overflow-hidden" id="notifSound"></audio>
  <audio
    :src="worknotif"
    controls
    class="opacity-0 w-0 h-0 overflow-hidden"
    id="notifSoundWork"
  ></audio>
  <div :class="isDark ? 'dark' : ''">
    <div
      class="font-['Roboto_Flex'] dark:bg-dark-bg bg-light-bg dark:text-light-text text-center h-screen w-screen py-20 text-dark-black"
    >
      <button
        class="flex items-center justify-center border mx-auto rounded-full gap-1 dark:border-light-bg border-dark-text dark:bg-dark-text/50 bg-dark-text/10 hover:bg-dark-text/30 dark:hover:bg-dark-text/80 cursor-pointer px-3 py-0.5 duration-300 mb-5"
      >
        <i class="bx bx-coffee text-2xl"></i>
        <span class="font-semibold text-lg">{{ status.replace('_', ' ').toUpperCase() }}</span>
      </button>
      <h2 class="font-bold text-10xl leading-none">{{ formatNum(minute) }}</h2>
      <h2 class="font-bold text-10xl leading-none">{{ formatNum(end) }}</h2>
      <div class="flex items-center justify-center p-5 gap-5">
        <button
          class="flex items-center justify-center py-2 px-3 rounded-2xl bg-sky-blue/20 text-4xl duration-300"
        >
          <i class="bx bx-refresh"></i>
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
          @click="changeStatus"
        >
          <i class="bx bx-skip-next"></i>
        </button>
      </div>
    </div>

    <div class="absolute top-0 right-0 flex">
      <div
        class="transition-transform duration-300 transform translate-x-4 dark:bg-black dark:shadow-slate-500 shadow-md dark:text-white text-dark-black font-bold p-4 rounded-lg animate-slideInFromLeft w-[300px] mt-5 mr-2"
        :class="settingOpen ? 'block' : 'hidden'"
      >
        <div class="flex items-center justify-between mb-7">
          <span class="font-bold text-lg">Settings</span>
          <i @click="changeSetting" class="bx bx-x font-bold text-2xl cursor-pointer"></i>
        </div>
        <div class="flex items-center justify-between mt-7">
          <span>Dark mode</span>
          <label class="relative inline-flex items-center cursor-pointer">
            <input
              @change="changeMode"
              type="checkbox"
              value=""
              class="sr-only peer"
              :checked="isDark"
            />
            <div
              class="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] dark:after:bg-black after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-slate-300"
            ></div>
          </label>
        </div>
        <div class="flex items-center justify-between mt-7">
          <span>Focus length</span>
          <span class="number">
            <input
              type="number"
              class="dark:bg-black bg-white"
              v-model="focusTime"
              @change="(e) => (focusTime = e.target.value)"
            />
          </span>
        </div>
        <div class="flex items-center justify-between mt-7">
          <span>Short Break</span>
          <span class="number">
            <input
              type="number"
              class="dark:bg-black bg-white"
              v-model="shortBreak"
              @change="(e) => (shortBreak = e.target.value)"
            />
          </span>
        </div>
      </div>
      <i
        class="cursor-pointer m-5 bx bx-cog hover:bx-spin text-2xl xl dark:text-white text-dark-black"
        @click="changeSetting"
      ></i>
    </div>
  </div>
</template>

<style scoped>
input[type='number'] {
  position: relative;
  width: 60px;
  padding: 0;
  text-align: center;
  border-radius: 5px;
  padding-right: 20px;
}

input[type='number']::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  cursor: pointer;
  padding: 2px;
  background: black;
  width: 1em;
  border-left: 1px solid gray;
  opacity: 0.5;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
}
</style>
