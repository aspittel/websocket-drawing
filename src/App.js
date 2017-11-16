import React, { Component } from 'react'
import openSocket from 'socket.io-client'
import Pixel from './components/Pixel/Pixel'
import ColorPicker from './components/ColorPicker/ColorPicker'

import './App.css'

const socket = openSocket('https://agile-taiga-80620.herokuapp.com/')


class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      spans: [],
      color: '#e0e0e0'
    }
    this.getColor = this.getColor.bind(this)
    this.handlePixelClick = this.handlePixelClick.bind(this)
  }

  handlePixelClick (id) {
    socket.emit('color change', { color: this.state.color, id })
  }

  componentDidMount () {
    let spans = []
    for (let i = 0; i < 400; i++) {
      spans.push(<Pixel
                    id={i}
                    key={i}
                    backgroundColor={'#e0e0e0'}
                    handleClick={this.handlePixelClick}/>
      )
    }
    this.setState({ spans })

    let colorChange = (msg) => {
      let newSpans = [...this.state.spans]
      newSpans[msg.id] = <Pixel
                            id={msg.id}
                            key={msg.id}
                            backgroundColor={msg.color}
                            handleClick={this.handlePixelClick}/>
      this.setState({ spans: newSpans })
    }

    socket.on('history', msgs => {
      msgs.forEach(colorChange)
    })

    socket.on('color change', colorChange)
  }

  getColor (color) {
    this.setState({ color })
  }

  render() {
    return (
      <div>
        <div className="main">
          <h1 id="logo">Draw</h1>
          <p>Pick a Color</p>
          <ColorPicker handleClick={this.getColor}/>
          <p>Click a Pixel</p>
          <div id="place">
            { this.state.spans }
          </div>
        </div>
      </div>
    )
  }
}

export default App
