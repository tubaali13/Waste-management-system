import './profile.css';

function Profile({userData}) {
	return(
		<div className="profile">
      <div className="info">
        <h3>Information</h3>
        <div className="info_data">
          <div className="data">
            <h4>ID</h4>
            <p>{`${userData.User_id}`}</p>
          </div>
          <div className="data">
           <h4>User Name</h4>
            <p>{`${userData.U_name}`}</p>
          </div>
          <div className="data">
           <h4>Status</h4>
            <p>{`${userData.Status}`}</p>
          </div>
          <div className="data">
            <h4>Email</h4>
            <p>{`${userData.Email}`}</p>
          </div>
          <div className="data">
            <h4>Contact</h4>
            <p>{`${userData.Ph_number}`}</p>
          </div>
          <div className="data">
            <h4>Area ID</h4>
            <p>{`${userData.Area_id}`}</p>
          </div>
          </div>
      </div>
	  </div>
	)
}

export default Profile;