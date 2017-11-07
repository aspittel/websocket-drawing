import React, {Component} from 'react'
import './ColorPicker.css'

const colorChoices = ["#f44336", "#f06292", "#9c27b0", "#2196f3", "#009688",
                      "#8bc34a", "#ffeb3b", "#ff9800", "#ffffff", "#212121"]

const Color = (props) => {
    return (
        <span className="palette-color"
              style={{ backgroundColor: props.color }}
              onClick={() => {props.handleClick(props.color)}}></span>
    )
}

class ColorPicker extends Component {
    constructor (props) {
        super(props)
    }

    render () {
        let colors = []
        for (let color=0; color < 10; color++) {
            colors.push(<Color 
                            handleClick={this.props.handleClick}
                            color={colorChoices[color]}
                            key={color}/>)
        }
        return (
            <div id="palette">
                {colors}
            </div>
        )
    }
}

export default ColorPicker