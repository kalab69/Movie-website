import Card from './Card'
import SliderLoader from './SliderLoader'
import { useState, useEffect, useRef } from 'react'
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
    const observerTarget = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const Api_URL = `https://api.themoviedb.org/3/discover/${type}?${genre}api_key=18fff5e1b57ed556bacc51cd41ead165&include_adult=false&page=${count}`;

    useEffect(() => {
        const fetchMovies = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(Api_URL);
                const data = await response.json();

                setresults(prevResults => [
                    ...prevResults,
                    ...data.results
                ]);
            } catch (e) {

                console.error(e);
            }
            finally {
                setIsLoading(false);
            }

        }
        fetchMovies();
    }, [count, type, genre]);

      useEffect(() => {

        const observer = new IntersectionObserver(
            (entries) => {

                const target = entries[0];

            
                if (
                    target.isIntersecting &&
                    !isLoading ) {
                    setcount(prevCount => prevCount + 1);
                }

            },
            {
                rootMargin: "300px"
            }
        );

        // Start observing our target element
        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }
        return () => {
            if (observerTarget.current) {
                observer.unobserve(observerTarget.current);
            }
        };

    }, [isLoading, count]);

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
        setresults([]);
        window.scrollTo({top: 0 , behavior :"smooth"})
        document.getElementById("movieBtn").style.borderColor = "blue";
        document.getElementById("tvBtn").style.borderColor = "rgb(79, 72, 72)";
    }
    const displayTv = () => {
        setcount(1);
        setType("tv")
        setGenre("")
        setresults([]);
        window.scrollTo({top: 0 , behavior :"smooth"})
        document.getElementById("movieBtn").style.borderColor = "rgb(79, 72, 72)";
        document.getElementById("tvBtn").style.borderColor = "blue";
    }
    function filterGenre(id) {
        setcount(1);
        setresults([]);
        window.scrollTo({top: 0 , behavior :"smooth"})
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
                                rating={movie.vote_average}
                                details={movie.overview}></Card>

                        ))}
                    </div>

                     <div
                            ref={observerTarget}
                            style={{
                                height: "20px",
                                margin: "20px"
                            }}
                        >
                            {
                                isLoading &&
                                <p style={{ textAlign: "center" }}>
                                    Loading more movies...
                                </p>
                            }

                        </div>
                    
                </div>
                


        }



    </>)

}
export default App