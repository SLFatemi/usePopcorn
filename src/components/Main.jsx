import ListBox from "./ListBox.jsx";
import WatchedBox from "./WatchedBox.jsx";

function Main({movies, watched}) {

    return <main className="main">
        <ListBox movies={movies}/>
        <WatchedBox watched={watched}/>
    </main>
}

export default Main