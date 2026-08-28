function Card(props) {
    const releaseDate = props.year || props.firstReleased;
      let color = "white";
                if(props.rating<=5){
                   color = "red";
                   
                }
                else if(props.rating < 8){
                    color = "yellow"
                }
                else{
                    color = "rgb(81, 255, 0)"
                }
    return (<div className="card">
        <img src={props.image} alt={props.title}></img>
        <h2>{props.title}</h2>
        <div className="movieInfo">
            <span >
                {releaseDate && new Date(releaseDate).getFullYear()}
            </span>

            <span style={{color:color}}>
                ⭐ {
                props.rating?.toFixed(1)
                }
            </span>
        </div>
        <div className = "cardDetail">
            <p>{props.details}</p>
        </div>

    </div>)
}
export default Card