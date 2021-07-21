import React, { useState } from 'react';
import './request.css';

function Request({userData}) {

  const [biowaste, setBiowaste] = useState(0),
  [nonbiowaste, setNonbiowaste] = useState(0);

	const onBiowasteChange = (event) => {
		setBiowaste(event.target.value);
	}

  const onNonBiowasteChange = (event) => {
    setNonbiowaste(event.target.value);
  }

  const onRequestButtonSubmit = (e)=> {
    e.preventDefault();
    console.log(userData.Area_id);
	  fetch(('http://localhost:3001/userrequest'), {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        biowaste: biowaste,
        nonbiowaste: nonbiowaste,
        areapin: userData.Area_id,
        userid: userData.User_id 
      })
    })
    .then( response => response.json())
    .then( data => {
      console.log(data);
      alert("Thank you for choosing us!. Our team will contact you shortly via Whatsapp or Phone Call");
    }) 
  }

	return(
		<div className="request">
			<h3>REQUEST FOR GARBAGE PICKUP</h3>
			<form onSubmit={onRequestButtonSubmit} className="request-form">
				<input onChange={onBiowasteChange} type="text" 
        placeholder="Amount of Biodegredable Waste in Kg" required/>
				<input onChange={onNonBiowasteChange} type="text"
        placeholder="Amount of Non-Biodegredable Waste in Kg" required/>
				<button>MAKE A REQUEST!</button>
			</form>
		</div>
	)
}

export default Request;