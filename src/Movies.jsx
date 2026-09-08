
import Card from './Card'
import SliderLoader from './SliderLoader'
import { useState, useEffect, useRef } from 'react'
const ImageUrl = `https://image.tmdb.org/t/p/w500`;
const SearchUrl = `https://api.themoviedb.org/3/search/multi?api_key=18fff5e1b57ed556bacc51cd41ead165&query=`;


function Movies(){
    const [count, setcount] = useState(1);
    const [results, setresults] = useState([]);
    const [genre, setGenre] = useState("");
    const observerTarget = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const Api_URL = `https://api.themoviedb.org/3/discover/movie?${genre}api_key=18fff5e1b57ed556bacc51cd41ead165&include_adult=false&page=${count}`;

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
    }, [count, genre]);

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
   
    function filterGenre(id) {
        setcount(1);
        setresults([]);
        window.scrollTo({top: 0 , behavior :"smooth"})
        // check if it movie if so make id to adventure of movie which is 12
        if (id == 10759) {
            setGenre(`with_genres=${12}&`);
            return;
        }
        setGenre(`with_genres=${id}&`);
    }


    return (<>
                <div className="mainBody">
                    <SliderLoader type={"movie"}/>
                    <div className="container">
                        {results.filter(movie => movie.poster_path).map((movie) => (


                            <Card key={movie.id} 
                               image={ImageUrl + movie.poster_path}
                                title={movie.title }
                                year={movie.release_date }
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
                                <div className = "loaderContaner">

                                     <div className="loader">
                                </div>
                                </div>
                               
                            }

                        </div>
                    
                </div>



    </>)

}
export default Movies