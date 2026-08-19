import Slider from './Slider'
import { useState, useEffect } from 'react'
const Api_path = "https://api.themoviedb.org/3/trending/movie/week?api_key=18fff5e1b57ed556bacc51cd41ead165"
const ImageUrl = `https://image.tmdb.org/t/p/w1280`;
function SliderLoader() {
    const [movies, setmovies] = useState([]);
    const [slide, setSlide] = useState(1);
    useEffect(() => {

        fetch(Api_path).then(response => response.json()
            .then(data => setmovies(data.results))
            .catch(e => { console.error(e) }))
    }, [])

    useEffect(() => {

        const interval = setInterval(() => {
            setSlide(prevSlide => {
                if (prevSlide !== 6) {
                    return prevSlide + 1;
                }

                return 1;
            });
        }, 5000);
        return () => clearInterval(interval)

    }, [])
    if (movies.length === 0) {
        return <p>Loading...</p>
    }

    return (
        <>
            {

                <Slider key={movies[slide].id}
                    image={ImageUrl + movies[slide].backdrop_path}
                    title={movies[slide].title}
                    year={movies[slide].release_date}
                    rating={movies[slide].vote_average}
                    description={movies[slide].overview}></Slider>

            }
        </>


    )
}
export default SliderLoader