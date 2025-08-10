import {useEffect, useState} from "react";

function useLocalStorage(key) {
    const [value, setValue] = useState(() => JSON.parse(localStorage.getItem(key)) ?? [])

    useEffect(() => {
        localStorage.setItem('watched', JSON.stringify(value))
    }, [value]);

    return [value, setValue]
}

export {useLocalStorage}

