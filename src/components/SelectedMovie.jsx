import {useEffect, useState} from "react";
import StarRating from "./StarRating/StarRating.jsx";
import Loader from "./Loader.jsx";

const KEY = '53814bf8';

function SelectedMovie({selectedID, onCloseMovie, onAddWatched, watched}) {
    const [userRating, setUserRating] = useState(0)
    const [movie, setMovie] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [avgRating, setAvgRating] = useState(0)


    const {
        Title: title,
        Year: year,
        Poster: poster,
        imdbRating,
        Plot: plot,
        Runtime: runtime,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre
    } = movie

    function handleAdd() {
        const newMovie = {
            imdbID: selectedID,
            title,
            year,
            poster,
            imdbRating: +imdbRating,
            runtime: +runtime.split(' ').at(0),
            userRating: userRating
        }
        // onCloseMovie()
        onAddWatched(newMovie)
    }

    useEffect(() => {
        async function getMovieDetails() {
            setIsLoading(true)
            try {
                const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&i=${selectedID}`)
                if (!res.ok) throw new Error(`There was an error ${res.status}`)

                const data = await res.json()
                if (data.Response === 'False') throw new Error(`${data.Error}`)

                setMovie(data)
            } catch (e) {
                console.error(e)
            } finally {
                setIsLoading(false)
            }
            return null
        }

        getMovieDetails()

    }, [selectedID]);

    useEffect(() => {
        if (!title) return
        document.title = `Movie | ${title}`

        return function () {
            document.title = 'usePopcorn'
        }
    }, [title]);

    useEffect(() => {
        const callBack = () => {
            if (e.code === 'Escape') onCloseMovie()
        }
        document.addEventListener('keydown', callBack)

        // Cleanup function!
        return function () {
            document.removeEventListener('keydown', callBack)
        }
    }, [onCloseMovie]);


    return <div className={'details'}>
        {isLoading ?
            <Loader/>
            :
            <>
                <header>
                    <button className={'btn-back'} onClick={onCloseMovie}>&larr;</button>
                    <img src={poster} alt={`poster of ${title}`}/>
                    <div className="details-overview">
                        <h2>{title}</h2>
                        <p>{released} &bull; {runtime}</p>
                        <p>{genre}</p>
                        <p><span>⭐</span>{imdbRating}</p>
                    </div>
                </header>
                <section>
                    {watched.some((movie) => movie.imdbID === selectedID) ?
                        <div className={'rating'}>
                            You rated this movie
                            a ⭐ {watched.filter(movie => movie.imdbID === selectedID)?.at(0).userRating}/10
                        </div> :
                        <div className={'rating'}>
                            <StarRating rating={userRating} setRating={setUserRating} maxRating={10} size={24}/>
                            {userRating > 0 && <button onClick={handleAdd} className={'btn-add'}>+ Add to list</button>}
                        </div>}
                    <p><em>{plot}</em></p>
                    <p>Starring {actors}</p>
                    <p>Directed by {director}</p>
                </section>
            </>}
    </div>
}

export default SelectedMovie

