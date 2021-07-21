import './user.css';
import SideNav from '../SideNav/sidenav.js';
import React, { useState, useEffect } from 'react';
import Request from '../RequestForm/request.js';
import Complaint from '../ComplaintForm/complaint.js';
import Profile from '../Profile/profile.js';

function User({userInfo}) {
  const [userRoute, setUserRoute] = useState('user'),
  [userData, setUserData] = useState([]);

  const onUserRouteChange = (route) => setUserRoute(route); 

  useEffect (() => {
  	fetch((`http://localhost:3001/userProfile/${userInfo.User_id}`), {
	    method: 'get',
	    headers: {'Content-Type': 'application/json'}
	    })
	    .then( response => response.json())
	    .then( data => {
	      setUserData(data[0])    
	    })
	   
  },[userInfo.User_id])

	return(
		<div>
			<SideNav name1={"Make a Request"}
			route1={'user'} 
			name2={"Register a complain"}
			name3={"Your Profile"}
			route2={"userRequest"}
			route3={"userComplaint"}
			route4={"userProfile"} 
			onNavlinkChange={onUserRouteChange}/>
			<div className="main">
			{
			
				userRoute === 'user'
				?
				<div className="user-container">
					<h1 className="user-heading">WELCOME TO ECO WARRIOR!</h1>
				</div>
				:
				userRoute === 'userRequest'
				?
        <Request userData={userData}/>
        :
        userRoute === 'userComplaint'
        ?
        <Complaint userData={userData}/>
        :
        <Profile userData={userData}/>
			}
		</div>
		</div>
	)
}

export default User;