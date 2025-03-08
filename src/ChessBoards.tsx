import { useState } from "react";
import { ChessBoard } from "./ChessBoard.tsx";
import "./chessBoards.css";
import { Levels, levels, Position3D } from "./knightTour.ts";

export const ChessBoards = () => {
	const [validMoves, setValidMoves] = useState<Position3D[]>([]);
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
