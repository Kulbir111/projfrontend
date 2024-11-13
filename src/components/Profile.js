import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../userSlice";

function Profile() {
    const [pname, setpname] = useState();
    const [phone, setphone] = useState();
    const navigate = useNavigate();
    const disptach=useDispatch();
    const { uinfo } = useSelector((state)=>state.user);

    async function onupdate(e) {
        e.preventDefault();
        const uname=uinfo.username;
        const apidata = { pname, phone, uname }
        try {
            const resp = await axios.put(`${process.env.REACT_APP_APIPREFIX}/api/profile`, apidata)
            if (resp.status === 200) {
                if (resp.data.statuscode === 0) {
                    toast.warn("Profile not Updated")
                }
                else if (resp.data.statuscode === 1) {
                    toast.success("Profile Updated Successfully")
                    disptach(logout());
                    sessionStorage.clear();
                    navigate("/home");
                }   
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
                    <li className="breadcrumb-item active" aria-current="page">Profile Update</li>
                </ol>
            </nav>
            <div className="register">
                <div className="container">
                    <h2>Profile Update</h2>

                    <div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
                        <form name="form1" onSubmit={onupdate}>
                             <input type="text" name="name" minLength={3} placeholder="Update Name" required=" " onChange={(e) => setpname(e.target.value)} /><div className="login2">{uinfo.pname}</div><br />
                           <input type="tel" name="phone" placeholder="Update Phone" minLength={10} maxLength={10} required=" " onChange={(e) => setphone(e.target.value)} /><div className="login2">{uinfo.phone}</div >
                            <input type="submit" name="btn" value="Update" /><br />

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Profile