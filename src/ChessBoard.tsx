import { Levels, ranks, files, levels } from "./knightTour";
import "./chessBoard.css";

type ChessBoardProps = {
	level: Levels;
};

export const ChessBoard: React.FC<ChessBoardProps> = ({ level }) => {
	return (
		<div className="chessBoard">
			{ranks.map((rank) =>
				files.map((file, fileIndex) => {
					const isWhite = (rank + fileIndex + levels.indexOf(level)) % 2 === 0;
					const squareId = `${file}${rank}`;

					return (
						<div
							key={squareId}
							className={`square ${isWhite ? "black" : "white"} `}
						>
							{squareId}
						</div>
					);
				}),
			)}
		</div>
	);
};
