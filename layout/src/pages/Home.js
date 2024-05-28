import Blits from '@lightningjs/blits'
import Row from '../components/Row'


export default Blits.Component('Home', {
  components: {
    Row
  },
  template: `
    <Element
    	w="1920"
    	h="1080"
    	color="#1e293b"
    >
    	<Text
    		:content="$currentTitle"
    		x="190"
    		size="90"
    	/>
    	<Text
    		:content="$currentDescription"
    		x="190"
    		y="250"
    		size="45"
    		wordwrap="1200"
    		font="lato"
        style="italics" <!-- if supported by the font chossen --> 
    		weight="bold" 
    		maxlines="5"
        textoverflow="...[click to see more]"
        align="right"
        letterspacing="10"
        lineheight="80"
    	/>
    	<Element
    		ref="rowContainer"
    		:y.transition="{value: $containerY, duration: 500}"
    	>
    		<Component
    			:for="(row, index) in $rows"
    			is="Row"
    			key="$index"
    			ref="row"
    			y="$row.y"
    			data="$row.data"
    		/>
    	</Element>
    </Element>
  `,
  state() {
    return {
      focused: 0,
      rows: [
        {
        y: 0,
        data: [
          {title: 'A1', description: 'A1 description', color:"#ff0000"},
          {title: 'A2', description: 'A2 description', color:"#00ff00"},
          {title: 'A3', description: 'A3 description', color:"#0000ff"},
          {title: 'A4', description: 'A4 description', color:"#ffff00"},
          {title: 'A5', description: 'A5 description', color:"#ff00ff"},
        ]
      },
      {
        y: 280,
        data: [
          {title: 'B1', description: 'B1 description', color:"#ff0000"},
          {title: 'B2', description: 'B2 description', color:"#00ff00"},
          {title: 'B3', description: 'B3 description', color:"#0000ff"},
          {title: 'B4', description: 'B4 description', color:"#ffff00"},
          {title: 'B5', description: 'B5 description', color:"#ff00ff"},
        ]
      },
      {
        y: 560,
        data: [
          {title: 'C1', description: 'C1 description', color:"#ff0000"},
          {title: 'C2', description: 'C2 description', color:"#00ff00"},
          {title: 'C3', description: 'C3 description', color:"#0000ff"},
          {title: 'C4', description: 'C4 description', color:"#ffff00"},
          {title: 'C5', description: 'C5 description', color:"#ff00ff"},
        ]
      }],
      containerY: 720,
      currentTitle:'', 
      currentDescription: '',
      lorem: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut quasi ipsum, quos nobis veritatis itaque dignissimos explicabo dolore porro. Voluptatibus, maiores. Delectus, maxime? Autem quaerat debitis, accusantium facilis nam quis.'
    }
  },
  hooks: {
    ready() {
      this.$trigger('focused')
      this.$listen('mainContentChange', (data) => {

        this.currentTitle = data.title
        this.currentDescription = `${data.description} ${this.lorem}`
      })

      this.$listen('focusRows', () => {
        this.trigger("focused")
      })
    }
  },
  watch : {
    focused(value){
      console.log(value);
      const focusedRow = this.select('row' + value)

      if (focusedRow && focusedRow.focus)  {
        focusedRow.focus()
      }
    }
  },
  input: {
    up() {
      if (this.focused == 0) {
        return
      } else {
        this.focused = this.focused - 1
        this.containerY += 560
      }
    },
    down() {
      if (this.focused == this.rows.length - 1) {
        return
      } else {
        this.focused = this.focused + 1
        this.containerY -= 560
      }
    }
  }
})
