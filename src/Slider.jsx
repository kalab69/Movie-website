function Slider(props){

    return(
        <div className = "slider">
            <img src={props.image}></img>
            <div className="movieDetails">
            <h1>{props.title}</h1>
            <p>{props.description}</p>
            <span>{new Date(props.year).getFullYear()}</span>
            <span>{props.rating.toFixed(2,0)}</span>
            </div>   
        </div>
    )
}
export default Slider