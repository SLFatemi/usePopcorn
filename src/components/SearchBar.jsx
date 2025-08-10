import {useEffect, useRef} from "react";

function SearchBar({query, setQuery}) {
    const searchEl = useRef(null)
    useEffect(() => {
        function callBack(e) {
            if (document.activeElement === searchEl.current) return
            
            if (window.innerWidth > 768 && e.code === 'Enter') {
                searchEl.current.focus()
                setQuery('')
            }
        }

        document.addEventListener('keydown', callBack)
        return () => document.removeEventListener('keydown', callBack)
    }, [setQuery]);

    return <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={searchEl}
    />

}

export default SearchBar