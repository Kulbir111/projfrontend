import { Link } from "react-router-dom"

function Footer() {
    return (
        <>
            <div className="footerv2-w3ls">
                <div className="footer-w3lagile-innerr">
                    <div className="container-fluid">
                        <div className="row  footer-v2grids w3-agileits">

                            <div className="col-lg-2 col-sm-6 footer-v2grid">
                                <h4>Support</h4>
                                <ul>

                                    <li>
                                        <Link to="/checkout">Payment</Link>
                                    </li>
                                    <li>
                                        <Link to="/viewuserorders">Shipping</Link>
                                    </li>
                                    <li>
                                        <Link to="/home">Cancellation & Returns</Link>
                                    </li>
                                    <li>
                                        <Link to="/contact">FAQ</Link>
                                    </li>
                                </ul>
                            </div>


                            <div className="col-lg-2 col-sm-6 footer-v2grid">
                                <h4>Information</h4>
                                <ul className="info">
                                    <li aria-hidden="true"><Link to="/home">About Us</Link></li>
                                    <li aria-hidden="true"><Link to="/home">Contact Us</Link></li>
                                    <li aria-hidden="true"><Link to="/home">Short Codes</Link></li>
                                    <li aria-hidden="true"><Link to="/home">FAQ's</Link></li>
                                </ul>
                            </div>
                            <div className="col-lg-2 col-sm-6 footer-v2grid">
                                <h4>Category</h4>
                                <ul className="info">
                                    <li aria-hidden="true"><Link to="/products?cat=66a3becd240a39efbc1f2c72">Men's Clothing</Link></li>
                                    <li aria-hidden="true"><Link to="/products?cat=66a3befb240a39efbc1f2c75">Women's Clothing</Link></li>
                                    <li aria-hidden="true"><Link to="/products?cat=66add7daab973315287dd8d9">Boys Clothing</Link></li>
                                    <li aria-hidden="true"><Link to="/products?cat=66add7e7ab973315287dd8dc">Girls Clothing</Link></li>
                                </ul>
                            </div>
                            <div className="col-lg-2 col-sm-6 footer-v2grid">
                                <h4>Profile</h4>
                                <ul className="info">
                                    <li aria-hidden="true"><Link to="/showcart">Cart</Link></li>
                                    <li aria-hidden="true"><Link to="/viewuserorders">Your Orders</Link></li>
                                    <li aria-hidden="true"><Link to="/register">Register</Link></li>
                                    <li aria-hidden="true"><Link to="/login">Login</Link></li>
                                </ul>
                            </div>
                            <div className="align-self-lg-center1">
                                <h5>Payment Method</h5>
                                <ul className="mt-41">
                                    <li className="list-inline-item">
                                        <img src="images/pay2.png" alt="" />
                                    </li>
                                    <li className="list-inline-item">
                                        <img src="images/pay5.png" alt="" />
                                    </li>
                                    <li className="list-inline-item">
                                        <img src="images/pay3.png" alt="" />
                                    </li>
                                    <li className="list-inline-item">
                                        <img src="images/pay7.png" alt="" />
                                    </li>
                                    <li className="list-inline-item">
                                        <img src="images/pay8.png" alt="" />
                                    </li>
                                    <li className="list-inline-item ">
                                        <img src="images/pay9.png" alt="" />
                                    </li>
                                </ul>
                                <ul className="social-iconsv2 agileinfo">
                                    <li>
                                        <a href="#">
                                            <i className="fab fa-facebook-f"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="fab fa-twitter"></i>
                                        </a>
                                    </li>

                                    <li>
                                        <a href="#">
                                            <i className="fab fa-youtube"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="fab fa-linkedin-in"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="fab fa-google-plus-g"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="align-self-lg-center2">
                                <h2 className="agile_btxt">
                                    <Link to="/home">
                                        <span>f</span>ashion
                                        <span>h</span>ub</Link>
                                </h2>
                                <p>© 2024 Fashion Hub. All rights reserved | Design by Kulbir Singh
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>






        </>
    )
}
export default Footer