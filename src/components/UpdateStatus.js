import axios from "axios";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { toast } from "react-toastify";


function UpdateStatus()
{
	const [newst,setnewst] = useState();
	const navigate = useNavigate();
    const [params] = useSearchParams();
    const orderid = params.get("oid");

	async function onupdatestatus(e)
	{
		e.preventDefault();
		const updatedata ={newst,orderid}
		try
		{
			const resp =  await axios.put(`${process.env.REACT_APP_APIPREFIX}/api/updatestatus`,updatedata)
			if(resp.status===200)
			{
				if(resp.data.statuscode===0)
				{
					toast.error("Error while updating status")
				}
				else
				{
                    toast.success("Status updated successfully")
                    navigate("/vieworders");
				}
			}
		}	
		catch(err)
		{
			toast.error(err.message);
		}
	}
    return(
        <>
		 <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
					<Link to="/adminhome">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Update Status</li>
                </ol>
            </nav>
        <div className="register">
		<div className="container">
			<h2>Update Status</h2>
		
			<div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
				<form name="form1" onSubmit={onupdatestatus}>
					<select name="Newstatus"className="form-control1" onChange={(e)=>setnewst(e.target.value)}>
                        <option value="">Choose Status</option>
                        <option>Confirmed</option>
                        <option>Shipped</option>
                        <option>In-Transit</option>
                        <option>Out for Delivery</option>
                        <option>Delivered</option>
                        <option>Cancelled</option>
                        <option>Returned</option>
                    </select>
					<input type="submit"name="btn" value="Update"/><br/>
					
				</form>
			</div>
		</div>
	</div>
    </>
    )
}
export default UpdateStatus