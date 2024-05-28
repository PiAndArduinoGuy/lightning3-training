
import Blits from "@lightningjs/blits"
import Icon from "./Icon"

export default Blits.Component('SideBar', {
    components: {
        Icon
    },
    template: `
    <Element
    	w="150"
    	h="1080"
    	color="{top: 'red', bottom: 'blue'}"
    >
    	<Element y="300">
    		<Component
    			is="Icon"
    			:for="(icon,index) in $icons"
    			icon="$icon.name"
    			index="$index"
    			key="$icon.id"
    			ref="icon"
    		/>
    	</Element>
    </Element>
  `,
  state() {
    return {
        icons: [
        {name: 'search', id: 78},
        {name: 'home', id: 37},
        {name: 'list', id:19},
        {name: 'movie', id: 43},
        {name: 'sport', id:67}],
        focused: 0
    }
  },
  watch: {
    focused(value, old) {
        const focusedIcon = this.select(`icon${this.focused}`)
        if (focusedIcon && focusedIcon.focus) {
            focusedIcon.focus()
        } else {
            console.log(`icon${this.icons[value].id} focusedIcon not found`);
            console.log(`last focused icon${this.icons[old].id}`);
        }
    }
  },
  hooks: {
    focus() {
        this.$trigger("focused")
    },
    ready() {
        console.log("Side bar is ready");
    }
  },
  input: {
    up() {
        this.focused = Math.max(this.focused - 1, 0)
    },
    down() {
        this.focused = Math.min(this.focused + 1, this.icons.length - 1)
    }
  }
})