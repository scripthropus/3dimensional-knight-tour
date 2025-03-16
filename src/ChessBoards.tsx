import { useState } from "react";
import { ChessBoard } from "./ChessBoard.tsx";
import "./chessBoards.css";
import { levels, Position3D, knightMoves3D, ranks } from "./knightTour.ts";

type ChessBoardsProps = {
	validMoves: Position3D[];
};

export const ChessBoards: React.FC<ChessBoardsProps> = ({ validMoves }) => {
	const [currentPos, setCurrentPos] = useState<Position3D>(validMoves[0]);
	const [possibleMoves, setPossibleMoves] = useState<Position3D[]>(
		knightMoves3D(currentPos),
	);
	const onSquareClick = (pos: Position3D) => {
		setCurrentPos(() => pos);
		setPossibleMoves(() => knightMoves3D(pos));
	};
	return (
		<div className="layout-container">
			{levels.map((level) => (
				<div key={level} className="square-wrapper">
					<div className="number">Level {level}</div>
					<ChessBoard
						level={level}
						onSquareClick={onSquareClick}
						validMoves={validMoves}
						possibleMoves={possibleMoves}
						currentPos={currentPos}
					/>
				</div>
			))}
		</div>
	);
};
