import { useState } from "react";
import { makeTour, Position3D, files, ranks, levels } from "./knightTour";
import { ToggleButton, Button } from "@mui/material";
import "./css/button.css";

type TourButtonProps = {
	setTour: React.Dispatch<React.SetStateAction<Position3D[]>>;
	tour: Position3D[];
};

export const TourButton = ({ setTour, tour }: TourButtonProps) => {
	const [isGenerating, setIsGenerating] = useState(false);
	const [steps, setSteps] = useState(100);
	const [showSolution, setShowSolution] = useState(false);

	const handleGenerateTour = async () => {
		const randRank = ranks[Math.floor(Math.random() * ranks.length)];
		const randFile = files[Math.floor(Math.random() * files.length)];
		const randLevel = levels[Math.floor(Math.random() * levels.length)];
		const startPos: Position3D = {
			rank: randRank,
			file: randFile,
			level: randLevel,
		};
		if (steps < 1 || steps > 384) return;
		const newTour = await makeTour(steps, startPos);
		setTour(() => newTour);
	};

	const handleStepsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = Number.parseInt(e.target.value);
		setSteps(value);
	};

	return (
		<div className="buttonsContainer">
			<div className="buttons-row">
				<Button
					variant="contained"
					onClick={handleGenerateTour}
					disabled={isGenerating}
				>
					{isGenerating ? "生成中..." : "ナイトツアーの生成"}
				</Button>
				<input
					id="number"
					type="number"
					value={steps}
					onChange={handleStepsChange}
					max="384"
				/>

				{tour.length > 0 && (
					<ToggleButton
						value="check"
						color="primary"
						selected={showSolution}
						onChange={() => setShowSolution((prevSelected) => !prevSelected)}
					>
						{showSolution ? "解答の非表示" : "解答の表示"}
					</ToggleButton>
				)}
			</div>

			{tour.length > 0 && showSolution && (
				<div className="tour-container">
					<div className="tour">
						{tour.map(
							(move, idx) =>
								`${move.rank}${move.file}${move.level}${idx === tour.length - 1 ? "" : "->"}`,
						)}
					</div>
				</div>
			)}
		</div>
	);
};
