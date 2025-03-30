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
				<h1>ログインしますか</h1>
				<p>ログインするとツアーの保存ができます</p>
				<GoogleLogin
					onSuccess={onLoginSuccess}
					onError={() => {
						console.log("ログインに失敗しました");
					}}
				/>
			</div>
		</div>
	);
};
