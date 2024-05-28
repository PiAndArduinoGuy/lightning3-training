import Blits from "@lightningjs/blits"

export default Blits.Component('Info', {
    template: `
    <Element
    	x="1100"
    	y="65"
    >
    	<Text
    		content="$info.title"
    		font="raleway"
    		style="bold"
    		size="40"
    	/>
    	<Text
    		content="$info.time"
    		y="70"
    	/>
    	<Text
    		content="$info.genre"
    		y="70"
    		x="200"
    	/>
    	<Text
    		content="$info.description"
    		y="130"
    		wordwrap="700"
    	/>
    </Element>
  `,
    props: ['info']

})