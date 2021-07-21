import './card.css';

function Card({icon, title, number}) {
	return(
		<div className="card">
			<i className={icon}></i>
			<p>{title}</p>
			<h2>{number}</h2>
		</div>
	)
}

export default Card;