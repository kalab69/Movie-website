import Card from './Card'
import SliderLoader from './SliderLoader'
import { useState, useEffect } from 'react'
const ImageUrl = `https://image.tmdb.org/t/p/w1280`;
const SearchUrl = `https://api.themoviedb.org/3/search/movie?api_key=18fff5e1b57ed556bacc51cd41ead165&query=`;
function App() {
    const [movies, setmovies] = useState([]);
    const [count, setcount] = useState(1);
    useEffect(() => {
        window.scrollTo({top: 0, behavior: "smooth"});
        const Api_URL = `https://api.themoviedb.org/3/discover/movie?api_key=18fff5e1b57ed556bacc51cd41ead165&include_adult=false&with_genres=12&page=${count}`;

        fetch(Api_URL).
            then(response => response.json()
                .then(data => setmovies(data.results))
                .catch(e => { console.error(e) }))
    }, [count]);
    

    return (<div>
        <SliderLoader/>
        <div className="container">
        {movies.map((movie) => (


            <Card key={movie.id} image={ImageUrl + movie.poster_path} title={movie.title} year={movie.release_date} rating={movie.vote_average}></Card>

        ))}
    </div>
    <div className="pageControl">
        <button onClick={()=>{
            if(count!=1){setcount(count-1)}}}>{'<'}</button>
        <button onClick={()=>setcount(count+1)}>{'>'}</button>
    </div>
    </div>)
    
}
export default App