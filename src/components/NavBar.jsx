import SearchBar from "./SearchBar.jsx";
import Logo from "./Logo.jsx";

function NavBar({movies}) {
    return <nav className="nav-bar">
        <Logo/>
        <SearchBar/>
        <p className="num-results">
            Found <strong>{movies.length}</strong> results
        </p>
    </nav>

}

export default NavBar