import React, { Component } from 'react';
import './Bot.css'

class Bot extends Component {
    render() {
        return (
            <div>
                <section>
                    <h1>PrivBot</h1>
                    <div>
                    <button className="botButton"><i className="fa fa-microphone"></i></button>
                    <h2>*tap to talk*</h2>
                    </div>
                    <div>
                        <h3>You said: <em className="output-you">...</em></h3>
                        <h3>Bot replied: <em className="output-bot">...</em></h3>
                    </div>
                </section>

                <script src="/socket.io/socket.io.js"></script>
                <script src="js/script.js"></script>
            </div>
        )
    }
}

export default Bot;