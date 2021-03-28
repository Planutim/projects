import React from 'react'
import './MovingCar.css'

class MovingCar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            speed: 1,
            tireStyle: {},
            riding: true,
        }
        this.inputslider = React.createRef()
        this.controlSpeed = this.controlSpeed.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }
    componentDidMount() {
        this.inputslider.current.focus()
    }
    controlSpeed(e) {
        this.setState({
            speed: (parseInt(e.target.value,10)+1),
            tireStyle: {
                animationDuration: `${6 - e.target.value}s`,
            }
        })
    }
    doNotAllow() {
        return false;
    }
    handleClick() {
        this.inputslider.current.focus()
        return false;
    }
    render() {
        return (
            <div onClick={this.handleClick} className="Moving-Car" onKeyPress={this.setSpeed}>
                <div className={`car ${this.state.speed > 2 ? "shook" : ""}`}>
                    <div className="carcass">
                        <div className="back"></div>
                        <div className="middle"></div>
                        <div className="front"></div>
                        <div className="top"></div>
                    </div>
                    <div className="tires">
                        <div style={this.state.tireStyle} className={`tire tire-left ${this.state.riding ? "riding" : ""}`}></div>
                        <div style={this.state.tireStyle} className={`tire tire-right ${this.state.riding ? "riding" : ""} `}></div>
                    </div>
                </div>

                <div className="controls">
                    <input ref={this.inputslider} className="slider" name="slider" onChange={this.controlSpeed} type="range" defaultValue="0" min="0" max="5" />
                    <label for="slider">Speed: {this.state.speed}</label>
                </div>
            </div>
        )
    }
}



export default MovingCar