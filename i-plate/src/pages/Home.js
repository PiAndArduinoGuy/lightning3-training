import Blits from '@lightningjs/blits'
import PlayerManager from '../managers/PlayerManager.js'
import Progress from '../components/Progress.js'
import Thumbnail from '../components/Thumbnail.js'
import Info from '../components/Info.js'
 
export default Blits.Component('Home', {
  components: {
    Progress,
    Thumbnail,
    Info
  },
  template: `
    <Element>
    	<Element
    		y="1080"
    		mount="{y: 1}"
    		w="1920"
    		h="500"
    		color="{'top': 'transparent', 'bottom': '#444'}"
    		:alpha.transition="$controlsVisibility"
    	>
    		<Info :info="$info" />
    		<Thumbnail :thumbnail="$info.thumbnail" />
    		<Progress
    			:progressLength="$progressLength"
    			:progress="$progress"
    			:timeLeft="$timeLeft"
    		></Progress>
    	</Element>
    </Element>
  `,
  state() {
    return {
      controlsVisibility: 0,
      progressLength: 600,
      progress: 0,
      duration: 0,
      timeLeft: "0h 00m left",
      playing: false,
      hideTimeout: null,
      seeking: false,
      info: {
        title: "Big Buck Bunny",
        time: "19:00 - 19:10",
        genre: "COMEDY",
        description: "Three rodents amuse themselves by harassing creatures of the forest. However, when they mess with a bunny, he decides to teach them a lesson.",
        thumbnail: {
          src: 'assets/bbb-splash.png',
          w: 600,
          h: 338
        }
      }
    }
  },
  hooks: {
    focus() {
      this.$emit('clearBackground')
    },
    unfocus() {
      this.$emit('changeBackground')
    },
    async init() {
      await PlayerManager.init()
    },
    async ready() {
      await PlayerManager.load({
        streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
      })
      const duration = PlayerManager.getVideoDuration()
      if (duration) {
        this.duration = duration
        this.progressChunkSize = Math.round((this.progressLength / duration) * 100) / 100
      }
      this.$setInterval(() => {
        this.getTime()
      }, 1000)
      this.play()
    },
    async destroy() {
      await PlayerManager.destroy()
    },
  },
  input: {
    space() {
      this.play()
    },
    up() {
      this.showControls(1)
    },
    down() {
      this.showControls(0)
    },
    left() {
      if (!this.seeking) {      
        PlayerManager.seekBackward()
        this.seeking = true
        this.$setTimeout(() => {
          PlayerManager.stopSeek()
          this.seeking = false
          this.getTime()
        },1000)
      }
    },
    right() {
      if (!this.seeking) {      
        PlayerManager.seekForward()
        this.seeking = true
        this.$setTimeout(() => {
          PlayerManager.stopSeek()
          this.seeking = false
          this.getTime()
        },1000)
      }
    }
  },
  methods: {
    play() {
      this.showControls(1)
      this.hideTimeout = this.$setTimeout(() => this.showControls(0), 3000)
      if (PlayerManager.state.playingState == true) {
        PlayerManager.pause()
        this.playing = false
      } else {
        PlayerManager.play()
        this.playing = true
      }
    },
    showControls(v) {
      this.$clearTimeout(this.hideTimeout)
      this.controlsVisibility = v
    },
    getTime() {
      const currentTime = PlayerManager.getCurrentTime()
      this.secondsToHHMM(currentTime)
      this.progress = Math.round(currentTime * this.progressChunkSize)
    },
    secondsToHHMM(seconds){
      let remaining = Math.round(this.duration - seconds)
 
      var hours = Math.floor(remaining / 3600);
      var minutes = Math.floor(remaining % 3600 / 60);
      this.timeLeft = `${hours}h ${minutes}m left`;
    }
  },
})