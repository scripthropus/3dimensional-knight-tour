import { GoogleOAuthProvider } from "@react-oauth/google";
import { useState } from "react";
import { Login } from "./Login";
import { Chess } from "./Chess";
import "./css/App.css";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

	const handleLoginSuccess = (credentialResponse: any) => {
		console.log(credentialResponse);
		setIsLoggedIn(true);
	};

	return (
		<GoogleOAuthProvider clientId={clientId || ""}>
			<div className="app-container">
				{!isLoggedIn ? (
					<Login onLoginSuccess={handleLoginSuccess} />
				) : (
					<Chess />
				)}
			</div>
		</GoogleOAuthProvider>
	);
}

export default App;
