import React, { Component } from 'react'

export default class Demo extends Component {
    constructor(props){
        super(props)
        this.state = {
            msg = "Hello Demo"
        }
    }
    render() {
        const {msg} = this.state
        return (
            <div>
                {msg}
            </div>
        )
    }
}
