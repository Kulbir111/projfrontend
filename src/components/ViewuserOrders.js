import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, } from "react-router-dom"
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function ViewuserOrders() {
    const [orderdata, setorderdata] = useState([]);
    const navigate=useNavigate();
    const { isLoggedIN, uinfo } = useSelector((state)=>state.user);

    async function fetchorder() {
        try {
            const resp = await axios.get(`${process.env.REACT_APP_APIPREFIX}/api/getuserorders?un=` + uinfo.username)
            if (resp.status === 200) {
                if (resp.data.statuscode === 1) {
                    setorderdata(resp.data.orderdata)
                }
                else{
                    setorderdata([]);
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
        if(isLoggedIN!==false)
        {
            fetchorder();
        }
        
    }, [isLoggedIN]
    )
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
                    <li className="breadcrumb-item active" aria-current="page">Your Orders</li>
                </ol>
            </nav>
            <div className="register">
                <div className="container">
                    {
                        orderdata.length>0?
                        <>
                            <h2>Your Orders</h2><br/>
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
export default ViewuserOrders