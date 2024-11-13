import {useEffect, useState } from "react"
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Ordersummary()
{
    const[orderid,setorderid]=useState({});
    const navigate=useNavigate();
    const {isLoggedIN, uinfo } = useSelector((state)=>state.user);
    async function fetchorderid()
    {
        try
        {
            const resp =  await axios.get(`${process.env.REACT_APP_APIPREFIX}/api/getorderid?un=` + uinfo.username)
            if(resp.status===200)
            {
                if(resp.data.statuscode===1)
                {
                    setorderid(resp.data.orderdata);
                }
                else
                {
                   toast.error("Error while fetching details")
                }
            }
            else
            {
                toast.error("Some error occured");
            }
        }
        catch(err)
        {
            alert(err.message);
        }
    }
    function yourorder()
    {
        navigate("/viewuserorders")
    }
    useEffect(()=>
    {
        if(isLoggedIN!==false)
        {
            fetchorderid();
        }
    },[isLoggedIN])
    useEffect(()=>
		{
			if(sessionStorage.getItem("userdata")===null)
			{
				toast.error("Please login to access the page");
				navigate("/login");
			}
		},[])
    return(
        <>
         <div className="login1">
            <div className="container">
                
                 <h2>Thanks For Shopping on our Website </h2>
                 <h4>Your Order Number is :- {orderid._id}</h4>
                 <h4><button className="btn btn-primary1" onClick={yourorder}>Your Orders</button></h4>
    
            </div>
        </div>
        </>
    )
}
export default Ordersummary