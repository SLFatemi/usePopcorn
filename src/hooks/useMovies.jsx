import {useEffect, useState} from "react";

const KEY = '53814bf8';

function useMovies(query) {


    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const controller = new AbortController()

        async function getMovieDataTitle() {
            setIsLoading(true)
            setError('')
            try {
                const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`, {signal: controller.signal})
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

        if (!query || query.length < 3) {
            setMovies([])
            return
        }
        getMovieDataTitle()

        return function () {
            // Not needed
            // controller.abort()
        }
    }, [query]);

    return [movies, isLoading, error]
}

export {useMovies}



