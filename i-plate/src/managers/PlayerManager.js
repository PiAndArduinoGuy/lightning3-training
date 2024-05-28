// JS and HTML - has nothing to do with Lightning

import shaka from 'shaka-player'
 
let player
let videoElement
 
const state = {
  playingState: false,
}
 
const init = async (element) => {
  shaka.polyfill.installAll() // polyfilling for devices that need it.
 
  videoElement = element
 
  if (!videoElement) {
    videoElement = document.createElement('video')
 
    videoElement.style.cssText = 'position: absolute; top: 0; left: 0; z-index: -1'
 
    videoElement.width = 1920
    videoElement.height = 1080
 
    player = new shaka.Player()
    await player.attach(videoElement)
 
    videoElement.autoplay = false
 
    player.addEventListener('error', (err) => {
      console.error(err)
    })
    document.body.insertBefore(videoElement, document.body.firstChild)
  }
}
 
const load = async (config) => {
  if (!player || !videoElement) {
    throw 'Player not initialized yet'
  }
 
  await player.load(config.streamUrl)
}
 
const play = () => {
  videoElement.play().then(() => {
    state.playingState = true
  })
}
 
const pause = () => {
  videoElement.pause()
  state.playingState = false
}
 
const seekForward = () => {
  player.trickPlay(10)
}
 
const seekBackward = () => {
  player.trickPlay(-10)
}
 
const stopSeek = () => {
  player.cancelTrickPlay();
}
 
const destroy = async () => {
  await player.destroy()
 
  player = null
  videoElement.remove()
  videoElement = null
}
 
const getCurrentTime = () => {
  return videoElement.currentTime
}
 
const getVideoDuration = () => {
  return videoElement.duration
}
 
const getTimeFormat = () => {
  let secondsToMmSs = (seconds) => new Date(seconds * 1000).toISOString().substr(14, 5)
  return `${secondsToMmSs(videoElement.currentTime)} : ${secondsToMmSs(
    Math.floor(videoElement.duration)
  )}`
}
 
export default {
  init,
  load,
  play,
  pause,
  seekForward,
  seekBackward,
  stopSeek,
  getCurrentTime,
  getVideoDuration,
  getTimeFormat,
  state,
  destroy,
}