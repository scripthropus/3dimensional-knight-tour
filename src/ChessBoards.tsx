import { ChessBoard } from "./ChessBoard.tsx";
import "./chessBoards.css";
import { Levels, levels } from "./knightTour.ts";

export const ChessBoards = () => {
	return (
		<div className=" layout-container">
			{levels.map((level) => (
				<div key={level} className="square-wrapper">
					<div className="number">Level {level}</div>
					<ChessBoard level={level} />
				</div>
			))}
		</div>
	);
};
