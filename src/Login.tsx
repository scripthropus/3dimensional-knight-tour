import { GoogleLogin } from "@react-oauth/google";
import "./css/login.css";

interface LoginProps {
	onLoginSuccess: (credentialResponse: any) => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
	return (
		<div className="login-container">
			<div className="image-container"></div>
			<div className="login-box">
				<GoogleLogin
					onSuccess={onLoginSuccess}
					onError={() => {
						alert("ログインに失敗しました");
					}}
				/>
			</div>
		</div>
	);
};
