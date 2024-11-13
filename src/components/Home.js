import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { toast } from 'react-toastify';
function Home() {
    const [prodsdata, setprodsdata] = useState([]);
    const [proddata, setproddata] = useState([]);

    const divStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundSize: 'cover',
        height: '500px'
    }
    const fadeImages = [
        {
            url: "images/b1.avif",
        },
        {
            url: "images/b2.jpg",
        }
    ];
    const testimonials = [
        {
            id: 1,
            name: "Alice Johnson",
            feedback: "Great products and excellent customer service!",
            rating: 5,
            image: "images/alice.jpg"
        },
        {
            id: 2,
            name: "Bob Smith",
            feedback: "Fast delivery and the product quality exceeded my expectations.",
            rating: 4,
            image: "images/bob.jpg"
        },
        {
            id: 3,
            name: "Clara Lee",
            feedback: "Affordable prices and a wide selection of items.",
            rating: 5,
            image: "images/clara.jpg"
        }
    ];




    async function fetchlatestnprods() {
        try {
            const resp = await axios.get(`${process.env.REACT_APP_APIPREFIX}/api/fetchallprods`)
            if (resp.status === 200) {
                if (resp.data.statuscode === 1) {
                    setprodsdata(resp.data.proddata)
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
    async function fetchlatestprods() {
        try {
            const resp = await axios.get(`${process.env.REACT_APP_APIPREFIX}/api/fetchallsubprods`)
            if (resp.status === 200) {
                if (resp.data.statuscode === 1) {
                    setproddata(resp.data.prodsubdata)
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
    useEffect(() => {

        fetchlatestprods();

    }, []
    )
    useEffect(() => {

        fetchlatestnprods();

    }, []
    )

    return (
        <>
            <div className="slide-container">
                <Fade>
                    {fadeImages.map((fadeImage, index) => (
                        <div key={index}>
                            <div style={{ ...divStyle, 'backgroundImage': `url(${fadeImage.url})` }}>
                            </div>
                        </div>
                    ))}
                </Fade>
            </div>
            <div className="register">
                <h2>Latest Products</h2></div>
            <div className="col-lg-9 mt-lg-01 mt-5 right-product-grid">

                <div className="card-group">
                    {
                        proddata.length > 0 ?
                            proddata.map((item, index) =>
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
            <div class="agileits-services" id="services">
                <div class="no-gutters agileits-services-row row">
                    <div class="col-lg-3 col-sm-6 agileits-services-grids p-sm-5 p-3">
                        <span class="fas fa-sync-alt p-4"></span>
                        <h4 class="mt-2 mb-3">30 days replacement</h4>
                    </div>
                    <div class="col-lg-3 col-sm-6 agileits-services-grids p-sm-5 p-3">
                        <span class="fas fa-gift p-4"></span>
                        <h4 class="mt-2 mb-3">Gift Card</h4>
                    </div>

                    <div class="col-lg-3 col-sm-6 agileits-services-grids p-sm-5 p-3">
                        <span class="fas fa-lock p-4"></span>
                        <h4 class="mt-2 mb-3">secure payments</h4>
                    </div>
                    <div class="col-lg-3 col-sm-6 agileits-services-grids p-sm-5 p-3">
                        <span class="fas fa-shipping-fast p-4"></span>
                        <h4 class="mt-2 mb-3">free shipping</h4>
                    </div>
                </div>
            </div><br />
            <div class="row no-gutters pb-5">
                <div class="col-sm-4">
                    <div class="hovereffect">
                        <img class="img-fluid" src="images/womens.jpg" alt="" />
                        <div class="overlay">
                            <h5>women's fashion</h5>
                            <Link to="/products?cat=66a3befb240a39efbc1f2c75" class="info">Shop Now</Link>
                        </div>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="hovereffect">
                        <img class="img-fluid" src="images/mens.jpg" alt="" />
                        <div class="overlay">
                            <h5>men's fashion</h5>
                            <Link to="/products?cat=66a3becd240a39efbc1f2c72" class="info">Shop Now</Link>
                        </div>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="hovereffect">
                        <img class="img-fluid" src="images/a3.jpg" alt="" />
                        <div class="overlay">
                            <h5>Girls fashion</h5>
                            <a class="info" href="products?cat=66add7e7ab973315287dd8dc">Shop Now</a>
                            <h5>Boys fashion</h5>
                            <a class="info" href="products?cat=66add7daab973315287dd8d9">Shop Now</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="testimonials-section">
                <h1>What Our Customers Say</h1><br />
                <div className="testimonial-cards">
                    {testimonials.map((testimonial) => (
                        <div className="testimonial-card" key={testimonial.id}>
                            <img src={testimonial.image} alt={testimonial.name} className="testimonial-photo" />
                            <h5>{testimonial.name}</h5>
                            <p>"{testimonial.feedback}"</p>
                            <div className="stars">
                                {Array.from({ length: 5 }, (_, index) => (
                                    <i
                                        key={index}
                                        className={`fa ${index < testimonial.rating ? 'fa-star' : 'fa-star-o'} blue-star`}
                                        aria-hidden="true"
                                    ></i>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            <div className="register">
                <h2>You May Also Interested In</h2></div>
            <div className="col-lg-9 mt-lg-01 mt-5 right-product-grid">

                <div className="card-group">
                    {
                        prodsdata.length > 0 ?
                            prodsdata.map((item, index) =>
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
                                            <div className="price">
                                                <b>₹{item.Rate}</b>
                                                <Link to={`/details?pid=${item._id}`}><span id="cart"><i className="fas fa-shopping-bag"></i></span></Link>
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
export default Home