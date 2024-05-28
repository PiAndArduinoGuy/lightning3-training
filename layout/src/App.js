import Blits from '@lightningjs/blits'

import Home from './pages/Home.js'
import SideBar from './components/SideBar.js'

export default Blits.Application({
  components: {SideBar},
  template: `
    <Element>
    	<!-- we can add 'widgets' here (what they were called in LS2) to have them show on every page that can be navigated -->
    	<RouterView />
    	<SideBar ref="sidebar" />
    </Element>
  `,
  routes: [{ path: '/', component: Home }],
  hooks: {
    init() {}, // we wont have access to all the tempate things, thats why we have the ready code ,
    ready() {
      this.$listen('focusSidebar', () => {
        const sidebar = this.select('sidebar') // we are trying to access a ref in template thus init wont work
        if (sidebar && sidebar.focus ) sidebar.focus()
      })
    }
  }
})
