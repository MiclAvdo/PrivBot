import React from 'react';
import './Bot.css'

const Bot = ({startListen, outputYou, outputBot}) => (
    <div>
        <section>
            <h1>PrivBot</h1>
            <div>
            <button className="botButton" onClick={startListen}><i className="fa fa-microphone"></i></button>
            <h2>*tap to talk*</h2>
            </div>
            <div>
                <h3>You said: <em className="output-you">{outputYou}</em></h3>
                <h3>Bot replied: <em className="output-bot">{outputBot}</em></h3>
            </div>
        </section>

        <script src="/socket.io/socket.io.js"></script>
        <script src="js/script.js"></script>
    </div>
)

export default Bot;