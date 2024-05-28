import Blits from "@lightningjs/blits"

export default Blits.Component('Thumbnail', {
    template: `
    <Element
    	:src="$thumbnail.src"
    	:w="$thumbnail.w"
    	:h="$thumbnail.h"
    	x="460"
    	y="80"
    />
  `,
    props: ['thumbnail']
})