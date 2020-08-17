import React, { Component } from 'react'
import "./css/home.css"
import TimeSkipper from "../frames/TimeSkipper"
export default class Home extends Component {

    render() {
        return (
            <div  className="container">
                <TimeSkipper></TimeSkipper>
            </div>
        )
    }
}
