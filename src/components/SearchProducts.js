import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

function SearchProducts() {
    const [params] = useSearchParams();
    const sterm = params.get("s");
    const [proddata, setproddata] = useState([]);
    const [prodsdata, setprodsdata] = useState([]);

    async function searchprods() {
        try {
            const resp = await axios.get(`${process.env.REACT_APP_APIPREFIX}/api/searchproducts?q=${sterm}`)
            if (resp.status === 200) {
                if (resp.data.statuscode === 1) {
                    setproddata(resp.data.proddata)
                }
                else {
                    setproddata([]);
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
    async function searchsubprods() {
        try {
            const resp = await axios.get(`${process.env.REACT_APP_APIPREFIX}/api/searchsubproducts?p=${sterm}`)
            if (resp.status === 200) {
                if (resp.data.statuscode === 1) {
                    setprodsdata(resp.data.prodsubdata)
                }
                else {
                    setprodsdata([]);
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
    useEffect(() => {
        if (sterm !== "") {
            searchprods();
        }

    }, [sterm]
    )
    useEffect(() => {
        if (sterm !== "") {
            searchsubprods();
        }

    }, [sterm]
    )
    return (
        <>
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
                                        </div>
                                    </div>
                                </div>
                            ) : null
                    }

                </div>
            </div>
            <div className="col-lg-9 mt-lg-01 mt-5 right-product-grid">

                <div className="card-group">
                    {
                        proddata.length > 0 ?
                            proddata.map((item, index) =>
                                <div className="col-lg-3 col-sm-6 p-0" key={index}>
                                    <div className="card product-men p-3">
                                        <div className="men-thumb-item">
                                            <Link to={`/details?pid=${item._id}`}>
                                                <img src={`uploads/${item.picture}`} alt="img" className="card-img-top1" /></Link>
                                            <div className="men-cart-pro">
                                                <div className="inner-men-cart-pro">
                                                    <Link to={`/details?pid=${item._id}`} className="link-product-add-cart">Quick View</Link>
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
                                        </div>
                                    </div>
                                </div>
                            ) : null
                    }

                </div>
            </div>
        </>
    )
}
export default SearchProducts