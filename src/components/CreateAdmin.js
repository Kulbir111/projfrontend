import axios from "axios";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
function CreateAdmin() {
    const [name, setname] = useState();
    const [phone, setphone] = useState();
    const [uname, setuname] = useState();
    const [pass, setpass] = useState();
    const [cpass, setcpass] = useState();
    const [terms, setterms] = useState(false);
    const navigate = useNavigate();
    async function onregister(e) {
        e.preventDefault();//it will prevent form from getting submit
            if (pass === cpass) {
                const regdata = { name, phone, uname, pass }
                try {
                    const resp = await axios.post(`${process.env.REACT_APP_APIPREFIX}/api/admin`, regdata)
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
    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                    <Link to="/home">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Create Admin</li>
                </ol>
            </nav>
            <div className="register">
                <div className="container">
                    <h2>Create Admin</h2>
                    <div className="login-form-grids">
                        <h4>profile information</h4><br />
                        <form name="form1" onSubmit={onregister}>
                            <input type="text" name="pname" onChange={(e) => setname(e.target.value)} placeholder="Name..." required=" " /><br />
                            <input type="tel" name="phone" onChange={(e) => setphone(e.target.value)} placeholder="Phone..." required=" " /><br />
                            <h5>Login information</h5><br />
                            <input type="email" name="un" onChange={(e) => setuname(e.target.value)} placeholder="Email Address(Username)" required=" " />
                            <input type="password" name="pass" onChange={(e) => setpass(e.target.value)} placeholder="Password" required=" " />
                            <input type="password" name="cpass" onChange={(e) => setcpass(e.target.value)} placeholder="Password Confirmation" required=" " /><br />
                            <input type="submit" name="btn" value="Add Admin" />
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CreateAdmin