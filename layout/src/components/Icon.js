import Blits from "@lightningjs/blits"

export default Blits.Component('Icon', {
    template: `
    <Element>
    	<Element
    		:src="$iconSrc"
    		w="64"
    		h="64"
    		x="75"
    		y="$y"
    		mount="{x: 0.5}"
    		z="3"
    	/>
    	<Element
    		w="128"
    		h="128"
    		x="75"
    		y="$y - 25"
    		mount="{x: 0.5}"
    		color="0x0ae3c41f"
    		:show="$active"
    		:effects="[$shader('fadeOut', {fade: [60,60]}),$shader('radius',{radius: 32})]"
    	/>
    </Element>
  `,
  props: ['icon', 'index'],
  state() {
    return {
        baseIcon: `assets/icons/${this.icon}.png`,
        highlightedIcon: `assets/icons/${this.icon}-h.png`,
        iconSrc: `assets/icons/${this.icon}.png`,
        active: false,
        sideBarLostFocus: false,
    }
  },
  computed: {
    y() {
        return this.index * 100
    }
  },
  hooks: {
    focus() {
        this.iconSrc = this.highlightedIcon
        this.active = true
        this.sideBarLostFocus = false
    },
    unfocus() {
        if (!this.sideBarLostFocus){
            this.iconSrc = this.baseIcon
            this.active = false
        }
    }
  },
  input: {
    right() {
        this.sideBarLostFocus = true
        this.$emit('focusRows')
    }
  }
})