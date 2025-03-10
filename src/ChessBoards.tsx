import { useState } from "react";
import { ChessBoard } from "./ChessBoard.tsx";
import "./chessBoards.css";
import { Levels, levels, Position3D, makeTour } from "./knightTour.ts";

export const ChessBoards = () => {
	const testPos: Position3D = { file: "e", rank: 5, level: "E" };
	const [validMoves, setValidMoves] = useState<Position3D[]>(
		makeTour(50, testPos),
	);
	const onSquareClick = () => {};
	return (
		<div className=" layout-container">
			{levels.map((level) => (
				<div key={level} className="square-wrapper">
					<div className="number">Level {level}</div>
					<ChessBoard
						level={level}
						onSquareClick={onSquareClick}
						validMoves={validMoves}
					/>
				</div>
			))}
		</div>
	);
};
