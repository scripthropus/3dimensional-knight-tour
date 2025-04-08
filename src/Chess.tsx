import { makeTour, Position3D } from "./knightTour";
import { ChessBoards } from "./ChessBoards";
import { TourButton } from "./TourButton";
import { useState } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

import "./css/chess.css";
import "./css/layout.css";

const testPos: Position3D = { file: "e", rank: 5, level: "E" };
const testTour = await makeTour(50, testPos);

export const Chess = () => {
	const [tour, setTour] = useState<Position3D[]>(testTour);

	return (
		<div className="container">
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						setting
					</Typography>
					<Button color="inherit">Login</Button>
				</Toolbar>
			</AppBar>
			<TourButton setTour={setTour} tour={tour} />
			<ChessBoards tour={tour} />
		</div>
	);
};
