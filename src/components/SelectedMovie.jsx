import {useEffect, useState} from "react";
import StarRating from "./StarRating/StarRating.jsx";
import Loader from "./Loader.jsx";

const KEY = '53814bf8';

function SelectedMovie({selectedID, onCloseMovie}) {

    const [movie, setMovie] = useState({})
    const [isLoading, setIsLoading] = useState(false)
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

    useEffect(() => {
        async function getMovieDetails() {
            setIsLoading(true)
            try {
                const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedID}`)
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
                    <div className={'rating'}>
                        <StarRating maxRating={10} size={24}/>
                    </div>
                    <p><em>{plot}</em></p>
                    <p>Starring {actors}</p>
                    <p>Directed by {director}</p>
                </section>
            </>}
    </div>
}

export default SelectedMovie

