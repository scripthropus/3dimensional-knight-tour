import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { ChessBoards } from "./ChessBoards";
import { makeTour, Position3D } from "./knightTour";
import { TourButton } from "./TourButton.tsx";
import "./css/App.css";

function App() {
	const testPos: Position3D = { file: "e", rank: 5, level: "E" };
	const [tour, setTour] = useState<Position3D[]>(makeTour(50, testPos));
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

	return (
		<GoogleOAuthProvider clientId={clientId || ""}>
			<div className="app-container">
				{!isLoggedIn ? (
					<div className="login-container">
						<div className="image-container"></div>

						<div className="login-box">
							<h1>ログインしますか</h1>
							<p>ログインするとツアーの保存ができます</p>
							<GoogleLogin
								onSuccess={(credentialResponse) => {
									console.log(credentialResponse);
									setIsLoggedIn(true);
								}}
								onError={() => {
									console.log("ログインに失敗しました");
								}}
							/>
						</div>
					</div>
				) : (
					<div className="container">
						<div>
							<TourButton setTour={setTour} tour={tour} />
							<ChessBoards tour={tour} />
						</div>
					</div>
				)}
			</div>
		</GoogleOAuthProvider>
	);
}

export default App;
