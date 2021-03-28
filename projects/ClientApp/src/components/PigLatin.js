import React from 'react'
import "./PigLatin.css"

export default class PigLatin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            input: "",
            pigLatin: "",
            working: false,
            smooth: "",
            loremIpsum: "",
            loremIpsumLoading: false,
        }
        this.handleChange = this.handleChange.bind(this)
        this.smoothButton = this.smoothButton.bind(this)
        this.getColor = this.getColor.bind(this)

    }
    transformToPigLatin(word) {
        if (word === "") {
            return ""
        }
        const trimmed = word.replace(/\s+/g, " ")
        const index = trimmed.search(/[aeiou]/)
        return trimmed.substring(index)+trimmed.substring(0,index)+"ay"
    }
    handleChange(e) {
        this.setState({
            input: e.target.value,
            pigLatin: this.transformToPigLatin(e.target.value)
        })
    }
    async smoothButton(e) {
        if (this.state.working) {
            return
        } else {
            this.setState({
                working: true
            })
        }
        for (let i = 0; i < this.state.pigLatin.length; i++) {
            await sleep(100)
            this.setState({
                smooth: this.state.pigLatin.substring(0,i+1)
            })
        }
        this.setState({
            working: false
        })
    }
    getColor() {
        let red, green, blue, alpha;
        red = 255-Math.floor(this.state.smooth.length / this.state.pigLatin.length * 255)
        green = 255-Math.floor(this.state.smooth.length * Math.random(0, 1) * 10 % 255)
        blue = 255-Math.floor(this.state.smooth.length / this.state.pigLatin.length * 100)
        alpha = ((this.state.smooth.length / this.state.pigLatin.length / 2) + 0.5, 2).toFixed(1)

        return `rgba(${red},${green},${blue},${alpha})`
    }
    render() {
        return (
            <div className="PigLatin">
                <input className="input" type="text" onChange={this.handleChange} value={this.state.input} maxLength="30"/>
                <button className={`button ${this.state.working?"disabled":""}`} onClick={this.smoothButton} >Pig Latin your word!</button>
                <p className="output" style={{ color: this.getColor() }}>{this.state.smooth.length === 0 ? "Empty..." : this.state.smooth}</p>
                {/*animation: color 3s ease-in;*/}
                <span className="status">{this.state.working ? "Writing..." : ""}</span>
            </div>
                )
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}