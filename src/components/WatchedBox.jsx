import {useState} from "react";
import HideButton from "./HideButton.jsx";
import WatchedSummary from "./WatchedSummary.jsx";
import WatchedList from "./WatchedList.jsx";

function WatchedBox({watched}) {
    const [isOpen, setIsOpen] = useState(true);
    return <div className="box">
        <HideButton isOpen={isOpen} setIsOpen={setIsOpen}/>
        {isOpen && (
            <>
                <WatchedSummary watched={watched}/>
                <WatchedList watched={watched}/>
            </>
        )}
    </div>

}

export default WatchedBox