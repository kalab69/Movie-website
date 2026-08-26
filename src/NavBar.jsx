function NavBar({ filterGenre, displayMovies, displayTv, searchMovie, search }) {



    return (<div className="navContainer"><div className="navBar">
        <a href="http://localhost:5173/" className="logo">
            <img src="icon.png"></img>
        </a>
        <button id="movieBtn" onClick={displayMovies}>Movies</button>
        <button id="tvBtn" onClick={displayTv}>Tv Shows</button>
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