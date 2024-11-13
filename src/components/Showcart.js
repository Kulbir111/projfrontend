import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, } from "react-router-dom"
import { toast } from "react-toastify";

function Showcart() {
    const [cartdata, setcartdata] = useState([]);
    const [billamt, setbillamt] = useState();
    const { isLoggedIN, uinfo } = useSelector((state)=>state.user);
    const navigate = useNavigate();

    async function fetchcart() {
        try {
            const resp = await axios.get(`${process.env.REACT_APP_APIPREFIX}/api/getcart?un=${uinfo.username}`)
            if (resp.status === 200) {
                if (resp.data.statuscode === 1) {
                    setcartdata(resp.data.cartinfo)
                    sessionStorage.setItem("cartdata", JSON.stringify(resp.data.cartinfo));
                }
                else if (resp.data.statuscode === 0) {
                    setcartdata([]);
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
        if (isLoggedIN !== false) { fetchcart(); }

    }, [isLoggedIN]
    )
    useEffect(() => {
        var gtotal = 0;
        for (var x = 0; x < cartdata.length; x++) {
            gtotal = gtotal + cartdata[x].TotalCost
        }

        setbillamt(gtotal);
    }, [cartdata]
    )

    async function oncartdel(id) {
        var userresp = window.confirm("Ae you sure to delete");
        if (userresp === true) {
            const resp = await axios.delete(`${process.env.REACT_APP_APIPREFIX}/api/delcart/${id}`)
            if (resp.status === 200) {
                if (resp.data.statuscode === 1) {
                    toast.success("item Remove From Cart ");
                    fetchcart();
                }
                else if (resp.data.statuscode === 0) {
                    toast.error("item Doesn't Remove From Cart ")
                }
            }
            else {
                toast.error("some error occured")
            }
        }
    }
    function oncheckout() {
        sessionStorage.setItem("tbill", billamt)
        navigate("/checkout");
    }
    useEffect(() => {
        if (sessionStorage.getItem("userdata") === null) {
            toast.error("Please login to access the page");
            navigate("/login");
        }
    }, [])
    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                    <Link to="/home">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Your Cart</li>
                </ol>
            </nav>
            <section className="checkout_wthree py-sm-5 py-3">
                <div className="container">
                    <div className="check_w3ls">
                        <div className="d-sm-flex justify-content-between mb-4">
                            <h4>Review your Order
                            </h4>
                        </div>
                        <div className="checkout-right">
                            {
                                cartdata.length > 0 ?
                                    <>
                                        <table className="timetable_sub">
                                            <thead>
                                                <tr>
                                                    <th>Picture</th>
                                                    <th>Product Name</th>
                                                    <th>Rate</th>
                                                    <th>Quantity</th>
                                                    <th>Total Cost</th>
                                                    <th>Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    cartdata.map((item, index) =>
                                                        <tr key={index}>
                                                            <td><img src={`uploads/${item.picture}`} height="75" /></td>
                                                            <td>{item.ProdName}</td>
                                                            <td>{item.Rate}</td>
                                                            <td>{item.Qty}</td>
                                                            <td>{item.TotalCost}</td>
                                                            <td><button className="btn btn-danger" onClick={() => oncartdel(item._id)}>Delete</button></td>
                                                        </tr>
                                                    )
                                                }
                                            </tbody>
                                        </table><br />
                                        <h4 className="mt-sm-0 mt-3">Your shopping cart contains:
                                            <span> {cartdata.length} Products</span>
                                        </h4><br />
                                        <b>₹ {billamt} is your Total Bill</b><br /><br />
                                        <button name="btn" className="btn btn-primary" onClick={oncheckout}>Checkout</button>

                                    </> : <h2>No Item(s) Found in your Cart</h2>}
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}
export default Showcart