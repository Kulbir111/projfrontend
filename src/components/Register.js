import axios from "axios";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
function Register() {
    const [name, setname] = useState();
    const [phone, setphone] = useState();
    const [uname, setuname] = useState();
    const [pass, setpass] = useState();
    const [cpass, setcpass] = useState();
    const [verrors, setverrors] = useState({});
    const [terms, setterms] = useState(false);
    const navigate = useNavigate();

    const validateForm = () => {
        const Errors = {};

        if (!name || name.length < 3) {
            Errors.name = 'Name must be at least 3 Characters long';
        }

        if (!phone || !/^\d{10}$/.test(phone)) {
            Errors.phone = 'Phone must be a 10-digit number';
        }

        if (!uname || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(uname)) {
            Errors.email = 'Invalid email format';
        }

        if (!pass || !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}/.test(pass)) {
            Errors.password = 'Password must contain at least 1 uppercase,1 number,1 special character,and be at least 6 charcters long';
        }

        if (!cpass || pass !== cpass) {
            Errors.confirmPassword = 'Password do not match';
        }

        setverrors(Errors)

        return Object.keys(Errors).length !== 0 ? false : true;
    };

    async function onregister(e) {
        e.preventDefault();//it will prevent form from getting submit
        if (validateForm() === true) {
            if (terms === true) {
                if (pass === cpass) {
                    const regdata = { name, phone, uname, pass }
                    try {
                        const resp = await axios.post(`${process.env.REACT_APP_APIPREFIX}/api/signup`, regdata)
                        if (resp.status === 200) {
                            toast.success(resp.data.msg)
                            toast.success("Now Login")
                            navigate("/login")

                        }
                        else {
                            toast.error(resp.data.msg)
                        }
                    }
                    catch (err) {
                        toast.error(err.message);
                    }
                }
                else {
                    toast.error("Password and confirm password doesn't match")
                }
            }
            else {
                toast.error("Please accept terms & conditions")
            }
        }

    }
    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/home">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Register</li>
                </ol>
            </nav>
            <div className="register">
                <div className="container">
                    <h2>Register Here</h2>
                    <div className="login-form-grids">
                        <h4>profile information</h4><br />
                        <form name="form1" onSubmit={onregister}>
                            <input type="text" name="pname" onChange={(e) => setname(e.target.value)} placeholder="Name..." /><br />
                            {verrors.name?<span>{verrors.name}</span>:null}
                            <input type="tel" name="phone" onChange={(e) => setphone(e.target.value)} placeholder="Phone..." /><br />
                            {verrors.phone?<span>{verrors.phone}</span>:null}
                            <h5>Login information</h5><br />
                            <input type="email" name="un" onChange={(e) => setuname(e.target.value)} placeholder="Email Address(Username)" />
                            {verrors.email?<span>{verrors.email}</span>:null}
                            <input type="password" name="pass" onChange={(e) => setpass(e.target.value)} placeholder="Password"/>
                            {verrors.password?<span>{verrors.password}</span>:null}
                            <input type="password" name="cpass" onChange={(e) => setcpass(e.target.value)} placeholder="Password Confirmation"/><br />
                            {verrors.confirmPassword?<span>{verrors.confirmPassword}</span>:null}
                            <div className="register-check-box">
                                <div className="check">
                                    <label className="checkbox">
                                        <input type="checkbox" name="cbx1" onChange={(e) => setterms(e.target.checked)} /><i> </i>I accept the terms and conditions</label>
                                </div>
                            </div>
                            <input type="submit" name="btn" value="Register" />
                        </form>
                    </div>
                    <div className="register-home">
                        <Link to="/">Home</Link>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Register