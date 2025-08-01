import {useEffect, useState} from 'react'
import {useDebounce} from "react-haiku"

import './App.css'
import NavBar from "./components/NavBar.jsx";
import Main from "./components/Main.jsx";
import Box from "./components/Box.jsx";
import MovieList from "./components/MovieList.jsx";
import WatchedMovies from "./components/WatchedMovies.jsx";
import WatchedSummary from "./components/WatchedSummary.jsx";
import Loader from "./components/Loader.jsx";
import ErrorMessage from "./components/ErrorMessage.jsx";
import SelectedMovie from "./components/SelectedMovie.jsx";


const KEY = '53814bf8';


function App() {

    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [query, setQuery] = useState("The Martian")
    const [selectedID, setSelectedID] = useState('')

    const debouncedQuery = useDebounce(query, 1000)


    function handleSelectMovie(id) {
        setSelectedID(selectedID === id ? null : id)
    }

    function handleCloseMovie() {
        setSelectedID(null)
    }

    function handleAddWatched(movie) {
        setWatched((curMovies) => [...curMovies, movie])
    }

    function handleRemoveWatched(id) {
        setWatched((curMovies) => curMovies.filter(movie => movie.imdbID !== id))
    }

    useEffect(() => {
        async function getMovieDataTitle() {
            setIsLoading(true)
            setError('')
            try {
                const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${debouncedQuery}`)
                if (!res.ok) throw new Error(`There was an error ${res.status}`)

                const data = await res.json()

                if (data.Response === 'False') throw new Error(`${data.Error}`)

                setMovies(data.Search)
            } catch (e) {
                setError(e.message)
            } finally {
                setIsLoading(false)
            }
            return null
        }

        if (!debouncedQuery || debouncedQuery.length < 3) {
            setMovies([])
            return
        }
        getMovieDataTitle()
    }, [debouncedQuery]);

    return (
        <>
            <NavBar query={query} setQuery={setQuery} movies={movies}/>
            <Main>
                <Box>
                    {isLoading && <Loader/>}
                    {!isLoading && !error &&
                        <MovieList movies={movies} onSelectMovie={handleSelectMovie}/>}
                    {error && <ErrorMessage message={error}/>}
                </Box>
                <Box>
                    {
                        selectedID ?
                            <SelectedMovie key={selectedID} onCloseMovie={handleCloseMovie} selectedID={selectedID}
                                           onAddWatched={handleAddWatched} watched={watched}/>
                            : <>
                                <WatchedSummary watched={watched}/>
                                <WatchedMovies onRemove={handleRemoveWatched} watched={watched}/>
                            </>
                    }
                </Box>
            </Main>
        </>
    );
}

export default App