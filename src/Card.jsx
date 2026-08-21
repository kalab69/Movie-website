function Card(props) {
    return (<div className="card">
        <img src={props.image} alt={props.title}></img>
        <h2>{props.title}</h2>
        <div className="movieInfo">
            <span>{new Date(props.year).getFullYear()}</span>
            <span>⭐{Number(props.rating?.toFixed(1))}</span>
        </div>

    </div>)
}
export default Card