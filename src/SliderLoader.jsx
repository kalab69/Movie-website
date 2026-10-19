import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Slider from './Slider';

const ImageUrl = 'https://image.tmdb.org/t/p/original';
const ApiKey = '18fff5e1b57ed556bacc51cd41ead165';

function SliderLoader(props) {
    const Api_path = `https://api.themoviedb.org/3/trending/${props.type}/week?api_key=${ApiKey}`;

    const [movies, setMovies] = useState([]);
    const [slide, setSlide] = useState(0);
    const [logo, setLogo] = useState(null);
    const [isWatching, setIsWatching] = useState(false); // --- Added isWatching state ---

    const navigate = useNavigate();

    // Fetch trending movies or TV shows.
    useEffect(() => {
        fetch(Api_path)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch trending titles');
                }
                return response.json();
            })
            .then(data => {
                setMovies(data.results || []);
                setSlide(0);
            })
            .catch(error => console.error(error));
    }, [Api_path]);

    // Automatically advance the slider.
    useEffect(() => {
        if (movies.length === 0 || isWatching) return; // Pause slider when watching

        const interval = setInterval(() => {
            setSlide(previous => (previous + 1) % movies.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [movies.length, isWatching]);

    // Fetch the logo for the currently displayed movie or TV show.
    useEffect(() => {
        if (movies.length === 0) return;

        const currentMovie = movies[slide];
        if (!currentMovie) return;

        let cancelled = false;

        setLogo(null);

        const imagesUrl =
            `https://api.themoviedb.org/3/${props.type}/${currentMovie.id}/images?api_key=${ApiKey}`;

        fetch(imagesUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch title logos');
                }
                return response.json();
            })
            .then(data => {
                if (cancelled) return;

                const logos = data.logos || [];

                const selectedLogo =
                    logos.find(item => item.iso_639_1 === 'en') ||
                    logos.find(item => item.iso_639_1 === null) ||
                    logos[0];

                setLogo(
                    selectedLogo
                        ? ImageUrl + selectedLogo.file_path
                        : null
                );
            })
            .catch(error => {
                if (!cancelled) {
                    console.error(error);
                    setLogo(null);
                }
            });

        return () => {
            cancelled = true;
        };
    }, [movies, slide, props.type]);

    const privSlide = () => {
        if (movies.length === 0) return;

        setSlide(previous =>
            (previous - 1 + movies.length) % movies.length
        );
    };

    const nextSlide = () => {
        if (movies.length === 0) return;

        setSlide(previous =>
            (previous + 1) % movies.length
        );
    };

    function selectPathToNav(movieId, mediaType) {
        mediaType === 'movie'
            ? navigate(`/movies/${movieId}`)
            : navigate(`/tv/${movieId}`);
    }

    if (movies.length === 0) {
        return <p>Loading...</p>;
    }

    const currentMovie = movies[slide];

    // --- If Play is clicked, render the Fullscreen Player Overlay ---
    if (isWatching) {
        const embedUrl = props.type === 'movie'
            ? `https://embed.vidrift.net/embed/movie/${currentMovie.id}`
            : `https://embed.vidrift.net/embed/tv/${currentMovie.id}/1/1`;

        return (
            <div className="fullscreenPlayerOverlay">
                {/* Manual Back Button */}
                <button className="backBtn" onClick={() => setIsWatching(false)}>
                    ⬅ Back
                </button>

                {/* Video Player Embedder */}
                <div className="playerWrapper">
                    <iframe
                        src={embedUrl}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                        allowFullScreen
                        referrerPolicy="no-referrer"
                        title="Video player"
                    />
                </div>
            </div>
        );
    }

    return (
        <Slider
            key={currentMovie.id}
            image={ImageUrl + currentMovie.backdrop_path}
            title={
                props.type === 'movie'
                    ? currentMovie.title
                    : currentMovie.name
            }
            logo={logo}
            year={
                props.type === 'movie'
                    ? currentMovie.release_date
                    : currentMovie.first_air_date
            }
            rating={currentMovie.vote_average}
            description={currentMovie.overview}
            nextSlide={nextSlide}
            privSlide={privSlide}
            onInfo={() => selectPathToNav(currentMovie.id, props.type)}
            onPlay={() => setIsWatching(true)} // Triggers the player overlay directly
        />
    );
}

export default SliderLoader;