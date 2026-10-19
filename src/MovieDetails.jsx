import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Card from './Card';
import DownloadModal from './DownloadModal';

const API_KEY = "18fff5e1b57ed556bacc51cd41ead165";

function MovieDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [movie, setMovie] = useState(null);
    const [trailerKey, setTrailerKey] = useState(null);
    const [logoUrl, setLogoUrl] = useState(null);
    const [isMuted, setIsMuted] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [isWatching, setIsWatching] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [music, setMusic] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            setIsLoading(true);
            try {
                // Swapped 'similar' for 'recommendations' for much better accuracy
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=videos,credits,recommendations,images&include_image_language=en,null`
                );
                const data = await response.json();
                const musicResponse = await fetch(
                    `https://soundtrackdb.vercel.app/v1/titles/tmdb/${data.id}/music`
                );
                const musicData = await musicResponse.json();
                setMusic(musicData);

                setMovie(data);
                document.title = data.title + ' - Novimovies'

                const officialTrailer = data.videos?.results.find(
                    video => video.site === "YouTube" && (video.type === "Trailer" || video.type === "Teaser")
                );
                if (officialTrailer) {
                    setTrailerKey(officialTrailer.key);
                }

                const officialLogo = data.images?.logos?.find(l => l.iso_639_1 === 'en') || data.images?.logos?.[0];
                if (officialLogo) {
                    setLogoUrl(`https://image.tmdb.org/t/p/w500${officialLogo.file_path}`);
                }

            } catch (error) {
                console.error("Failed to fetch movie details:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovieDetails();
    }, [id]);

    if (isLoading) {
        return <div className="loaderContainer2"><div className="loader2"></div></div>;
    }

    if (!movie) {
        return <div className="mainBody"><h2>Movie not found</h2></div>;
    }

    const recommendedMovies = movie.recommendations?.results
        ?.filter(m => !m.adult)
        ?.slice(0, 10) || [];

    const castList = movie.credits?.cast
        ?.filter(actor => actor.profile_path)
        ?.slice(0, 18) || [];

    if (isWatching) {
        const embedUrl = `https://embed.vidrift.net/embed/movie/${movie.id}`
        return (<div className="fullscreenPlayerOverlay">
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
                    frameborder="0"
                    allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                    sandbox="allow-scripts allow-same-origin"
                    allowfullscreen
                    referrerpolicy="no-referrer"
                    title="Video player"
                />
            </div>
        </div>
        )
    }

    return (
        // 4. Render the modal right before your component returns its root div:

        <div className="movieContainer">
            {/* HERO SECTION */}
            <div className="heroSection">
                <button onClick={() => navigate(-1)} className="backBtn">
                    ⬅ Back
                </button>

                {trailerKey && (
                    <button className="muteToggleBtn" onClick={() => setIsMuted(!isMuted)}>
                        {isMuted ? "🔇 Unmute" : "🔊 Mute"}
                    </button>
                )}

                {trailerKey ? (
                    <div className="videoBackgroundWrapper">
                        <iframe
                            className="bgVideo"
                            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&loop=1&playlist=${trailerKey}&disablekb=1&modestbranding=1&playsinline=1&iv_load_policy=3&rel=0`}
                            title="Background Trailer"
                            frameBorder="0"
                            allow="autoplay; encrypted-media"
                        ></iframe>
                    </div>
                ) : (
                    <div
                        className="movieBackground"
                        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
                    />
                )}

                <div className="heroOverlay" />

                <div className="heroContent">
                    {logoUrl ? (
                        <img src={logoUrl} alt={movie.title} className="movieLogoImage" />
                    ) : (
                        <h1 className="heroTitle">{movie.title}</h1>
                    )}

                    <div className="heroMeta">
                        <span>⭐ {movie.vote_average?.toFixed(1)}</span>
                        <span>{movie.release_date?.split("-")[0]}</span>
                        <span>{movie.genres?.map(g => g.name).join("•")}</span>
                    </div>
                    <p className="heroOverview">{movie.overview}</p>
                    <div className="heroButtons">
                        <button className="playNowBtn" onClick={() => {
                            setIsWatching(true)
                        }}>▶ Play</button>
                        <button className="downloadBtn" onClick={() => setIsDownloading(true)}>
                            <img
                                src="https://api.iconify.design/lucide:download.svg?color=black"
                                alt="Download"
                                className="btnIcon"
                            />
                        </button>
                        {music?.music?.some(track => track.platform === "spotify" && track.url) ? (
                            <a
                                className="spotifyBtn"
                                href={
                                    music.music.find(
                                        track => track.platform === "spotify" && track.url
                                    ).url
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Open Spotify soundtrack"
                            >
                                <img
                                    src="https://cdn.simpleicons.org/spotify/1DB954?utm_source=chatgpt.com"
                                    alt=""
                                    className="spotifyIcon"
                                />
                            </a>
                        ) : (
                            <button
                                className="spotifyBtn"
                                disabled
                                aria-label="Spotify soundtrack unavailable"
                            >
                                <img
                                    src="https://cdn.simpleicons.org/spotify/1DB954?utm_source=chatgpt.com"
                                    alt=""
                                    className="spotifyIcon"
                                />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* SCROLLABLE DETAILS BELOW */}
            <div className="scrollableDetails">
                <section className="sectionBlock">
                    <h2>Top Cast</h2>
                    <div className="castScrollContainer">
                        {castList.map(actor => (
                            <div key={actor.id} className="castCard">
                                <img
                                    src={actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : "placeholder.png"}
                                    alt={actor.name}
                                />
                                <p className="actorName">{actor.name}</p>
                                <p className="charName">{actor.character}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {recommendedMovies.length > 0 && (
                    <section className="sectionBlock">
                        <h2>Recommendations</h2>
                        <div className="container">
                            {recommendedMovies.map(recMovie => (
                                <Card
                                    key={recMovie.id}
                                    image={recMovie.poster_path ? `https://image.tmdb.org/t/p/w500${recMovie.poster_path}` : "placeholder.png"}
                                    title={recMovie.title}
                                    year={recMovie.release_date}
                                    rating={recMovie.vote_average}
                                    details={recMovie.overview}
                                    onClick={() => navigate(`/movies/${recMovie.id}`)}
                                />
                            ))}
                        </div>
                    </section>
                )}
            </div>
            {isDownloading && (
                <DownloadModal
                    mediaType="movie"
                    movieId={id}
                    mediaTitle={movie.title}
                    onClose={() => setIsDownloading(false)}
                />
            )}
        </div>
    );
}

export default MovieDetails;