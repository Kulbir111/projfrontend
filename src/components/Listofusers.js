import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, } from "react-router-dom"
import { toast } from "react-toastify";

function Listofusers() {
    const [membdata, setmembdata] = useState([]);
    const navigate=useNavigate();

    async function fetchusers() {
        try {
            const resp = await axios.get(`${process.env.REACT_APP_APIPREFIX}/api/getusers`)
            if (resp.status === 200)
                {
                    if (resp.data.statuscode === 1)
                    {
                        setmembdata(resp.data.membersdata)
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
    useEffect(()=>
    {
        fetchusers();
    },[]
    )

    async function onmembdel(id) {
            var userresp=window.confirm("Ae you sure to delete");
            if(userresp===true)
            {
            const resp = await axios.delete(`${process.env.REACT_APP_APIPREFIX}/api/deluser/${id}`)
            if (resp.status === 200)
                {
                    if (resp.data.statuscode === 1)
                    {
                        toast.success("User Deleted Successfully");
                        fetchusers();
                    }
                    else if(resp.data.statuscode === 0)
                    {
                        toast.error("User not Deleted")
                    }
                }
            else {
                toast.error("some error occured")
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
                    <li className="breadcrumb-item active" aria-current="page">List of Users</li>
                </ol>
            </nav>
            <div className="register">
                <div className="container">
                    {
                        membdata.length>0?
                        <>
                            <h2>List of Users</h2><br/>
                            <div class="checkout-right">
                            <table className="timetable_sub"> 
                                <tbody>
                                    <tr>
                                        <th>Name</th>
                                        <th>Phone</th>
                                        <th>Username</th>
                                        <th>Delete</th>
                                    </tr>
                                </tbody>
                            {
                                membdata.map((item,index)=>
                                    <tr key={index}>
                                        <td>{item.pname}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.username}</td>
                                        <td><button className="btn btn-danger" onClick={()=>onmembdel(item._id)}>Delete</button></td>
                                    </tr>
                                )
                            }

                            </table></div><br/>
                            {membdata.length} members found
                        
                        </>:<h2>No Users Found</h2>
                    }

                </div>
            </div>

        </>
    )
}
export default Listofusers