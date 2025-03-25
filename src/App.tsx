import { useState } from "react";
import { ChessBoards } from "./ChessBoards";
import { makeTour, Position3D } from "./knightTour";
import { Button } from "./Button.tsx";

function App() {
	const testPos: Position3D = { file: "e", rank: 5, level: "E" };
	const [tour, setTour] = useState<Position3D[]>(makeTour(50, testPos));

	return (
		<div className="bg">
			<Button setTour={setTour} tour={tour}></Button>
			<div className="container">
				<ChessBoards tour={tour} />
			</div>
		</div>
	);
}

export default App;
