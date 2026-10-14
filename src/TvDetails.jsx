import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ImageUrl = "https://image.tmdb.org/t/p/w500";
const API_KEY = "18fff5e1b57ed556bacc51cd41ead165";

function TvDetails() {
    const { id } = useParams(); // Extracts the :id from the URL (e.g., /tv/1399 -> id = 1399)
    const navigate = useNavigate();
    const [tv, setTv] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTvDetails = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`);
                const data = await response.json();
                setTv(data);
            } catch (error) {
                console.error("Failed to fetch Tv details:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTvDetails(); // Fixed typo here
    }, [id]);

    if (isLoading) {
        return <div className="loaderContainer"><div className="loader"></div></div>;
    }

    if (!tv) {
        return <div className="mainBody"><h2>Tv not found</h2></div>;
    }

    return (
        <div className="moviePage">
            {tv.backdrop_path && (
                <div
                    className="movieBackground"
                    style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original${tv.backdrop_path})`,
                    }}
                />
            )}
            
            {/* navigate(-1) takes the user back to the previous page seamlessly */}
            <button onClick={() => navigate(-1)} className="backBtn" style={{ margin: "20px" }}>
                ⬅ back
            </button>
            <div className="detailsContent" style={{ display: "flex", padding: "20px", gap: "30px" }}>
                <img
                    src={tv.poster_path ? ImageUrl + tv.poster_path : "placeholder.png"}
                    alt={tv.name}
                    style={{ borderRadius: "10px", maxHeight: "500px" }}
                />
                <div className="textInfo" style={{ color: "white" }}>
                    <h1>{tv.name}</h1>
                    <p><strong>First Air Date:</strong> {tv.first_air_date}</p>
                    <p><strong>Rating:</strong> ⭐ {tv.vote_average?.toFixed(1)}</p>
                    <p><strong>Seasons:</strong> {tv.number_of_seasons}</p>
                    <p><strong>Episodes:</strong> {tv.number_of_episodes}</p>
                    <p><strong>Genres:</strong> {tv.genres?.map(g => g.name).join(", ")}</p>
                    <p style={{ marginTop: "20px", lineHeight: "1.6" }}>{tv.overview}</p>
                </div>
            </div>
        </div>
    );
}

export default TvDetails;