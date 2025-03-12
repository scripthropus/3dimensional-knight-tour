import { useState } from "react";
import { ChessBoards } from "./ChessBoards";
import { makeTour, Position3D } from "./knightTour";

function App() {
	const testPos: Position3D = { file: "e", rank: 5, level: "E" };
	const [validMoves, setValidMoves] = useState<Position3D[]>(
		makeTour(50, testPos),
	);

	return (
		<div className="bg">
			<div className="container">
				<ChessBoards validMoves={validMoves} />
			</div>
		</div>
	);
}

export default App;
