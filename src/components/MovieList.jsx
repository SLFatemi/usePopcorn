import Movie from "./Movie.jsx";

function MovieList({movies}) {
    return <ul className="list">
        {movies?.map((movie) => (
            <Movie movie={movie} key={movie.imdbID}/>
        ))}
    </ul>

}

export default MovieList