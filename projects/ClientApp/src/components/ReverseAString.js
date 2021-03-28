import React from 'react'
import "./ReverseAString.css"

class ReverseAString extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            input: "",
            reversed: "",
            active: false,
        }
        this.reverse = this.reverse.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e) {
        if (e.target.value === this.state.input) {
            this.setState({
                input: this.state.input+" "
            })
            return
        }
        if (e.target.value.length > 60) {
            return
        }
        let active = false;
        let reversed = this.reverse(e.target.value)
        if (e.target.value !== "") {
            active = true;
        } else {
            //reversed = "Input some data!"
        }
        this.setState({
            input: e.target.value,
            reversed,
            active
        })
    }
    componentDidMount() {
        //this.input.focus()
    }
    reverse(input) {
        let reversed = "";
        for (let i = 0; i < input.length; i++) {
            reversed += input[input.length - i - 1]
        }
        return reversed
    }
    render() {
        const isActive = this.state.active ? "active" : ""
        return (
            <div className="reverse-a-string">
                <label >
                    <textarea spellcheck="false" placeholder="Input some data!" rows="3" ref={(input) => { this.input = input }} autoFocus type="text" onChange={this.handleChange} value={this.state.input} ></textarea>
                    <p className={`result ${isActive}`}><pre>{this.state.reversed}</pre></p>
                </label>
            </div>
        )

    }
}

export default ReverseAString;