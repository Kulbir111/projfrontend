import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../userSlice";

function Changepassword() {
    const [currentpass, setcurrentpass] = useState();
    const [newpass, setnewpass] = useState();
    const disptach=useDispatch();
    const { uinfo } = useSelector((state)=>state.user);
    const [cnpass, setcnpass] = useState();
    const navigate = useNavigate();

    async function onlogin(e) {
        e.preventDefault();
        const uname=uinfo.username;
        const apidata = { currentpass, newpass, uname }
        try {
            if(newpass===cnpass)
            {
            const resp = await axios.put(`${process.env.REACT_APP_APIPREFIX}/api/changepassword`, apidata)
            if (resp.status === 200) {
                if (resp.data.statuscode === 0) {
                    toast.warn("Current Password Incorrect")
                }
                else if (resp.data.statuscode === 1) {
                    toast.success("Password Changed Successfully")
                    disptach(logout());
                    sessionStorage.clear();
                    navigate("/home");
                }
            }
            
        }
        else{
                toast.warn("New Password and Confirm Password Doesn't Match")
            }
    }
        catch (err) {
            toast.error(err.message);
        }
    }
    useEffect(()=>
        {
            if(sessionStorage.getItem("userdata")===null)
            {
                toast.error("Please login to access the page");
               navigate("/login");
            }
        },[])
    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                    <Link to="/home">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Change Password</li>
                </ol>
            </nav>
            <div className="register">
                <div className="container">
                    <h2>Forget Password</h2>

                    <div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
                        <form name="form1" onSubmit={onlogin}>
                            <input type="password" placeholder="current Password" required=" " onChange={(e) => setcurrentpass(e.target.value)} />
                            <input type="password" placeholder="New Password" required=" " onChange={(e) => setnewpass(e.target.value)} />
                            <input type="password" placeholder="Confirm New Password" required=" " onChange={(e) => setcnpass(e.target.value)} />
                            <input type="submit" name="btn" value="Change Password" /><br />

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Changepassword