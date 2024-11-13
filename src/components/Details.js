import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function Details() {
    const [params] = useSearchParams();
    const prodid = params.get("pid");
    const [prodsdata, setprodsdata] = useState({});
    const [remcost, setremcost] = useState();
    const [stock, setstock] = useState();
    const [qty, setqty] = useState();
    const [tc, settc] = useState();
    const { uinfo } = useSelector((state)=>state.user);
    const navigate = useNavigate();
    useEffect(() => {
        fetchproddetails();
    }, [prodid])
    useEffect(() => {
        setremcost(prodsdata.Rate - prodsdata.Discount)
        var stock2 = [];
        if (prodsdata.Stock >= 10) {
            for (var x = 1; x <= 10; x++) {
                stock2.push(x)
            }
        }
        else {
            for (var x = 1; x <= prodsdata.Stock; x++) {
                stock2.push(x)
            }
        } setstock(stock2)
    }, [prodsdata])
    useEffect(() => {
        settc(remcost * qty)
    }, [qty]
    )

    async function fetchproddetails() {
        try {
            const resp = await axios.get(`${process.env.REACT_APP_APIPREFIX}/api/getproddetails?pid=${prodid}`)
            if (resp.status === 200) {
                if (resp.data.statuscode === 1) {
                    setprodsdata(resp.data.proddata)
                }
                else {
                    setprodsdata([]);
                }
            }
            else {
                toast.error("Some error occured")
            }
        }
        catch (err) {
            toast.error(err.message);
        }
    }
    async function addtocart() {
        if (uinfo === null) {
            toast.info("Please login to add to cart");
            navigate("/login");
        }
        else {
            const cartdata = { pid: prodid, picture: prodsdata.picture, pname: prodsdata.pname, rate: remcost, qty: qty, tc: tc, username: uinfo.username }
            try {
                const resp = await axios.post(`${process.env.REACT_APP_APIPREFIX}/api/savetocart`, cartdata)
                if (resp.status === 200) {
                    if (resp.data.statuscode === 0) {
                        toast.warning("Problem while adding to cart, try again");
                    }
                    else if (resp.data.statuscode === 1) {
                        toast.success("Add to Cart Successfully")
                        navigate("/showcart");
                    }
                }
            }
            catch (err) {
                toast.error(err.message);
            }
        }
    }

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                    <Link to="/home">Home</Link>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">Product Details</li>
                </ol>
            </nav>

            <div class="innerf-pages section py-5">
                <div class="container">
                    <div class="row my-sm-5">
                        <div class="col-lg-4 single-right-left">
                            <div class="grid images_3_of_2">
                                <div class="flexslider1">
                                    <ul class="slides">

                                        <div class="thumb-image">
                                            <img id="example" src={`uploads/${prodsdata.picture}`} alt=" " className="card-img-top2" /> </div>

                                    </ul>
                                    <div class="clearfix"></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-8 mt-lg-0 mt-5 single-right-left simpleCart_shelfItem">
                            <h3>{prodsdata.pname}</h3>

                            <div class="caption">

                                <ul class="rating-single">
                                    <li>
                                        <a href="#">
                                            <span class="fa fa-star blue-star" aria-hidden="true"></span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <span class="fa fa-star blue-star" aria-hidden="true"></span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <span class="fa fa-star blue-star" aria-hidden="true"></span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <span class="fa fa-star blue-star" aria-hidden="true"></span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <span class="fa fa-star gray-star" aria-hidden="true"></span>
                                        </a>
                                    </li>
                                </ul>
                                <div class="clearfix"> </div>
                                <h6>
                                    ₹{remcost} <strike>₹{prodsdata.Rate} </strike></h6>
                            </div>
                            <div class="desc_single">
                                <h5>Description</h5>
                                <p dangerouslySetInnerHTML={{ __html: prodsdata.Description }}/>
                            </div>
                            <div class="d-sm-flex justify-content-between">
                                <div class="color-quality mt-sm-0 mt-4">
                                    <h5 class="sp_title mb-3">services</h5>
                                    <ul class="single_serv">
                                        <li>
                                            <a href="#">30 Day Return Policy</a>
                                        </li>
                                        <li class="mt-2">
                                            <a href="#">Cash on Delivery available</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {
                                prodsdata.Stock>0?
                                <div class="description">
                                <select name="qty"  onChange={(e) => setqty(e.target.value)}>
                                    <option value="">Choose Quantity</option>
                                    {
                                        stock.map((item, index) =>
                                            <option key={index}>{item}</option>
                                        )
                                    }

                                </select><br/><br/>
                                <input type="button" name="submit" value="Add to cart" className="btn btn-primary" onClick={addtocart} />
                            </div>:<h2>Out Of Stock</h2>
                            }
                           
                        </div>
                    </div>
                </div>
            </div>
           
        </>
    )
}
export default Details