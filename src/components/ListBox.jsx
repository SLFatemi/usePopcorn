import {useState} from "react";
import MovieList from "./MovieList.jsx";
import HideButton from "./HideButton.jsx";

function ListBox({movies}) {
    const [isOpen, setIsOpen] = useState(true);
    return <div className="box">
        <HideButton isOpen={isOpen} setIsOpen={setIsOpen}/>
        {isOpen && (
            <MovieList movies={movies}/>
        )}
    </div>

}

export default ListBox