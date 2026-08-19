function Slider(props){

    return(
        <div className = "slider">
            <img src={props.image } alt={props.title}></img>
            <div className="movieDetails">
            <h1>{props.title}</h1>
            <p>{props.description}</p>
            <span className ="span1">{new Date(props.year).getFullYear()}</span>
            <span className ="span2">⭐{props.rating.toFixed(2)}</span>
            <br></br>
            <button>
                 <img src="/play.png" alt="Play" />
                {"  "} Play Now
            </button>
            </div>   
        </div>
    )
}
export default Slider