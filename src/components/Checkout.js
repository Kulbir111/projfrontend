import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import { userContext } from "../App";
import { useSelector } from "react-redux";

function Checkout() {
    const [saddr, setsaddr] = useState();
    const [state, setstate] = useState();
    const [pincode, setpincode] = useState();
    const [hname, sethname] = useState();
    const [ccno, setccno] = useState();
    const [exp, setexp] = useState();
    const [cvv, setcvv] = useState();
    const [flag, setflag] = useState(false);
    const [pmode, setpmode] = useState("");
    const navigate = useNavigate();
    const {uinfo } = useSelector((state)=>state.user);

    async function oncheckout(e) {
        e.preventDefault();
        const cartinfo = JSON.parse(sessionStorage.getItem("cartdata"));
        const carddetails = { hname, ccno, exp, cvv }
        const checkoutdata = { saddr, state, pincode, tbill: sessionStorage.getItem("tbill"), uname: uinfo.username, pmode, carddetails, cartinfo };
        try {
            const resp = await axios.post(`${process.env.REACT_APP_APIPREFIX}/api/checkout`, checkoutdata)
            if (resp.status === 200) {
                if (resp.data.statuscode === 0) {
                    toast.warn("Error while making the payment")
                }
                else if (resp.data.statuscode === 1) {
                    updatestock();
                    updatesubstock();
                    toast.success("Order Placed Successfully")
                }
            }
        }
        catch (err) {
            toast.error(err.message);
        }
    }
    useEffect(() => {
        if (pmode !== "") {
            if (pmode === 'Cash on Delivery') {
                setflag(false)
            }
            else if (pmode === 'Credit Card/Debit Card') {
                setflag(true)
            }
        }
        else {
            setflag(false)
        }
    }, [pmode]
    )
    async function updatestock() {
        const cartinfo = { cartinfo: JSON.parse(sessionStorage.getItem("cartdata")) };
        try {
            const resp = await axios.put(`${process.env.REACT_APP_APIPREFIX}/api/updatestock`, cartinfo)
            if (resp.status === 200) {
                emptycart();
            }
            else {
                toast.error("Some error occured");
            }
        }
        catch (err) {
            toast.error(err.message);
        }
    }
    async function updatesubstock() {
        const cartinfo = { cartinfo: JSON.parse(sessionStorage.getItem("cartdata")) };
        try {
            const resp = await axios.put(`${process.env.REACT_APP_APIPREFIX}/api/updatesubstock`, cartinfo)
            if (resp.status === 200) {
                emptycart();
            }
            else {
                toast.error("Some error occured");
            }
        }
        catch (err) {
            toast.error(err.message);
        }
    }
    async function emptycart() {
        try {
            const resp = await axios.delete(`${process.env.REACT_APP_APIPREFIX}/api/deletecart?un=` + uinfo.username)
            if (resp.status === 200) {
                sessionStorage.removeItem("cartdata");
                navigate("/ordersummary");
                
            }
            else {
                toast.error("Some error occured");
            }
        }
        catch (err) {
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
        },[])
    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                    <Link to="/home">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Checkout</li>
                </ol>
            </nav>
                <div className="address_form1">
                <h3>Billing Address</h3></div>
            <div className="col-md-8 address_form">
                <br /><br />
                <form onSubmit={oncheckout} className="creditly-card-form shopf-sear-headinfo_form">
                    <div className="creditly-wrapper wrapper">
                        <div className="information-wrapper">
                            <div className="first-row form-group">
                                <div className="card_number_grids">
                                    <div className="card_number_grid_left">
                                        <div className="controls">

                                            <textarea type="text" name="sadress" placeholder="Shipping Address"onChange={(e)=>setsaddr(e.target.value)} ></textarea>
                                        </div>
                                    </div><br />
                                    <div className="card_number_grid_right">
                                        <div className="controls">

                                            <input className="form-control" name="state" type="text" placeholder="State" onChange={(e)=>setstate(e.target.value)} />
                                        </div>
                                    </div><br />
                                    <div className="clear"> </div>
                                </div>
                                <div className="controls">

                                    <input className="form-control" name="pincode" type="text" placeholder="Pincode" onChange={(e)=>setpincode(e.target.value)} />
                                </div><br />
                                <div className="controls">

                                    <select className="form-control option-fieldf" onChange={(e) => setpmode(e.target.value)}>
                                        <option value="">Choose Payment Method</option>
                                        <option>Credit Card/Debit Card</option>
                                        <option>Cash on Delivery</option>

                                    </select>
                                </div>
                            </div>
                            {
                                flag ?
                                    <>
                                        <div className="controls">

                                            <input type="text" className="form-control" name="hname" placeholder="Holder Name" onChange={(e) => sethname(e.target.value)} />
                                        </div><br />
                                        <div className="controls">

                                            <input type="text" className="form-control" name="ccno" placeholder=" Card Number" onChange={(e) => setccno(e.target.value)} />
                                        </div><br />
                                        <div className="controls">

                                            <input type="text" className="form-control" name="exp" placeholder="Expiry" onChange={(e) => setexp(e.target.value)} />
                                        </div><br />
                                        <div className="controls">

                                            <input type="text" className="form-control" name="cvv" placeholder="Cvv" onChange={(e) => setcvv(e.target.value)} />
                                        </div><br />


                                    </> : null
                            }
                            <input type="submit" className="btn btn-primary1" value="Make Payment"/>
                        </div>
                    </div>
                </form>
            </div></>
    )
}
export default Checkout