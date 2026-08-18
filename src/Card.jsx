function Card(props) {
    return (<div className="card">
        <img src={props.image} alt={props.title}></img>
        <h2>{props.title}</h2>
        <div className="movieInfo">
            <span>{props.year}</span>
            <span>⭐{props.rating}</span>
        </div>

    </div>)
}
export default Card