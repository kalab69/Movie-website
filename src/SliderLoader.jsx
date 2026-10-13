import { useNavigate } from 'react-router-dom';
import Slider from './Slider'
import { useState, useEffect } from 'react'
const ImageUrl = `https://image.tmdb.org/t/p/original`;
function SliderLoader(props) {
    const Api_path = `https://api.themoviedb.org/3/trending/${props.type}/week?api_key=18fff5e1b57ed556bacc51cd41ead165`
    const [movies, setmovies] = useState([]);
    const [slide, setSlide] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {

        fetch(Api_path).then(response => response.json()
            .then(data => setmovies(data.results))
            .catch(e => { console.error(e) }))
    }, [])

    useEffect(() => {

        const interval = setInterval(() => {
            setSlide(prevSlide => {
                if (prevSlide < 6) {
                    return prevSlide + 1;
                }

                return 1;
            });
        }, 5000);
        return () => clearInterval(interval)

    }, [])

    const privSlide = ()=> {
        setSlide(priv=>{
            if(priv==0){
                return 5
            }
            else{
                return priv-1;
            }
        })
    }
    const nextSlide = ()=> {
        setSlide(priv=>{
            if(priv==6){
                return 0
            }
            else{
                return priv+1;
            }
        })
    }


    if (movies.length === 0) {
        return <p>Loading...</p>
    }

    return (
        <>
            {

                <Slider key={movies[slide].id}
                    image={ImageUrl + movies[slide].backdrop_path}
                    title={(props.type=="movie")?movies[slide].title : movies[slide].name}
                    year={movies[slide].release_date}
                    rating={movies[slide].vote_average}
                    description={movies[slide].overview}
                    nextSlide = {nextSlide}
                    privSlide = {privSlide}
                    onClick={()=>navigate(`/movies/${movies[slide].id}`)}
                    ></Slider>

            }
        </>


    )
}
export default SliderLoader