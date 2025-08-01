import WatchedMovie from "./WatchedMovie.jsx";

function WatchedMovies({watched, onRemove}) {
    return <ul className="list">
        {watched.map((movie) => (
            <WatchedMovie onRemove={onRemove} movie={movie} key={movie.imdbID}/>
        ))}
    </ul>
}

export default WatchedMovies
