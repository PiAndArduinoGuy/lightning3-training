import Blits from "@lightningjs/blits"

export default Blits.Component('Progress', {
    template: `
    <!-- container-->
    <Element
    	x="60"
    	y="400"
    >
    	<!-- progress bar -->
    	<Element
    		y="22"
    		x="400"
    		:w="$progressLength"
    		h="8"
    		color="#ffffff80"
    	>
    		<!-- current progress -->
    		<Element
    			h="8"
    			:w.transition="{value: $progress, duration: 100, easing: 'ease-in-out'}"
    			color="#0087ceeb"
    		/>
    	</Element>
    	<!-- time left test -->
    	<Element
    		x="410"
    		y="-15"
    	>
    		<Text
    			size="25"
    			:content="$timeLeft"
    		/>
    	</Element>
    </Element>
  `,
    props: ['progress', 'progressLength', 'timeLeft']
})