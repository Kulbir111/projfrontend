import axios from "axios";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
function Contact() {
    const [name,setname] = useState();
    const [phone,setphone] = useState();
    const [uname,setuname] = useState();
    const [message,setmessage] = useState();
    const [msg,setmsg] = useState();
    const naviagte=useNavigate();
    async function oncontact(e)
    {
        e.preventDefault();//it will prevent form from getting submit
            const contactdata={name,phone,uname,message}
            try
            {
                const resp =  await axios.post(`${process.env.REACT_APP_APIPREFIX}/api/contact`,contactdata)
                {
                    if(resp.status===200)
                        {
                            toast.info(resp.data.msg)
                        }
                    else if(resp.data.statuscode===1)
                        {
                            toast.warn("Feedback not Done")
                        }
                }
            }
            catch(err)
            {
                toast.error(err.message);
            }
        }

    return (
        <>
                <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                    <Link to="/home">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Contact</li>
                </ol>
            </nav>
            <div className="register">
                <div className="container">
                    <h2>Leave A Message</h2>
                    <div className="login-form-grids">
                        <form name="form1" onSubmit={oncontact}>
                            <input type="text" name="pname" onChange={(e)=>setname(e.target.value)} placeholder="Name..." required=" " /><br/>
                            <input type="tel" name="phone" onChange={(e)=>setphone(e.target.value)} placeholder="Phone..." required=" " /><br/>
                            <input type="email" name="un" onChange={(e)=>setuname(e.target.value)} placeholder="Email Address(Username)" required=" " /><br/>
                            <textarea className="form-control1" placeholder="Your Message Here" onChange={(e)=>setmessage(e.target.value)}></textarea>
                            <input type="submit" name="btn" value="Submit"/>
                            {msg}
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Contact