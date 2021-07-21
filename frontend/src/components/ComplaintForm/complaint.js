import './complaint.css';
import React, { useState } from 'react';

function Complaint({userData}) {

	const [descrip, setDescrip] = useState('');

	const onTextChange = (event) => {
		setDescrip(event.target.value);
	}

  const onSendButtonSubmit = (e) => {
  	  e.preventDefault();

	  fetch(('http://localhost:3001/usercomplaint'), {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        c_descrip: descrip,
        userid: userData.User_id
      })
    })
    .then( response => response.json())
    .then( data => {
      console.log(data);
     
    })  
  }

	return(
		<div className="user-complaint">
			<h3>NOT SATISFIED WITH OUR SERVICE? LEAVE A MESSEGE!</h3>
			<form onSubmit={onSendButtonSubmit} className="user-complaint-form">
				<input onChange={onTextChange} type="text" required/>
				<button className="complaint-button">SEND!</button>
			</form>
		</div>
	)
}

export default Complaint;