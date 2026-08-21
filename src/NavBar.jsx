function NavBar({ searchMovie, search }) {



    return (<div className="navContainer"><div className="navBar">
        <a className="logo">
            <img src="icon.png"></img>
        </a>
        <button>Movies</button>
        <button>Tv Shows</button>
        <button>Generes</button>
        <div className="searchBox">
            <img src="search.png " alt="serch"></img>
            <input type="text"
                          onChange={searchMovie}
                                     value = {search}></input>
        </div>
    </div></div>)
}
export default NavBar