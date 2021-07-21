import SideNav from '../SideNav/sidenav.js';
import React, { useState, useEffect } from 'react';
import Card from '../Card/card.js';
import './admin.css';
import Profile from '../Profile/profile.js';

function Admin({userInfo}) {
	const [adminRoute, setAdminRoute] = useState('admin'),
	[status, setStatus] = useState(''),
	[userData, setUserData] = useState([]),
	[users, setUsers] = useState([]),
	[waste, setWaste] = useState([]),
    [complaint, setComplaint] = useState([]),
    [userSum, setUserSum] = useState(0);

  useEffect (() => {
  	fetch((`http://localhost:3001/adminProfile/${userInfo.admin_id}`), {
	    method: 'get',
	    headers: {'Content-Type': 'application/json'}
	    })
	    .then( response => response.json())
	    .then( data => {
	      console.log(data);
        setUsers(data[0]);
        setWaste(data[2][0]);
        setComplaint(data[1]);
        setUserSum(data[3][0]);
	    })
  },[userInfo.admin_id])

  const onAdminRouteChange = (route) => {
  	 setAdminRoute(route);
    }  

  function fetchStatus(string,i) {
  	fetch(('http://localhost:3001/complaintStatus'), {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
      	c_id: complaint[i].complaint_id,
        status: status
      })
    })
    .then( response => response.json())
    .then( data => {
      console.log(data);
      setStatus(string);
    })
    
  }
  const onClickComplaintButton = (string,i) => {
  	complaint[i].complaint_status = string;
  	fetchStatus(string,i);
  }

  const onUserClick = (i) => {
  	fetch((`http://localhost:3001/userProfile/${users[i].User_id}`), {
      method: 'get',
      headers: {'Content-Type': 'application/json'},
	    })
	    .then( response => response.json())
	    .then( data => {
	    	setUserData(data[0]);
	      console.log(data);
	    })
	    
  	setAdminRoute('profile');
  }

  const onApprove = (status,i) => {
  	users[i].Status = status;
  	fetch(('http://localhost:3001/userStatus'), {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
      	id: users[i].User_id,
        status: status
      })
    })
    .then( response => response.json())
    .then( data => {
      console.log(data);
      setStatus(status);
    }) 
    
  }

	return(
		<div className="admin-dashboard main">
			<SideNav name1={"Complaints"}
			route1={"admin"} 
			route2={"adminComplaints"}
			route3={"adminProfile"} 
			onNavlinkChange={onAdminRouteChange}/>
			{
				adminRoute === 'admin'
				?
				<div>
					<div className="card-container">
		        <Card className="card" icon={"fas fa-dumpster waste"} title={"Total Waste"} number={`${waste["totalwaste"]} Kg/day`}/>
		        <Card className="card" icon={"fas fa-recycle bio-waste"} title={"Biodegradable Waste"} number={`${waste["SUM(biowaste)"]} Kg/day`}/>
		        <Card className="card" icon={"fas fa-dumpster-fire nonbio-waste"} title={"Non Biodegradeble Waste"} number={`${waste["SUM(nonbiowaste)"]} Kg/day`}/>
		        <Card className="card" icon={"fas fa-users  users"} title={"Total Users"} number={`${userSum["count(*)"]}+`}/>
					</div>
					<div className="table-container">
						<table>
						  <thead>
							  <tr>
							    <th>User ID</th>
							    <th>User Name</th>
							    <th>Area ID</th>
							    <th>Status</th>
							    <th></th>
							  </tr>
						  </thead>
						  <tbody>
						    {
						    	users.map((user, i) => {
						    		return(
						    		<tr key={i}>
									    <td>{users[i].User_id}</td>
									    <td><button className="nameButton" onClick={()=>onUserClick(i)}>{users[i].U_name}</button></td>
									    <td>{users[i].Area_id}</td>
									    <td>{users[i].Status}</td>
									    <td><button onClick={()=>onApprove("Garbage Collected",i)}>APPROVE</button></td>
									  </tr>
							    	)
							    })
						    }
							</tbody>
						</table> 
					</div>	
				</div>
				:
        adminRoute === 'adminComplaints'
        ?
        <div className="table-container">
					<table>
					  <thead>
						  <tr>
						    <th>Complaint ID</th>
						    <th>User ID</th>
						    <th>Description</th>
						    <th>Status</th>
						    <th></th>
						  </tr>
					  </thead>
					  <tbody>
					    {
					    	complaint.map((complaints, i) => {
					    		return(
					    		<tr key={i}>
					    		  <td>{complaint[i].complaint_id}</td>
								    <td>{complaint[i].User_id}</td>
								    <td>{complaint[i].Description}</td>
								    <td>{complaint[i].complaint_status}</td>
								    <td><button onClick={() => onClickComplaintButton("Resolved",i)}>RESOLVE</button>
								    <button onClick={() => onClickComplaintButton("Rejected",i)}>REJECT</button></td>
								  </tr>
						    	)
						    })
					    }
						</tbody>
					</table> 
				</div>	
        :
        <Profile userData={userData}/>
			}
		</div>	
	)
}

export default Admin;