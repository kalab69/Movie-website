import { Link, NavLink, useNavigate, useSearchParams, useLocation } from "react-router-dom"

function NavBar() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const location = useLocation();

    const currentSearchValue = location.pathname === "/search"
        ? (searchParams.get('q') || "")
        : "";

    function searchMovie(event) {
        const value = event.target.value;
        if (value.trim() === "") {
            navigate("/");
        } else {
            navigate(`/search?q=${encodeURIComponent(value)}`);
        }
    }

    function filterGenre(id) {
        // If user is on TV, stay on TV; otherwise default to Movies (/movies)
        const basePath = location.pathname.startsWith("/tv") ? "/tv" : "/movies";
        navigate(`${basePath}?genre=${id}`);
    }

    return (
        <div className="navContainer">
            <div className="navBar">
                <Link to="/" className="logo">
                    <img src="icon.png" alt="logo" />
                </Link>
                <NavLink to="/movies" id="movieBtn" className={({isActive}) => isActive ? "isActive" : ""}>Movies</NavLink>
                <NavLink to="/tv" id="movieBtn" className={({isActive}) => isActive ? "isActive" : ""}>TV Shows</NavLink>
                <div className="genreMenu">
                    <button className="genreBtn">Genres</button>
                    <div className="genres">
                        <button onClick={() => filterGenre(10759)}>Action & Adventure</button>
                        <button onClick={() => filterGenre(16)}>Animation</button>
                        <button onClick={() => filterGenre(35)}>Comedy</button>
                        <button onClick={() => filterGenre(80)}>Crime</button>
                        <button onClick={() => filterGenre(99)}>Documentary</button>
                        <button onClick={() => filterGenre(18)}>Drama</button>
                        <button onClick={() => filterGenre(10751)}>Family</button>
                        <button onClick={() => filterGenre(9648)}>Mystery</button>
                        <button onClick={() => filterGenre(37)}>Western</button>
                    </div>
                </div>
                <div className="searchBox">
                    <img src="search.png" alt="search" />
                    <input 
                        type="text"
                        onChange={searchMovie}
                        value={currentSearchValue}
                        placeholder="Search for Movie or Tv ..."
                    />
                </div>
            </div>
        </div>
    )
}
export default NavBar