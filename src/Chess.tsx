import { makeTour, Position3D } from "./knightTour";
import { ChessBoards } from "./ChessBoards";
import { TourButton } from "./TourButton";
import { useState } from "react";
import "./css/chess.css";

export const Chess = () => {
	const testPos: Position3D = { file: "e", rank: 5, level: "E" };
	const [tour, setTour] = useState<Position3D[]>(makeTour(50, testPos));

	return (
		<div className="container">
			<TourButton setTour={setTour} tour={tour} />
			<ChessBoards tour={tour} />
		</div>
	);
};
