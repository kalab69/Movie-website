import { Link, NavLink } from "react-router-dom"

function NavBar({ filterGenre, displayMovies, displayTv, searchMovie, search }) {



    return (<div className="navContainer"><div className="navBar">
        <Link to="http://localhost:5173/" className="logo">
            <img src="icon.png"></img>
        </Link>
        <NavLink to = "/movies">Movies</NavLink>
        <NavLink to = "/tv">TV Shows</NavLink>
        <div className="genreMenu">
            <button className="genreBtn">Generes</button>
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
            </div></div>
        <div className="searchBox">
            <img src="search.png " alt="serch"></img>
            <input type="text"
                onChange={searchMovie}
                value={search}
                placeholder="Search for Movie or Tv ..."></input>
        </div>
    </div></div>)
}
export default NavBar