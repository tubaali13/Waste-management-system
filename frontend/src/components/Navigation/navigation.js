import './navigation.css';

function Navigation({onRouteChange}) {
	return(
		<div className="navbar">
			<div className="logo">
				<h1>EcoWarriors</h1>
			</div>
      <nav>
			<button onClick={() => onRouteChange('adminLogin')} href="#" className="nav-item">Admin</button>
			<button onClick={() => onRouteChange('userLogin')} href="#" className="nav-item">User</button>
			<button onClick={() => onRouteChange('register')} href="#" className="nav-item">Register</button>
			</nav>
		</div>
	)
}

export default Navigation;