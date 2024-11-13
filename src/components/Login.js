import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch } from "react-redux";
import { login } from "../userSlice";

function Login() {
	const [uname, setuname] = useState();
	const [pass, setpass] = useState();
	const navigate = useNavigate();
	const disptach=useDispatch();
	const [captverif, setcaptverif] = useState(false);
	const [remember, setremember] = useState(false);
	const cookie = new Cookies()

	function captchaChange(value) {
		if (value) {
			setcaptverif(true)
		}
		else {
			setcaptverif(false)
		}
	}

	async function onlogin(e) {
		e.preventDefault();
		if (captverif === true) {
			const logindata = { uname, pass }
			try {
				const resp = await axios.post(`${process.env.REACT_APP_APIPREFIX}/api/login`, logindata)
				if (resp.status === 200) {
					if (resp.data.statuscode === 0) {
						toast.warn("Incorrect Username/Password")
					}
					else if (resp.data.statuscode === 1) {
						if (resp.data.pdata.activated === true) {
							disptach(login(resp.data.pdata))
							sessionStorage.setItem("userdata", JSON.stringify(resp.data.pdata));
							if (remember === true) {
								cookie.set("userinfo", resp.data.pdata, (null, { path: '/', maxAge: 86400 * 15 }));
							}
							if (resp.data.pdata.usertype === "admin") {
								navigate("/adminhome")
							}
							else {
								navigate("/home")
							}
						}
						else {
							toast.error("Your account is not activated. Please check your email and activate your account")
						}

					}
				}
				
			}
			catch (err) {
				toast.error(err.message);
			}
		}
		else {
			toast.error("Please Complete Recaptcha Test")
		}
	}
	return (
		<>
			<nav aria-label="breadcrumb">
				<ol className="breadcrumb">
					<li className="breadcrumb-item">
						<Link to="/home">Home</Link>
					</li>
					<li className="breadcrumb-item active" aria-current="page">Login</li>
				</ol>
			</nav>
			<div className="register">
				<div className="container">
					<h2>Login Form</h2>

					<div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
						<form name="form1" onSubmit={onlogin}>
							<input type="email" name="email" placeholder="Email Address" required=" " onChange={(e) => setuname(e.target.value)} />
							<input type="password" name="pass" placeholder="Password" required=" " onChange={(e) => setpass(e.target.value)} />
							<input type="checkbox" name="cb1" onChange={(e) => setremember(e.target.checked)} /> Remember Me
							<div class="forgot">
								<Link to="/forgotpass">Forgot Password?</Link>
							</div>
							<ReCAPTCHA sitekey="6Ld7L3sqAAAAAN34u_Eg1X1ZwXPGaE2SO8ORN9z1"onChange={captchaChange}/>
							<input type="submit" name="btn" value="Login" /><br />

						</form>
					</div>

				</div>
			</div>
		</>
	)
}
export default Login