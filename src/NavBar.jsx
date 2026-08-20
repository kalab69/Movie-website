function NavBar(props){



    return(<div className="navContainer"><div className="navBar">
    <a className="logo">
        <img src="icon.png"></img>
    </a>
    <button>Movies</button>
    <button>Tv Shows</button>
    <div className="searchBox">
    <img src="search.png " alt="serch"></img>
    <input type = "text" placeholder=""></input> 
    </div>
    </div></div>)
}
export default NavBar