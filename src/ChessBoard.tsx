import { Levels, ranks, files, levels, Position3D } from "./knightTour";
import "./chessBoard.css";

type ChessBoardProps = {
	level: Levels;
	onSquareClick: (pos: Position3D) => void;
	validMoves: Position3D[];
};

export const ChessBoard: React.FC<ChessBoardProps> = ({
	level,
	onSquareClick,
	validMoves,
}) => {
	const isValidMove = (thisSquare: Position3D) => {
		return validMoves.some(
			(move) =>
				move.file === thisSquare.file &&
				move.rank === thisSquare.rank &&
				move.level === thisSquare.level,
		);
	};
	return (
		<div className="chessBoard">
			{ranks.map((rank) =>
				files.map((file, fileIndex) => {
					const isWhite = (rank + fileIndex + levels.indexOf(level)) % 2 === 0;
					const squareId = `${file}${rank}`;
					const thisSquare: Position3D = {
						file: file,
						rank: rank,
						level: level,
					};

					return (
						<div
							key={squareId}
							onClick={() => {
								if (isValidMove(thisSquare)) {
									onSquareClick(thisSquare);
								}
							}}
							className={`square ${isWhite ? "black" : "white"} ${isValidMove(thisSquare) ? "" : "vacant"}`}
						>
							{squareId}
						</div>
					);
				}),
			)}
		</div>
	);
};
