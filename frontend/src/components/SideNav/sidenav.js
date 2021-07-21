import './sidenav.css';

function SideNav({name1,name2, name3,route1, route2,route3,route4,onNavlinkChange}) {
	return(
		<div className="sidenav">
		    <button onClick={() => onNavlinkChange(route1)}>Dashboard</button>
		    <button onClick={() => onNavlinkChange(route2)}>{name1}</button>
		    <button onClick={() => onNavlinkChange(route3)}>{name2}</button>
		    <button onClick={() => onNavlinkChange(route4)}>{name3}</button>
		</div>
	)
}

export default SideNav;