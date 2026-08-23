function NavBar({ displayMovies, displayTv, searchMovie, search }) {



    return (<div className="navContainer"><div className="navBar">
        <a href="http://localhost:5173/" className="logo">
            <img src="icon.png"></img>
        </a>
        <button id="movieBtn" onClick={displayMovies}>Movies</button>
        <button id="tvBtn" onClick={displayTv}>Tv Shows</button>
        <div className="genreMenu">
            <button className="genreBtn">Generes</button>
            <div className="genres">
                <button>Action</button>
                <button>Adventure</button>
                <button>Anmation</button>
                <button>Comedy</button>
                <button>Crime</button>
                <button>Documentary</button>
                <button>Drama</button>
                <button>Family</button>
                <button>History</button>
                <button>Horror</button>
                <button>Mystery</button>
                <button>Romance</button>
                <button>SIFY</button>
            </div></div>
        <div className="searchBox">
            <img src="search.png " alt="serch"></img>
            <input type="text"
                onChange={searchMovie}
                value={search}></input>
        </div>
    </div></div>)
}
export default NavBar