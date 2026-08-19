import Slider from './Slider'
import { useState, useEffect } from 'react'
const Api_path = "https://api.themoviedb.org/3/trending/movie/week?api_key=18fff5e1b57ed556bacc51cd41ead165"
const ImageUrl = `https://image.tmdb.org/t/p/w1280`;
function SliderLoader() {
    const [movies, setmovies] = useState([]);
    useEffect(() => {
        fetch(Api_path).then(response => response.json()
            .then(data => setmovies(data.results))
                 .catch(e => { console.error(e) }))
    }, [])
    return (
        <>
        {
           movies.map((movie) => (
             <Slider key={movie.id} image={ImageUrl + movie.backdrop_path} title={movie.title} year={movie.release_date} rating={movie.vote_average}  description={movie.overview}></Slider>
        ))
    }
        </>
        
        
    )
}
export default SliderLoader