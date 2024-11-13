import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, } from "react-router-dom"
import { toast } from "react-toastify";

function ViewOrders() {
    const [orderdata, setorderdata] = useState([]);
    const navigate=useNavigate();

    async function fetchorder() {
        try {
            const resp = await axios.get(`${process.env.REACT_APP_APIPREFIX}/api/getallorders`)
            if (resp.status === 200) {
                if (resp.data.statuscode === 1) {
                    setorderdata(resp.data.orderdata)
                }
            }
            else {
                toast.error("some error occured")
            }
        }
        catch (err) {
            toast.error(err.message);
        }
    }
    useEffect(() => {
        fetchorder();
    }, []
    )
    function updatestatus(id)
    {
        navigate("/updatestatus?oid="+id)
    }
    async function onorderdel(id) {
        var userresp=window.confirm("Ae you sure to delete");
        if(userresp===true)
        {
        const resp = await axios.delete(`${process.env.REACT_APP_APIPREFIX}/api/delorder/${id}`)
        if (resp.status === 200)
            {
                if (resp.data.statuscode === 1)
                {
                    toast.success("Order Remove Successfully");
                    fetchorder();
                }
                else if(resp.data.statuscode === 0)
                {
                    toast.warn("Order not Remove")
                }
            }
        else {
            alert("some error occured")
        }
    }}
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
    return (
        <>
           <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                    <Link to="/adminhome">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">View Orders</li>
                </ol>
            </nav>
            <div className="register">
                <div className="container">
                    {
                        orderdata.length>0?
                        <>
                            <h2>List Of Orders</h2><br/>
                            <table className="timetable_sub"> 
                                <tbody>
                                <tr>
                                        <th>Order ID</th>
                                        <th>Shipping Address</th>
                                        <th>State</th>
                                        <th>Bill Amount</th>
                                        <th>Username</th>
                                        <th>Pay Mode</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Update</th>
                                        <th>Delete</th>
                                    </tr>
                                </tbody>
                            {
                                orderdata.map((item,index)=>
                                    <tr key={index}>
                                        <td><Link to={`/orderitems?oid=${item._id}`}>{item._id}</Link></td>
                                        <td>{item.saddr}</td>
                                        <td>{item.state}</td>
                                        <td>{item.billamt}</td>
                                        <td>{item.uname}</td>
                                        <td>{item.pmode}</td>
                                        <td>{item.OrderDate}</td>
                                        <td>{item.status}</td>
                                        <td><button className="btn btn-primary" onClick={()=>updatestatus(item._id)}>Update</button></td>
                                        <td><button className="btn btn-danger" onClick={() => onorderdel(item._id)}>Delete</button></td>
                                    </tr>
                                )
                            }

                            </table><br/>
                            {orderdata.length} Orders found
                        
                        </>:<h2>No Orders Found</h2>
                    }   

                </div>
            </div>

        </>
    )
}
export default ViewOrders