import Blits from '@lightningjs/blits'

import dark from '../themes/dark.js'
import light from '../themes/light.js'

import Loader from '../components/Loader.js'

export default Blits.Component('Home', {
  components: {
    Loader,
  },
  template: `
    <Element
    	w="1920"
    	h="1080"
    	:color="{'top': $colors.primary, 'bottom': $colors.secondary}"
    >
    </Element>
  `,
  state() {
    return {
      theme: 'dark'
    }
  },
  computed: {
    colors() {
      return this.theme == 'dark' ? dark : light
    }
  },
  input: {
    up() {
      this.theme = 'dark'
    },
    down() {
      this.theme = 'light'
    }
  }
})
