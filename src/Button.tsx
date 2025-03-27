import { useState } from "react";
import { makeTour, Position3D, files, ranks, levels } from "./knightTour";
type ButtonProps = {
	setTour: React.Dispatch<React.SetStateAction<Position3D[]>>;
	tour: Position3D[];
};
export const Button = ({ setTour, tour }: ButtonProps) => {
	const [isGenerating, setIsGenerating] = useState(false);
	const [steps, setSteps] = useState(10);
	const [showSolution, setShowSolution] = useState(false);

	const handleGenerateTour = () => {
		const randRank = ranks[Math.floor(Math.random() * ranks.length)];
		const randFile = files[Math.floor(Math.random() * files.length)];
		const randLevel = levels[Math.floor(Math.random() * levels.length)];
		const startPos: Position3D = {
			rank: randRank,
			file: randFile,
			level: randLevel,
		};

		setTour(() => makeTour(steps, startPos));
	};

	const handleStepsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = Number.parseInt(e.target.value);
		if (!isNaN(value) && value > 0) {
			setSteps(value);
		}
	};

	return (
		<div className="buttonsContainer">
			<div>
				<button onClick={handleGenerateTour} disabled={isGenerating}>
					{isGenerating ? "生成中..." : "ナイトツアーの生成"}
				</button>
				<input
					id="number"
					type="number"
					value={steps}
					onChange={handleStepsChange}
					min="2"
					max="32"
				/>
				{tour.length > 0 && (
					<button onClick={() => setShowSolution(!showSolution)}>
						{showSolution ? "解答を隠す" : "解答を表示"}
					</button>
				)}
			</div>
			{tour.length > 0 && showSolution && (
				<div className="tour">
					ツアー:{" "}
					{tour.map((move) => `${move.rank}${move.file}${move.level}` + "->")}
				</div>
			)}
		</div>
	);
};
