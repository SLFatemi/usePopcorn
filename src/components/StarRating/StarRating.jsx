import './StarRating.css'
import {useState} from "react";
import Star from "./Star.jsx";
import PropTypes from 'prop-types'

StarRating.propType = {
    maxRating: PropTypes.number,
    size: PropTypes.number,
    color: PropTypes.string
}

function StarRating({maxRating = 10, size = 48, color = '#fcc419', rating, setRating}) {
    const [tempRating, setTempRating] = useState(0)

    function handleClick(index) {
        setRating(index + 1)
    }

    function handleHover(index) {
        setTempRating(index + 1)
    }

    function handleLeave() {
        setTempRating(0)
    }

    return <div className={'container'}>
        <div className={'stars-container'}>
            {Array.from({length: maxRating}, (_, i) => {
                return <Star isSelected={tempRating ? i < tempRating : i < rating}
                             onRate={() => handleClick(i)}
                             onHover={() => handleHover(i)}
                             onLeave={handleLeave}
                             size={size}
                             color={color}
                             key={i}
                />
            })}
        </div>
        <span className={'stars-text'} style={{fontSize: `${size}px`, color}}>{(tempRating ? tempRating
            : rating) || ''}</span>
    </div>
}

export default StarRating;


/*
FULL STAR

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 20 20"
  fill="#000"
  stroke="#000"
>
  <path
    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
  />
</svg>


EMPTY STAR

<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke="#000"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="{2}"
    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
  />
</svg>

*/
