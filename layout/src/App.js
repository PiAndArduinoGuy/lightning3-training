import Blits from '@lightningjs/blits'

import Home from './pages/Home.js'
import SideBar from './components/SideBar.js'
import Films from './pages/Films.js'
import Profile from './pages/Profile.js'

export default Blits.Application({
  components: {SideBar},
  template: `
    <Element>
    	<RouterView />
    	<!-- route components are displayed here for the route navigated-->
    	<SideBar ref="sidebar" />
    	<!-- we can add 'widgets' here (what they were called in LS2) to have them show on every page that can be navigated -->
    </Element>
  `,
  routes: [ 
    // nested paths not supported by blits, but is with solid
    { path: '/', component: Home },
    {path: '/films', component: Films, data: {filmId: 1}},
    {path: '/films/:id', component: Films}, //id  passed into the params property of the component, I also think this is accesible as a prop if prop with same name is defined in the component
    {path: '/profile', component: () => {
      return new Promise((resolve) => {
        // api call to check what component must be returned for this route
        let loggedIn = true
        loggedIn ? resolve(Profile) : resolve(Home)
      })
    }}
  ],
  hooks: {
    init() {}, // we wont have access to all the tempate things, thats why we have the ready code ,
    ready() {
      this.$listen('focusSidebar', () => {
        const sidebar = this.select('sidebar') // we are trying to access a ref in template thus init wont work
        if (sidebar && sidebar.focus ) sidebar.focus()
      })
    }
  },
  input: {
    // h(){
    //   this.$router.to('/', {data: 'Hello World!'})
    // },
    // p() {
    //   this.$router.to('/profile',{data: 'Hello World!'})
    // },
    // f() {
    //   this.$router.to('/films',{data: 'Hello World!'}) //  data can be accessed as a prop on the component (however it is not in $router.currentRoute.data field - this must be a bug)
    // }

  }
})
