import Card from './Card'
import SliderLoader from './SliderLoader'
import { useState, useEffect, useRef } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'; // Import useNavigate

const ImageUrl = `https://image.tmdb.org/t/p/w500`;

function Movies() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate(); // Initialize navigate
    const genreId = searchParams.get("genre");

    const [count, setCount] = useState(1);
    const [results, setResults] = useState([]);
    const observerTarget = useRef(null);
    const [isLoading, setIsLoading] = useState(false);

    const activeGenreId = genreId === "10759" ? "12" : genreId;
    const genreQuery = activeGenreId ? `with_genres=${activeGenreId}&` : "";
    const Api_URL = `https://api.themoviedb.org/3/discover/movie?${genreQuery}api_key=18fff5e1b57ed556bacc51cd41ead165&include_adult=false&page=${count}`;

    useEffect(() => {
        setCount(1);
        setResults([]);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [genreId]);

    useEffect(() => {
        const fetchMovies = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(Api_URL);
                const data = await response.json();
                setResults(prevResults => [...prevResults, ...(data.results || [])]);
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        }
        fetchMovies();
    }, [count, genreId]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isLoading) {
                    setCount(prevCount => prevCount + 1);
                }
            },
            { rootMargin: "300px" }
        );
        if (observerTarget.current) observer.observe(observerTarget.current);
        return () => { if (observerTarget.current) observer.unobserve(observerTarget.current); };
    }, [isLoading]);

    return (
        <div className="mainBody">
            <SliderLoader type={"movie"} />
            <div className="container">
                {results.filter(movie => movie.poster_path).map((movie) => (
                    <Card 
                        key={movie.id} 
                        image={ImageUrl + movie.poster_path}
                        title={movie.title}
                        year={movie.release_date}
                        rating={movie.vote_average}
                        details={movie.overview}
                        // Navigate to the dynamic route when clicked
                        onClick={() => navigate(`/movies/${movie.id}`)}
                    />
                ))}
            </div>

            <div ref={observerTarget} style={{ height: "20px", margin: "20px" }}>
                {isLoading && (
                    <div className="loaderContaner">
                        <div className="loader"></div>
                    </div>
                )}
            </div>
        </div>
    )
}
export default Movies;