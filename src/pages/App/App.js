import React, { Component } from 'react';
import './App.css';
import Modal from './../Modal/Modal';
import userService from './../../utils/userService';


class App extends Component {
  
  constructor() {
    super();
    this.state = { 
      showModal: true,
      login: true
    };
  }

  /*-----  Callback Methods -----*/
  
  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

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

  componenetDidMount() {
    let user = userService.getUser();
    this.setState({ user });
  }
  
  render() {
    return (
      <div>
        <header >
          <h1>PrivBot</h1>
        </header>
        <Modal  login={this.state.login}
                toggleLogin={this.state.toggleLogin}
                showModal={this.state.showModal}
                toggleModal={this.state.toggleModal} 
                handleSubmit={this.handleSubmit} 
                handleChange={this.handleChange}
                handleLogin={this.handleLogin}
                handleSignup={this.handleSignup}
        />
      </div>
    );
  }
}

export default App;
