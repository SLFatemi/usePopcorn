import { useRef } from "react";
import { useKey } from "../hooks/useKey.jsx";

function SearchBar({ query, setQuery }) {
	const searchEl = useRef(null);

	useKey("Enter", () => {
		if (document.activeElement === searchEl.current) return;

		if (window.innerWidth > 768) {
			searchEl.current.focus();
			setQuery("");
		}
	});

	return (
		<input
			className="search"
			type="text"
			placeholder="Search movies..."
			value={query}
			onChange={(e) => setQuery(e.target.value)}
			ref={searchEl}
		/>
	);
}

export default SearchBar;
