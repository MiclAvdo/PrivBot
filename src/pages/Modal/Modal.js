import React from 'react';
import './Modal.css';
import LoginForm from './../../components/LoginForm/LoginForm';
import SignupForm from './../../components/SignupForm/SignupForm';

const Modal = props => {
    return !props.user ? (
        <div className="Modal">
            <div className="Modal-content">
            {props.login ?
            <LoginForm {...props}/>
            :
            <SignupForm {...props}/>
            }
            </div>
        </div>
    ) : null;
};

export default Modal;