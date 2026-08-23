import Card from './Card'
import SliderLoader from './SliderLoader'
import { useState, useEffect } from 'react'
import NavBar from './NavBar';
const ImageUrl = `https://image.tmdb.org/t/p/w500`;
const SearchUrl = `https://api.themoviedb.org/3/search/multi?api_key=18fff5e1b57ed556bacc51cd41ead165&query=`;
function App() {
    const [results, setresults] = useState([]);
    const [count, setcount] = useState(1);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [type, setType] = useState("movie");
    const [genre, setGenre] = useState("");
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        const Api_URL = `https://api.themoviedb.org/3/discover/${type}?${genre}api_key=18fff5e1b57ed556bacc51cd41ead165&include_adult=false&page=${count}`;
        fetch(Api_URL).
            then(response => response.json()
                .then(data => { setresults(data.results) })
                .catch(e => { console.error(e) }))
    }, [count, type, genre]);

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
    const displayMovies = () => {
        setcount(1);
        setType("movie")
        setGenre("")
        document.getElementById("movieBtn").style.borderColor = "blue";
        document.getElementById("tvBtn").style.borderColor = "rgb(79, 72, 72)";
    }
    const displayTv = () => {
        setcount(1);
        setType("tv")
        setGenre("")
        document.getElementById("movieBtn").style.borderColor = "rgb(79, 72, 72)";
        document.getElementById("tvBtn").style.borderColor = "blue";
    }
    function filterGenre(id) {
        setcount(1);
        // check if it movie if so make id to adventure of movie which is 12
        if (type == "movie" && id == 10759) {
            setGenre(`with_genres=${12}&`);
            return;
        }
        setGenre(`with_genres=${id}&`);
    }


    return (<>
        <NavBar searchMovie={searchMovie}
            displayTv={displayTv}
            displayMovies={displayMovies}
            filterGenre={filterGenre} />

        {

            (search.trim()) ?

                (searchResults.length == 0) ? <h1 className="noResults">Could not find Movie  / Tv Show"{search}"</h1> :
                    (<div className="container">
                        {
                            searchResults.filter(movie => movie.poster_path).map(movie => (
                                <Card key={movie.id} image={ImageUrl + movie.poster_path}
                                    title={movie.media_type === "movie" ? movie.title : movie.name}
                                    year={movie.media_type === "movie" ? movie.release_date : movie.first_air_date}
                                    rating={movie.vote_average}></Card>
                            ))


                        }

                    </div>

                    ) :

                <div className="mainBody">
                    <SliderLoader />
                    <div className="container">
                        {results.filter(movie => movie.poster_path).map((movie) => (


                            <Card key={movie.id} image={ImageUrl + movie.poster_path}
                                title={type === "movie" ? movie.title : movie.name}
                                year={type === "movie" ? movie.release_date : movie.first_air_date}
                                rating={movie.vote_average}></Card>

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