import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate,} from "react-router-dom"
import { toast } from "react-toastify";

function Searchuser()
{
	const [uname,setuname] = useState();
    const [flag,setflag] = useState(false);
    const [udata,setudata] = useState();
	const navigate=useNavigate();

	async function onsearchuser(e)
	{
		e.preventDefault();
		try
		{
			const resp =  await axios.get(`${process.env.REACT_APP_APIPREFIX}/api/searchuser?un=${uname}`)
			if(resp.status===200)
			{
				if(resp.data.statuscode===0)
				{
					toast.warn("Incorrect Username");
                    setflag(false)
				}
				else if(resp.data.statuscode===1)
				{
					setflag(true)
					setudata(resp.data.searchdata[0])
				}
			}
			else
			{
				toast.error("some error occured")
			}
		}	
		catch(err)
		{
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
		 <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
					<Link to="/adminhome">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Search User</li>
                </ol>
            </nav>
        <div className="login1">
		<div className="container">
			<h2>Search User</h2>
		
			<div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
				<form name="form1" onSubmit={onsearchuser}>
					<input type="email"name="email" placeholder="Email Address" required=" " onChange={(e)=>setuname(e.target.value)} />
					<input type="submit"name="btn" value="Search"/><br/>
					{
						flag?
						<>
							<b>Name:-</b>{udata.pname}<br/>
							<b>Phone:-</b>{udata.phone}<br/>
						</>:null
					}
				</form>
			</div>
		</div>
	</div>
    </>
    )
}
export default Searchuser