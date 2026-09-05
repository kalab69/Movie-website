import Card from './Card'
import SliderLoader from './SliderLoader'
import { useState, useEffect, useRef } from 'react'
const ImageUrl = `https://image.tmdb.org/t/p/w500`;
function Tv() {
    const [results, setresults] = useState([]);
    const [count, setcount] = useState(1);
    const [genre, setGenre] = useState("");
    const observerTarget = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const Api_URL = `https://api.themoviedb.org/3/discover/tv?${genre}api_key=18fff5e1b57ed556bacc51cd41ead165&include_adult=false&page=${count}`;

    useEffect(() => {
        const fetchTv = async () => {
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
        fetchTv();
    }, [count, genre]);

    useEffect(() => {

        const observer = new IntersectionObserver(
            (entries) => {

                const target = entries[0];


                if (
                    target.isIntersecting &&
                    !isLoading) {
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
        window.scrollTo({ top: 0, behavior: "smooth" })
        setGenre(`with_genres=${id}&`)
    }


    return (<>


        <div className="mainBody">
            <SliderLoader />
            <div className="container">
                {results.filter(tv => tv.poster_path).map((tv) => (


                    <Card key={tv.id} image={ImageUrl + tv.poster_path}
                        title={tv.name}
                        year={tv.first_air_date}
                        rating={tv.vote_average}
                        details={tv.overview}></Card>

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
                    <div className="loaderContaner">

                        <div className="loader">
                        </div>
                    </div>

                }

            </div>

        </div>
   </>)

}
export default Tv
