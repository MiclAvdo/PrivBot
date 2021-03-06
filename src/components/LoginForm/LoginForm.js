import React, { Component } from 'react';
import userService from './../../utils/userService';


class LoginForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        email: '',
        pw: ''
      }
    }
  
    handleChange = (field, e) => {
      this.setState({[field]: e.target.value});
    }
  
    handleSubmit = (e) => {
      e.preventDefault();
      userService.login(this.state)
      .then(() => {
        this.props.handleLogin();
      })
      .catch(err => alert('Invalid Credentials'));
    }

    render() {
      return (
        <div>
            <h1 className="title">PrivBot</h1>
          <header className="header-footer">Log In</header>
          <form className="form-horizontal" onSubmit={this.handleSubmit} >
            <div className="form-group">
              <div className="col-sm-12">
                <input type="email" className="form-control" placeholder="Email" value={this.state.email} onChange={(e) => this.handleChange('email', e)} />
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-12">
                <input type="password" className="form-control" placeholder="Password" value={this.state.pw} onChange={(e) => this.handleChange('pw', e)} />
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-12 text-center">
                <button className="btn btn-default">Log In</button>
                <a className="btn btn-default" onClick={this.props.toggleLogin}>Sign Up</a>
              </div>
            </div>
          </form>
        </div>
      );
    }
  };
  
  export default LoginForm;