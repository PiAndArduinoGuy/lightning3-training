import Blits from "@lightningjs/blits"

export default Blits.Component('Films', {
    template: `
    <Element
    	w="1920"
    	h="1080"
    	color="#1e293b"
    >
    	<Text
    		content="Films page"
    		size="80"
    		x="500"
    		y="80"
    	/>
    </Element>
  `,
  props: ['data'],
  hooks: {
    ready() {
        console.log(this.$router);
        console.log(this.data);
    }
  },
  input: {
    left(){
      this.$emit('focusSidebar')
    }
  }
})