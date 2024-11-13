import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AdminContact()
{ const [contactdata, setcontactdata] = useState([]);
    const navigate=useNavigate();

    async function fetchcontact() {
        try {
            const resp = await axios.get(`${process.env.REACT_APP_APIPREFIX}/api/getcontact`)
            if (resp.status === 200)
                {
                    if (resp.data.statuscode === 1)
                    {
                        setcontactdata(resp.data.contactdata)
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
        fetchcontact();
    },[]
    )

    async function oncondel(id) {
            var userresp=window.confirm("Ae you sure to delete");
            if(userresp===true)
            {
            const resp = await axios.delete(`${process.env.REACT_APP_APIPREFIX}/api/delcon/${id}`)
            if (resp.status === 200)
                {
                    if (resp.data.statuscode === 1)
                    {
                        toast.success("Message Deleted Successfully");
                        fetchcontact();
                    }
                    else if(resp.data.statuscode === 0)
                    {
                        toast.error("Message not Deleted")
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
    return(
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">User Message</li>
                </ol>
            </nav>
            <div className="register">
                <div className="container">
                    {
                        contactdata.length>0?
                        <>
                            <h2>User Message</h2><br/>
                            <table className="timetable_sub"> 
                                <tbody>
                                    <tr>
                                        <th>Name</th>
                                        <th>Phone</th>
                                        <th>Username</th>
                                        <th>Message</th>
                                        <th>Delete</th>
                                    </tr>
                                </tbody>
                            {
                                contactdata.map((item,index)=>
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.username}</td>
                                        <td>{item.msg}</td>
                                        <td><button className="btn btn-danger" onClick={()=>oncondel(item._id)}>Delete</button></td>
                                    </tr>
                                )
                            }

                            </table><br/>
                            {contactdata.length} Messages found
                        
                        </>:<h2>No Messages Found</h2>
                    }

                </div>
            </div>

        </>
    )
}
export default AdminContact