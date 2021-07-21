import '../Login/login.css';
import React, { useState } from 'react';

function Register ({setUserId,onRouteChange}) {

	const [email, setEmail] = useState(''), 
	[username, setUsername] = useState(''), 
	[password, setPassword] = useState(''),
  [phone, setPhone] = useState(''),
  [areaid, setAreaid] = useState('');

	const onUsernameChange = (event) => setUsername(event.target.value);

  const onEmailChange = (event) => setEmail(event.target.value);

  const onPasswordChange = (event) => setPassword(event.target.value);

  const onPhoneChange = (event) => setPhone(event.target.value);

  const onAreaidChange = (event) => setAreaid(event.target.value);

  const onSubmitRegister = (event) => {
    event.preventDefault();
    fetch(('http://localhost:3001/register'), {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: email,
        password: password,
        username: username,
        areaid: areaid,
        phone: phone
      })
    })
    .then( response => response.json())
    .then( user => {
    	console.log(user);
        onRouteChange('userLogin');
        alert("You have successfully registered. Log in to proceed"); 
    })
    .catch(err => console.log(err))
     
  }

	return (
		<div className="login-page register-page">
	    <div className="form">
	      <h1>REGISTER</h1>
			  <form onSubmit={onSubmitRegister} className="register-form">
          <input onChange={onUsernameChange} type="text" placeholder="Name" required/>
          <input onChange={onPasswordChange} type="password" placeholder="Password" required/>
          <input onChange={onEmailChange} type="text" placeholder="Email Address" required/>
          <input onChange={onAreaidChange} type="text" placeholder="Area ID" required/>
          <input onChange={onPhoneChange} type="text" placeholder="Phone Number" required/>
          <button>CREATE</button>
        </form>
      </div>
		</div>
	);
}

export default Register;