import { useState } from "react";
import { ChessBoard } from "./ChessBoard.tsx";
import { levels, Position3D, knightMoves3D, ranks } from "./knightTour.ts";
import "./css/chess.css";

type ChessBoardsProps = {
	tour: Position3D[];
};

export const ChessBoards: React.FC<ChessBoardsProps> = ({ tour }) => {
	const [currentPos, setCurrentPos] = useState<Position3D>(tour[0]);
	const [possibleMoves, setPossibleMoves] = useState<Position3D[]>(
		knightMoves3D(currentPos),
	);
	const [visitedPos, setVisitedPos] = useState<Position3D[]>([tour[0]]);

	const onSquareClick = (pos: Position3D) => {
		if (!visitedPos.includes(pos)) {
			setVisitedPos(() => [...visitedPos, pos]);
			setCurrentPos(() => pos);
			setPossibleMoves(() => knightMoves3D(pos));
		}
	};
	return (
		<div className="layout-container">
			{levels.map((level) => (
				<div key={level} className="square-wrapper">
					<ChessBoard
						level={level}
						onSquareClick={onSquareClick}
						tour={tour}
						possibleMoves={possibleMoves}
						currentPos={currentPos}
						visitedPos={visitedPos}
					/>
				</div>
			))}
		</div>
	);
};
