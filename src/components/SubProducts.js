import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

function SubProducts() {
    const [params] = useSearchParams();
    const catid = params.get("cat");
    const [prodsdata, setprodsdata] = useState([]);
    const [catdata, setcatdata] = useState([]);

    useEffect(()=>
        {
            if(catid!=="")
            {
                fetchprodsbycat();
            }
            
        },[catid]
        )
    
        async function fetchprodsbycat() {
            try {
                const resp = await axios.get(`${process.env.REACT_APP_APIPREFIX}/api/fetchsubprodsbysubcatid?cid=${catid}`)
                if (resp.status === 200)
                    {
                        if (resp.data.statuscode === 1)
                        {
                            setprodsdata(resp.data.prodsubdata)
                        }
                        else{
                            setprodsdata([]);
                            toast.info("No Products Added")
                        }
                    }
                else {
                    toast.warn("some error occured")
                }
            }
            catch (err) {
                toast.warn(err.message);
            }
        }
        async function getcat() {
            try {
                const resp = await axios.get(`${process.env.REACT_APP_APIPREFIX}/api/getsubcatname?un=${catid}`)
                if (resp.status === 200)
                    {
                        if (resp.data.statuscode === 1)
                        {
                            setcatdata(resp.data.catsubdata)
                        }
                    }
                else {
                    toast.warn("some error occured")
                }
            }
            catch (err) {
                toast.warn(err.message);
            }
        }
        useEffect(()=>
        {
            if(catid!=="")
            {
                getcat();
            }
            
        },[catid]
        )
    return (
        <>
            <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                <Link to="/home">Home</Link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">Products</li>
                </ol>
            </nav>
            <div className="register">
                {
                    catdata.map((item,index)=>
                    
                    <h2 key={index}>{item.subcatname}</h2>
                )
                }
                </div>
            <div className="col-lg-9 mt-lg-01 mt-5 right-product-grid">

                <div className="card-group">
                    {
                        prodsdata.length > 0 ?
                            prodsdata.map((item, index) =>
                                <div className="col-lg-3 col-sm-6 p-0" key={index}>
                                    <div className="card product-men p-3">
                                        <div className="men-thumb-item">
                                            <Link to={`/subdetails?pid=${item._id}`}>
                                                <img src={`uploads/${item.picture}`} alt="img" className="card-img-top1" /></Link>
                                            <div className="men-cart-pro">
                                                <div className="inner-men-cart-pro">
                                                    <Link to={`/subdetails?pid=${item._id}`} className="link-product-add-cart">Quick View</Link>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card-body  py-3 px-2">
                                            <h5 className="card-title text-capitalize">{item.pname}</h5>
                                            <div className="card-text d-flex justify-content-between">
                                                <div className="stars">
                                                    <i className="fa fa-star blue-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star blue-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star blue-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star blue-star" aria-hidden="true"></i>
                                                    <i className="fa fa-star gray-star" aria-hidden="true"></i>
                                                </div>
                                            </div>
                                            <div className="price">
                                                <b>₹{item.Rate}</b>
                                                <Link to={`/subdetails?pid=${item._id}`}><span id="cart"><i className="fas fa-shopping-bag"></i></span></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : <h2>No products found</h2>
                    }

                </div>
            </div>
        </>
    )
}
export default SubProducts