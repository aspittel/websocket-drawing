import React, {Component} from 'react'
import './Pixel.css'

const Pixel = (props) =>  {
    return (
        <span
            className="tile"
            onClick={() => { props.handleClick(props.id) }}
            style={{ backgroundColor: props.backgroundColor }}>
        </span>
    )
}

export default Pixel