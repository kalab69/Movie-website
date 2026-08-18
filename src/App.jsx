import Card from './Card'
import { useState, useEffect } from 'react'
let count = 1;
const Api_URL = `https://api.themoviedb.org/3/discover/movie?api_key=18fff5e1b57ed556bacc51cd41ead165&page=${count}`;
const ImageUrl = `https://image.tmdb.org/t/p/w1280`;
const SearchUrl = `https://api.themoviedb.org/3/search/movie?api_key=18fff5e1b57ed556bacc51cd41ead165&query=`;
function App() {
    const [movies, setmovies] = useState([]);
    useEffect(() => {
        fetch(Api_URL).
            then(response => response.json()
                .then(data => setmovies(data.results))
                .catch(e => { console.error(e) }))
    }, []);

    return (<div>
        <h1>MOVIES WEBSITE</h1>
        <div className="container">
        {movies.map((movie) => (


            <Card key={movie.id} image={ImageUrl + movie.poster_path} title={movie.title} year={movie.release_date} rating={movie.vote_average}></Card>

        ))}
    </div>
    </div>)
    
}
export default App