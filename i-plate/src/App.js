import Blits from '@lightningjs/blits'

import Home from './pages/Home.js'

export default Blits.Application({
  template: `
    <Element
    	w="1920"
    	h="1080"
    	:color="$backgroundColor"
    >
    	<RouterView />
    </Element>
  `,
   hooks: {
    ready() {
      this.$listen('changeBackground', (color) => {
        this.backgroundColor = color ? color + 80 : '#1e293b'
      })
      // player exists behind the canvas and has nothing to do with Lightning so what we do is we just hide the canvas to expose the player
      this.$listen('clearBackground', () => {
        this.backgroundColor = 'transparent'
      })
    }
   },
   state() {
    return {
      backgroundColor: '#1e293b'
    }
   },
  routes: [{ path: '/', component: Home }],
})
