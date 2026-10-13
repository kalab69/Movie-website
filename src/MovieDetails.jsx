import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ImageUrl = "https://image.tmdb.org/t/p/w500";
const API_KEY = "18fff5e1b57ed556bacc51cd41ead165";

function MovieDetails() {
    const { id } = useParams(); // Extracts the :id from the URL (e.g., /movies/550 -> id = 550)
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
                const data = await response.json();
                setMovie(data);
            } catch (error) {
                console.error("Failed to fetch movie details:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovieDetails();
    }, [id]);

    if (isLoading) {
        return <div className="loaderContainer"><div className="loader"></div></div>;
    }

    if (!movie) {
        return <div className="mainBody"><h2>Movie not found</h2></div>;
    }

    return (
        <div className="moviePage">
            <div
                className="movieBackground"
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                }}
            />
            {/* navigate(-1) takes the user back to the previous page seamlessly */}
            <button onClick={() => navigate(-1)} className="backBtn" style={{ margin: "20px" }}>
                ⬅ back
            </button>
            <div className="detailsContent" style={{ display: "flex", padding: "20px", gap: "30px" }}>
                <img
                    src={movie.poster_path ? ImageUrl + movie.poster_path : "placeholder.png"}
                    alt={movie.title}
                    style={{ borderRadius: "10px", maxHeight: "500px" }}
                />
                <div className="textInfo" style={{ color: "white" }}>
                    <h1>{movie.title}</h1>
                    <p><strong>Release Date:</strong> {movie.release_date}</p>
                    <p><strong>Rating:</strong> ⭐ {movie.vote_average?.toFixed(1)}</p>
                    <p><strong>Genres:</strong> {movie.genres?.map(g => g.name).join(", ")}</p>
                    <p style={{ marginTop: "20px", lineHeight: "1.6" }}>{movie.overview}</p>
                </div>
            </div>
        </div>
    );
}

export default MovieDetails;