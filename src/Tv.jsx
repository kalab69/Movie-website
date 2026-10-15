import Card from './Card'
import SliderLoader from './SliderLoader'
import { useState, useEffect, useRef } from 'react'
import { useSearchParams , useNavigate } from 'react-router-dom';

const ImageUrl = `https://image.tmdb.org/t/p/w500`;

function Tv() {
    const [searchParams] = useSearchParams();
    const genreId = searchParams.get("genre");
    const navigate = useNavigate();

    const [results, setResults] = useState([]);
    const [count, setCount] = useState(1);
    const observerTarget = useRef(null);
    const [isLoading, setIsLoading] = useState(false);

    const genreQuery = genreId ? `with_genres=${genreId}&` : "";
    const Api_URL = `https://api.themoviedb.org/3/discover/tv?${genreQuery}api_key=18fff5e1b57ed556bacc51cd41ead165&include_adult=false&page=${count}`;

    useEffect(() => {
        setCount(1);
        setResults([]);
        window.scrollTo({ top: 0, behavior: "smooth" });
         document.title = ('Tvs' +  ' - Novimovies');
    }, [genreId]);

    useEffect(() => {
        const fetchTv = async () => {
            setIsLoading(true);
            try {
               const response = await fetch(Api_URL);
                const data = await response.json();
                
                setResults(prevResults => {
                    // Create a Set of existing movie IDs to check for duplicates
                    const existingIds = new Set(prevResults.map(movie => movie.id));
                    
                    // Only keep new movies that aren't already in the list
                    const uniqueNewMovies = (data.results || []).filter(movie => !existingIds.has(movie.id));
                    
                    return [...prevResults, ...uniqueNewMovies];
                });
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        }
        fetchTv();
    }, [count, genreId]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const target = entries[0];
                if (target.isIntersecting && !isLoading) {
                    setCount(prevCount => prevCount + 1);
                }
            },
            { rootMargin: "300px" }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }
        return () => {
            if (observerTarget.current) {
                observer.unobserve(observerTarget.current);
            }
        };
    }, [isLoading]);

    return (
        <div className="mainBody">
            <SliderLoader type={"tv"} />
            <div className="container">
                {results.filter(tv => tv.poster_path).map((tv) => (
                    <Card 
                        key={tv.id} 
                        image={ImageUrl + tv.poster_path}
                        title={tv.name}
                        year={tv.first_air_date}
                        rating={tv.vote_average}
                        details={tv.overview}
                        onClick = {()=>navigate(`/Tv/${tv.id}`)}
                    />
                ))}
            </div>

            <div
                ref={observerTarget}
                style={{ height: "20px", margin: "20px" }}
            >
                {isLoading && (
                    <div className="loaderContaner">
                        <div className="loader"></div>
                    </div>
                )}
            </div>
        </div>
    )
}
export default Tv