function Card(props) {
    const releaseDate = props.year || props.firstReleased;
    return (<div className="card">
        <img src={props.image} alt={props.title}></img>
        <h2>{props.title}</h2>
        <div className="movieInfo">
            <span>
                {releaseDate && new Date(releaseDate).getFullYear()}
            </span>

            <span>
                ⭐ {props.rating?.toFixed(1)}
            </span>
        </div>

    </div>)
}
export default Card