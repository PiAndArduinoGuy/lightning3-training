import Blits from "@lightningjs/blits"

export default Blits.Component('Profile', {
    template: `
    <Element
    	w="1920"
    	h="1080"
    	color="#1e293b"
    >
    	<Text
    		content="Profile page"
    		size="80"
    		x="500"
    		y="80"
    	/>
    </Element>
  `,
  hooks: {
    ready() {
        console.log(this.$router.currentRoute);
    }
  },
  input: {
    left(){
      this.$emit('focusSidebar')
    }
  }
})