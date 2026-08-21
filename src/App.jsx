import Card from './Card'
import SliderLoader from './SliderLoader'
import { useState, useEffect } from 'react'
import NavBar from './NavBar';
const ImageUrl = `https://image.tmdb.org/t/p/w500`;
const SearchUrl = `https://api.themoviedb.org/3/search/movie?api_key=18fff5e1b57ed556bacc51cd41ead165&query=`;
function App() {
    const [movies, setmovies] = useState([]);
    const [count, setcount] = useState(1);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        const Api_URL = `https://api.themoviedb.org/3/discover/movie?api_key=18fff5e1b57ed556bacc51cd41ead165&include_adult=false&with_genres=12&page=${count}`;

        fetch(Api_URL).
            then(response => response.json()
                .then(data => setmovies(data.results))
                .catch(e => { console.error(e) }))
    }, [count]);

    useEffect(() => {
        if (!search.trim()) {
            setSearchResults([]);
            return;
        }

        fetch(`${SearchUrl}${encodeURIComponent(search)}`)
            .then(response => response.json())
            .then(data => setSearchResults(data.results))
            .catch(error => console.error(error));

    }, [search]);


    const searchMovie = (event) => {
        setSearch(event.target.value);
    }

    return (<>
        <NavBar searchMovie={searchMovie} />

        {

            (search.trim()) ? 
            
            (searchResults.length==0)?<h1 className="noResults">Could not find Movie "{search}"</h1>:
            (<div className="container">
                {   
                searchResults.map(movie => (
                    <Card
                        key={movie.id}
                        image={ImageUrl + movie.poster_path}
                        title={movie.title}
                        year={movie.release_date}
                        rating={movie.vote_average}
                    />
                ))
                
                
                }
        
            </div>

            ) : 

            <div className="mainBody">
            <SliderLoader />
            <div className="container">
                {movies.map((movie) => (


                    <Card key={movie.id} image={ImageUrl + movie.poster_path} title={movie.title} year={movie.release_date} rating={movie.vote_average}></Card>

                ))}
            </div>
            <div className="pageControl">
                <button onClick={() => {
                    if (count != 1) { setcount(count - 1) }
                }}><img src="left.png"></img></button>
                <button onClick={() => setcount(count + 1)}><img src="right.png"></img></button>
            </div>
        </div>
         
        
        }


        
    </>)

}
export default App