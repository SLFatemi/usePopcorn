import { useState } from "react";
import { useDebounce } from "react-haiku";

import "./App.css";
import Box from "./components/Box.jsx";
import ErrorMessage from "./components/ErrorMessage.jsx";
import Loader from "./components/Loader.jsx";
import Main from "./components/Main.jsx";
import MovieList from "./components/MovieList.jsx";
import NavBar from "./components/NavBar.jsx";
import SelectedMovie from "./components/SelectedMovie.jsx";
import WatchedMovies from "./components/WatchedMovies.jsx";
import WatchedSummary from "./components/WatchedSummary.jsx";
import { useLocalStorage } from "./hooks/useLocalStorage.jsx";
import { useMovies } from "./hooks/useMovies.jsx";

function App() {
	const [query, setQuery] = useState("The Martian");
	const [selectedID, setSelectedID] = useState("");

	const debouncedQuery = useDebounce(query, 1000);

	const [movies, isLoading, error] = useMovies(debouncedQuery);
	const [watched, setWatched] = useLocalStorage("watched");

	function handleSelectMovie(id) {
		setSelectedID(selectedID === id ? null : id);
	}

	function handleCloseMovie() {
		setSelectedID(null);
	}

	function handleAddWatched(movie) {
		setWatched((curMovies) => [...curMovies, movie]);
	}

	function handleRemoveWatched(id) {
		setWatched((curMovies) => curMovies.filter((movie) => movie.imdbID !== id));
	}

	return (
		<>
			<NavBar query={query} setQuery={setQuery} movies={movies} />
			<Main>
				<Box>
					{isLoading && <Loader />}
					{!isLoading && !error && (
						<MovieList movies={movies} onSelectMovie={handleSelectMovie} />
					)}
					{error && <ErrorMessage message={error} />}
				</Box>
				<Box>
					{selectedID ? (
						<SelectedMovie
							key={selectedID}
							onCloseMovie={handleCloseMovie}
							selectedID={selectedID}
							onAddWatched={handleAddWatched}
							watched={watched}
						/>
					) : (
						<>
							<WatchedSummary watched={watched} />
							<WatchedMovies onRemove={handleRemoveWatched} watched={watched} />
						</>
					)}
				</Box>
			</Main>
		</>
	);
}

export default App;
