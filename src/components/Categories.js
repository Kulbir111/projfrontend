import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Categories() {
    const [catdata, setcatdata] = useState([]);

    async function getcat() {
        try {
            const resp = await axios.get(`${process.env.REACT_APP_APIPREFIX}/api/getcat`)
            if (resp.status === 200) {
                if (resp.data.statuscode === 1) {
                    setcatdata(resp.data.catdata)
                }
                else {
                    setcatdata([]);
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
        getcat();
    }, []
    )
    return (
        <>
            
            <div class="col-lg-9 mt-lg-01 mt-5 right-product-grid">

                <div class="card-group">
                    {
                        catdata.map((item,index)=>
                        <div class="col-lg-3 col-sm-6 p-0" key={index}>
                        <div class="card product-men p-3">
                            <div class="men-thumb-item">
                            <Link to={`/products?cat=${item._id}`}>
                            <img title=" " alt=" " src={`uploads/${item.catpic}`} class="card-img-top1" /></Link>
                                <div class="men-cart-pro">
                                    <div class="inner-men-cart-pro">
                                    <Link to={`/products?cat=${item._id}`} class="link-product-add-cart">Quick View</Link>
                                    </div>
                                </div>
                            </div>

                            <div class="card-body  py-3 px-2">
                            <Link to={`/products?cat=${item._id}`}><h5 class="card-title text-capitalize">{item.catname}</h5></Link>
                            </div>
                        </div>
                    </div>
                        )
                    }
                    
                </div>
            </div>
        </>
    )
}
export default Categories