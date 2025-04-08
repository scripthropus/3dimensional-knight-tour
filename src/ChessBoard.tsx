import { Levels, ranks, files, levels, Position3D } from "./knightTour";

type ChessBoardProps = {
	level: Levels;
	onSquareClick: (pos: Position3D) => void;
	tour: Position3D[];
	possibleMoves: Position3D[];
	currentPos: Position3D;
	visitedPos: Position3D[];
};

export const ChessBoard: React.FC<ChessBoardProps> = ({
	level,
	onSquareClick,
	tour,
	possibleMoves,
	currentPos,
	visitedPos,
}) => {
	const isSamePosition = (a: Position3D, b: Position3D): boolean => {
		return a.file === b.file && a.rank === b.rank && a.level === b.level;
	};

	const matchesAnyPosition = (
		square: Position3D,
		moveArray: Position3D[],
	): boolean => {
		return moveArray.some(
			(move) =>
				move.file === square.file &&
				move.rank === square.rank &&
				move.level === square.level,
		);
	};

	const isValidAndPossibleMove = (thisSquare: Position3D): boolean => {
		return (
			matchesAnyPosition(thisSquare, tour) &&
			matchesAnyPosition(thisSquare, possibleMoves) &&
			!matchesAnyPosition(thisSquare, visitedPos)
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
								if (isValidAndPossibleMove(thisSquare)) {
									onSquareClick(thisSquare);
								}
							}}
							className={`square ${isWhite ? "black" : "white"} ${isSamePosition(thisSquare, currentPos) ? "selectedSquare" : ""} ${matchesAnyPosition(thisSquare, tour) ? "" : "vacant"} ${isValidAndPossibleMove(thisSquare) ? "possibleMove" : ""} ${matchesAnyPosition(thisSquare, visitedPos) && !isSamePosition(thisSquare, currentPos) ? "visitedSquare" : ""}`}
						>
							{squareId}
						</div>
					);
				}),
			)}
		</div>
	);
};
