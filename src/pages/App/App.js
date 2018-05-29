import React, { Component } from 'react';
import './App.css';
import Modal from './../Modal/Modal';
import userService from './../../utils/userService';
import Bot from './../../components/Bot/Bot';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3000');
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
window.recognition = new SpeechRecognition();

window.recognition.lang = 'en-US';
window.recognition.interimResults = false;
window.recognition.maxAlternatives = 1;

class App extends Component {
  constructor(props) {
    
    super(props);
    
    this.state = { 
      login: true,
      outputYou: '...',
      outputBot: '...'
    };

  }

  synthVoice(text) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = text;
    synth.speak(utterance);
  }

  /*-----  Callback Methods -----*/

  startListen = () => {
    window.recognition.start();
  }

  toggleLogin = () => {
    this.setState({ login: !this.state.login });
  };

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  }

  handleSignup = () => {
    this.setState({ user: userService.getUser() });
  };

  handleLogin = () => {
    this.setState({ user: userService.getUser() });
  };

  /*----- Lifecycle Methods -----*/

  componentWillMount() {
    window.recognition.addEventListener('result', (e) => {
      let last = e.results.length - 1;
      let text = e.results[last][0].transcript;
  
      this.setState({
        outputYou: text
      })
    
      socket.emit('chat message', text);
    });

    window.recognition.addEventListener('speechend', () => {
      window.recognition.stop();
    });
  
    socket.on('bot reply', (replyText) => {
      this.synthVoice(replyText);
    
      if(replyText === '') replyText = '(No answer...)';
      this.setState({
        outputBot: replyText
      })
    });
  }

  componenetDidMount() {
    let user = userService.getUser();
    this.setState({ user });

  }
  
  render() {
    return (
      <div>
        <Modal  login={this.state.login}
                toggleLogin={this.toggleLogin}
                handleSubmit={this.handleSubmit} 
                handleChange={this.handleChange}
                handleLogin={this.handleLogin}
                handleSignup={this.handleSignup}
                user={this.state.user}
        />
        <Bot startListen={this.startListen}
             outputYou={this.state.outputYou}
             outputBot={this.state.outputBot}
             handleLogout={this.handleLogout}
        />
      </div>
    );
  }
}

export default App;
