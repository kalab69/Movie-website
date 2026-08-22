function NavBar({ displayMovies, displayTv, searchMovie, search }) {



    return (<div className="navContainer"><div className="navBar">
        <a href="http://localhost:5173/" className="logo">
            <img src="icon.png"></img>
        </a>
        <button id="movieBtn" onClick={displayMovies}>Movies</button>
        <button id="tvBtn" onClick={displayTv}>Tv Shows</button>
        <button>Generes</button>
        <div className="searchBox">
            <img src="search.png " alt="serch"></img>
            <input type="text"
                onChange={searchMovie}
                value={search}></input>
        </div>
    </div></div>)
}
export default NavBar