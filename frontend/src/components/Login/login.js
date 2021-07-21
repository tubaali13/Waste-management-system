import './login.css';
import React, { useState } from 'react';

function Login({name,setUserInfo,onRouteChange}){

	const [username, setUsername] = useState(''), 
	[password, setPassword] = useState('');
	const onUsernameChange = (event) => setUsername(event.target.value);

	const onPasswordChange = (event) => setPassword(event.target.value);

	const onSubmitLogin = (event)=>{
		event.preventDefault();
		fetch('http://localhost:3001/signin', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				name: name,
				username: username,
				password: password
			})
		})
		.then(response => response.json())
		.then(user => {
			  setUserInfo(user[0]);
			  onRouteChange(name);
			console.log(user);
			alert("You have successfully logged in");
		})
			
	}

	return (
		<div className="login-page">
		  <div className="form">
			<h1>{`${name} LOGIN`}</h1>
		    <form onSubmit={onSubmitLogin} className="login-form">
		      <input onChange={onUsernameChange} type="text" placeholder="Username" required/>
		      <input onChange={onPasswordChange} type="password" placeholder="Password" required/>
		      <button>LOGIN</button>
		    </form>
		  </div>
		</div>
	)
}

export default Login;