import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AdminHome()
{
    const navigate=useNavigate()
     useEffect(()=>
		{
			if(sessionStorage.getItem("userdata")===null)
			{
				toast.error("Please login to access the page");
				navigate("/login");
			}
			else
			{   
				var uinfo =JSON.parse(sessionStorage.getItem("userdata"));
				if(uinfo.usertype!=="admin")
				{
					toast.error("Admin login to access the page");
					navigate("/login");
				}
			}
		},[])
    return(
        <>
         <div className="register">
            <div className="container">
                 <h2>Welcome Admin</h2>
            </div>
        </div>
        </>
    )
}
export default AdminHome