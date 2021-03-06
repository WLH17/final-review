//A modal is a pop-up box that displays on the web page. This modal will display when a user tries to add something to a cart, prompting them to login or register first. This way, there isn't a view for authentication, since an e-commerce site should allow users to view product before creating an account.
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {getUser} from '../redux/reducer';
import axios from 'axios';

const AuthModal = props => {
    const [emailInput, setEmailInput] = useState(''),
          [passInput, setPassInput] = useState('');

    const login = () => {
        axios.post('/api/login', {email: emailInput, password: passInput})
        .then(res => {
            props.getUser(res.data)
            props.toggleFn()
        })
        .catch(err => console.log(err));
    }

    const register = () => {
        axios.post('/api/register', {email: emailInput, password: passInput})
        .then(res => {
            props.getUser(res.data)
            props.toggleFn()
        })
        .catch(err => console.log(err));
    }

    return (
        <div className='auth-modal'>
            <input
                value={emailInput}
                placeholder='Email'
                onChange={(e) => setEmailInput(e.target.value)}/>
            <input
                value={passInput}
                type='password'
                placeholder='Password'
                onChange={(e) => setPassInput(e.target.value)}/>
            <button onClick={login}>Login</button>
            <button onClick={register}>Register</button>
            <button onClick={props.toggleFn}>Cancel</button>
        </div>
    )
}

export default connect(null, {getUser})(AuthModal);