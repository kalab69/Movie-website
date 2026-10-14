import { Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import Movies from './Movies';
import Tv from './Tv';
import Search from './Search';
import MovieDetails from './MovieDetails';
import TvDetails from './TvDetails';

function App() {
    return(
        <>
            <NavBar/>
            <Routes>
                <Route path="/" element={<Movies/>}/>
                <Route path="/movies" element={<Movies/>}/>
                <Route path="/movies/:id" element={<MovieDetails />} />
                <Route path ="/tv/:id" element ={<TvDetails/>}/>
                <Route path="/tv" element={<Tv/>} />
                <Route path="/search" element={<Search/>} />
            </Routes>
        </>
    )
}
export default App