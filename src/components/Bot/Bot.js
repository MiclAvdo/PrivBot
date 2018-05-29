import React from 'react';
import './Bot.css'

const Bot = ({startListen, outputYou, outputBot, handleLogout}) => (
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
            <button onClick={handleLogout}>Logout</button>
        </section>
    </div>
)

export default Bot;