function Slider(props) {

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
    return (
        <div className="slider">
            <img src={props.image} alt={props.title}></img>
            <div className="movieDetails">
                <h1>{props.title}</h1>
                <p>{props.description}</p>
                <span className="span1">{new Date(props.year).getFullYear()}</span>
                <span className="span2" style={{color:color}}>⭐{props.rating.toFixed(1)}</span>
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