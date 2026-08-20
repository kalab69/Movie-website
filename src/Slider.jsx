function Slider(props) {

    return (
        <div className="slider">
            <img src={props.image} alt={props.title}></img>
            <div className="movieDetails">
                <h1>{props.title}</h1>
                <p>{props.description}</p>
                <span className="span1">{new Date(props.year).getFullYear()}</span>
                <span className="span2">⭐{props.rating.toFixed(1)}</span>
                <br></br>
                <button>
                    <img src="/play.png" alt="Play" />
                    Play Now
                </button>
                
            </div>
            <button className="sliderNav left" onClick={props.privSlide}>
                    <img src="/left.png" alt="left" />
                </button>
                <button className="sliderNav right" onClick={props.nextSlide} >
                    <img src="/right.png" alt="right" />
                </button>
        </div>
    )
}
export default Slider