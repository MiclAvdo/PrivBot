import React from 'react';
import './Modal.css';
import LoginForm from './../../components/LoginForm/LoginForm';
import SignupForm from './../../components/SignupForm/SignupForm';

const Modal = props => {
    return props.showModal ? (
        <div className="Modal">
            <div className="Modal-content">
            {props.login ?
            <LoginForm toggleLogin={props.toggleLogin}/>
            :
            <SignupForm toggleLogin={props.toggleLogin}/>
            }
            </div>
        </div>
    ) : null;
};

export default Modal;