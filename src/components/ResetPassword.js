import axios from "axios";
import { useState } from "react";
import { Link,useSearchParams } from "react-router-dom"
import { toast } from "react-toastify";

function ResetPassword() {
    const [newpass, setnewpass] = useState();
    const [cnpass, setcnpass] = useState();
    const [params] = useSearchParams();
    const id = params.get("code");

    async function onresetpass(e) {
        e.preventDefault();
        const resetdata = { id, newpass}
        try {
            if(newpass===cnpass)
            {
            const resp = await axios.put(`${process.env.REACT_APP_APIPREFIX}/api/resetpass`, resetdata)
            if (resp.status === 200) {
                toast.info(resp.data.msg)
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
    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li><Link to="/home"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">Reset Password</li>
                    </ol>
                </div>
            </div>
            <div className="login">
                <div className="container">
                    <h2>Reset Password</h2>

                    <div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
                        <form name="form1" onSubmit={onresetpass}>
                            <input type="password" placeholder="New Password" required=" " onChange={(e) => setnewpass(e.target.value)} />
                            <input type="password" placeholder="Confirm New Password" required=" " onChange={(e) => setcnpass(e.target.value)} />
                            <input type="submit" name="btn" value="Reset Password" /><br />

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ResetPassword