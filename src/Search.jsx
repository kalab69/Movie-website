import Card from './Card'
import { useState, useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
const ImageUrl = `https://image.tmdb.org/t/p/w500`;
const SearchUrl = `https://api.themoviedb.org/3/search/multi?api_key=18fff5e1b57ed556bacc51cd41ead165&query=`;

function Search() {
    const [searchResults, setSearchResults] = useState([]);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const search = searchParams.get('q')||"";
    useEffect(()=>{
        if(!search.trim()){
            navigate('/');
        }
    },[navigate,search])

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
        

            {

                (searchResults.length == 0) ? <h1 className="noResults">Could not find Movie  / Tv Show"{search}"</h1> :
                    (<div className="container">
                        {
                            searchResults.filter(movie => movie.poster_path).map(movie => (
                                <Card key={movie.id} image={ImageUrl + movie.poster_path}
                                    title={movie.media_type === "movie" ? movie.title : movie.name}
                                    year={movie.media_type === "movie" ? movie.release_date : movie.first_air_date}
                                    rating={movie.vote_average}
                                    details={movie.overview}
                                    ></Card>
                            ))


                        }

                    </div>


                    )}
                    
   </>)

}
export default Search