import {useEffect} from "react";

function useKey(key, callback) {
    console.log("bae")
    useEffect(() => {
        const callBack = (e) => {
            if (e.code === key) callback?.()
        }
        document.addEventListener('keydown', callBack)

        // Cleanup function!
        return function () {
            document.removeEventListener('keydown', callBack)
        }
    }, [key, callback]);
}

export {useKey}

