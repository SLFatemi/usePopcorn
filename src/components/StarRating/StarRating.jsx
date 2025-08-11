import "./StarRating.css";
import PropTypes from "prop-types";
import { useState } from "react";
import Star from "./Star.jsx";

StarRating.propType = {
	maxRating: PropTypes.number,
	size: PropTypes.number,
	color: PropTypes.string,
};

function StarRating({
	maxRating = 10,
	size = 48,
	color = "#fcc419",
	rating,
	setRating,
}) {
	const [tempRating, setTempRating] = useState(0);

	function handleClick(index) {
		setRating(index + 1);
	}

	function handleHover(index) {
		setTempRating(index + 1);
	}

	function handleLeave() {
		setTempRating(0);
	}

	return (
		<div className={"container"}>
			<div className={"stars-container"}>
				{Array.from({ length: maxRating }, (_, i) => {
					return (
						<Star
							isSelected={tempRating ? i < tempRating : i < rating}
							onRate={() => handleClick(i)}
							onHover={() => handleHover(i)}
							onLeave={handleLeave}
							size={size}
							color={color}
							// biome-ignore lint/suspicious/noArrayIndexKey: <No other option>
							key={i}
						/>
					);
				})}
			</div>
			<span className={"stars-text"} style={{ fontSize: `${size}px`, color }}>
				{(tempRating ? tempRating : rating) || ""}
			</span>
		</div>
	);
}

export default StarRating;
