import { useState } from "react";
import HideButton from "./HideButton.jsx";

function Box({ children }) {
	const [isOpen, setIsOpen] = useState(true);
	return (
		<div className="box">
			<HideButton isOpen={isOpen} setIsOpen={setIsOpen} />
			{isOpen && children}
		</div>
	);
}

export default Box;
