import WatchedMovie from "./WatchedMovie.jsx";

function WatchedMovies({watched}) {
    return <ul className="list">
        {watched.map((movie) => (
            <WatchedMovie movie={movie} key={movie.imdbID}/>
        ))}
    </ul>
}

export default WatchedMovies
