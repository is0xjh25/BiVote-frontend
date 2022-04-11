import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { handleOnValidation } from '../utilities/Utilities.js';
import { NavLink } from 'react-router-dom';

const Rescue = (props) => {

	const { enqueueSnackbar } = useSnackbar();
	const { setPage } = props;
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [passwordTwo, setPasswordTwo] = useState('');

	const handleOnChange = (e) => {
		if (e.target.name === 'email') {
			setEmail(e.target.value);
		} else if (e.target.name === 'username') {
			setUsername(e.target.value);
		} else if (e.target.name === 'password') {
			setPassword(e.target.value);
		}else if (e.target.name === 'passwordTwo') {
			setPasswordTwo(e.target.value);
		};
  };

	const handleOnSubmit = (e) => {
		e.preventDefault();
		let check = handleOnValidation('register', {email: email, username: username, password: password, passwordTwo: passwordTwo});
		if (!check.valid) {
			enqueueSnackbar(check.message, {variant:'warning'}); 
		} else {
			console.log(password);
			// call api register(username, email, password)
			// success or fail
			// success -> store token, navigate('/home'), snackbar
			// fail -> snackbar
		};
	};

	useEffect(() => {
		return () => {
			setEmail();
			setUsername();
			setPassword();
			setPasswordTwo();
		}
	}, []);
	
	return (
		<>
			<div className='login-section'>
				<h2>REGISTER</h2>
			</div>
			<div className='login-section'>
				<label htmlFor='register-email'>email</label>
				<input type='email' aria-describedby='emailHelp' id='register-email' name='email' onChange={handleOnChange}/>
				<small id='emailHelp' className='form-text text-muted'>Verification will be sent to the inbox</small>
			</div>
			<div className='login-section'>
				<label htmlFor='register-username'>username</label>
				<input type='text' aria-describedby='usernameHelp' maxLength='12' id='register-username' name='username' onChange={handleOnChange}/>
				<small id='usernameHelp' className='form-text text-muted'>Username is unchangeable</small>
			</div>
			<div className='login-section'>
				<label htmlFor='register-password'>password</label>
				<input type='password' aria-describedby='passwordHelp' id='register-password' name='password' maxLength='32' onChange={handleOnChange}/>
				<small id='passwordHelp' className='form-text text-muted'>At least 8 characters mixture of letters and numbers</small>
			</div>
			<div className='login-section'>
				<label htmlFor='register-password-confirm'>confirm password</label>
				<input type='password' id='register-password-confirm' name='passwordTwo' maxLength='32' onChange={handleOnChange}/>
			</div>
			<div className='login-section'>
				<button type='submit' className='btn btn-outline-warning shadow login-submit' onClick={handleOnSubmit}>CONFIRM</button>
			</div>
			<div className='login-section login-nav'>
				<NavLink to='/login' onClick={()=>setPage('main')}>{"Login!"}</NavLink>
				<NavLink to='/login' onClick={()=>setPage('rescue')}>{"Forgot Password?"}</NavLink>
			</div>
		</>
	)
};

export default Rescue;