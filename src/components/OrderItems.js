import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useNavigate, useSearchParams} from "react-router-dom"
import { toast } from "react-toastify";
function OrderItems() {
    const [orderitems,setorderitems]=useState([]);

    const [params] = useSearchParams();
    const orderid = params.get("oid");
    const navigate=useNavigate()

    async function fetchorderproducts()
    {
        try
        {
            const resp =  await axios.get(`${process.env.REACT_APP_APIPREFIX}/api/getorderproducts?orderno=` + orderid)
            if(resp.status===200)
            {
                if(resp.data.statuscode===1)
                {
                    setorderitems(resp.data.items)
                }
                else
                {
                    setorderitems([]);
                }
            }
            else
            {
                toast.error("Some error occured")
            }
        }
        catch(err)
        {
            toast.error(err.message);
        }
    }
    useEffect(()=>
    {
        fetchorderproducts();
    },[])
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
                    <li className="breadcrumb-item active" aria-current="page">Order Items</li>
                </ol>
            </nav>
            <div className="register">
                <div className="container">
                    {
                        orderitems.length>0?
                        <>
                            <h2>Order Products</h2><br/>
                            <table className="timetable_sub">
                                <tbody>
                                    <tr>
                                        <th>Picture</th>
                                        <th>Name</th>
                                        <th>Rate</th>
                                        <th>Quantity</th>
                                        <th>Total Cost</th>
                                    </tr>
                                </tbody>
                            {
                                orderitems.map((item,index)=>
                                <tr key={index}>
                                    <td><img src={`uploads/${item.picture}`} height='75'/></td>
                                    <td>{item.ProdName}</td>
                                    <td>{item.Rate}</td>
                                    <td>{item.Qty}</td>
                                    <td>{item.TotalCost}</td>
                                </tr>
                                )
                            }
                            </table><br/>
                        </>:<h2>No items found</h2>
                    }
                </div>
            </div>
        </>
    )
}
export default OrderItems