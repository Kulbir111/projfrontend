import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { logout } from "../userSlice";
import { useDispatch, useSelector } from "react-redux";

function Header() {
    const { isLoggedIN, uinfo } = useSelector((state)=>state.user);
	const disptach=useDispatch();
    const [st, setst] = useState();
    const navigate = useNavigate();
    function onlogout() {
        disptach(logout());
        sessionStorage.clear();
        navigate("/home");
    }
    function onsearch() {
        navigate("/searchresults?s=" + st);
    }

    return (
        <>
            <header>
                <div className="container">
                    <nav className="top_nav d-flex pt-3 pb-1">
                        <h1>
                            <Link to="/home" className="navbar-brand" >fh
                            </Link>
                        </h1>
                        {
                            isLoggedIN === false ?
                                <p>Welcome Guest</p> :
                                <p>Welcome {uinfo.pname}</p>
                        }

                        <div className="w3ls_right_nav ml-auto d-flex">
                            
                            <input type="search" name="Search" placeholder="Search for a Product..." onChange={(e) => setst(e.target.value)
                            } required="" />
                            <input className="btn btn-outline-secondary  ml-3 my-sm-0" type="submit" value="Search" onClick={onsearch} />

                            <div className="nav-icon d-flex">
                                {
                                    isLoggedIN === false ?
                                        <>
                                            <a className="text-dark login_btn align-self-center mx-3">
                                                <Link to="/register">Register</Link>
                                            </a>
                                            <a className="text-dark login_btn align-self-center mx-3">
                                                <Link to="/login">Login</Link>
                                            </a>
                                        </> : <>
                                            <a className="text-dark login_btn align-self-center mx-3">
                                                <Link to="/viewuserorders">Your Orders</Link></a>
                                            <a className="text-dark login_btn align-self-center mx-3">
                                                <Link to="/changepassword">Change Password</Link>
                                            </a>
                                            <a className="text-dark login_btn align-self-center mx-3">
                                                <button className="btn btn-primary" onClick={onlogout}>Logout</button>
                                            </a></>}
                                {
                                    isLoggedIN !== false ?
                                        <div className="cart-mainf">
                                            <div className="hubcart hubcart2 cart cart box_1">
                                                <Link to="/showcart"><button className="btn top_hub_cart mt-1" type="submit" name="submit" value="" title="Cart">
                                                    <i className="fas fa-shopping-bag"></i>
                                                </button></Link>

                                            </div>
                                        </div> : null
                                }
                                {
                                    isLoggedIN !== false ?
                                        <div className="cart-mainf">
                                            <div className="hubcart hubcart2 cart cart box_1">
                                                <Link to="/profile"><button className="btn top_hub_cart mt-1" type="submit" name="submit" value="" title="Profile">
                                                    <i className="fa fa-solid fa-user"></i>
                                                </button></Link>

                                            </div>
                                        </div> : null
                                }
                                {/* <div className="flex flex-col dropDownProfile">
                                    <ul className="flex flex-col gap-4">
                                        <li>Profile</li>
                                        <li>Yours Orders</li>
                                        <li>Change Password</li>
                                    </ul>
                                </div> */}

                            </div>
                        </div>
                    </nav>
                    <nav className="navbar navbar-expand-lg navbar-light justify-content-center">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mx-auto text-center">
                                <li className="nav-item">
                                    <Link to="/home" className="nav-link  active" >Home
                                        <span className="sr-only">(current)</span>
                                    </Link>
                                </li>
                                <li className="nav-item dropdown has-mega-menu">
                                    <Link to="/products?cat=66a3becd240a39efbc1f2c72" className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" >Men's clothing</Link>
                                    <div className="dropdown-menu">
                                        <div className="px-0 container">
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <Link to="/products?cat=66a3becd240a39efbc1f2c72" className="dropdown-item" >Mens</Link>
                                                    <Link to="/subproducts?cat=66a88f081ca6a8782172abfe" className="dropdown-item" >T-Shirts</Link>
                                                    <Link to="/subproducts?cat=66a8c0e127afe91c4d660925" className="dropdown-item" >Shirts</Link>
                                                    <Link to="subproducts?cat=6731bee14a7dc53b8b1ab2c6" className="dropdown-item">Suits & Blazers</Link>
                                                    <Link to="/subproducts?cat=6731c64539417d7e67ccbbde" className="dropdown-item">Jackets</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="nav-item dropdown has-mega-menu" >
                                    <Link to="/products?cat=66a3befb240a39efbc1f2c75" className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Women's clothing</Link>
                                    <div className="dropdown-menu" >
                                        <div className="px-0 container">
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <Link to="/products?cat=66a3befb240a39efbc1f2c75" className="dropdown-item" >Womens</Link>
                                                    <Link to="subproducts?cat=66a88f651ca6a8782172ac02" className="dropdown-item" >T-shirts</Link>
                                                    <Link to="subproducts?cat=66a88fef1ca6a8782172ac0a" className="dropdown-item" >Shirts</Link>
                                                    <Link to="/subproducts?cat=6731c9f2b523a261f3c8e276" className="dropdown-item">Suits & Blazers</Link>
                                                    <Link to="/subproducts?cat=6731ce0db523a261f3c8e298" className="dropdown-item" >Jeans & Jeggings</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="nav-item dropdown has-mega-menu" >
                                    <Link to="/products?cat=66add7daab973315287dd8d9" className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Boy's Clothing</Link>
                                    <div className="dropdown-menu" >
                                        <div className="px-0 container">
                                            <div className="row">
                                                <div className="col-md-4 ">

                                                    <Link to="/products?cat=66add7daab973315287dd8d9" className="dropdown-item" >Boys</Link>
                                                    <Link to="/subproducts?cat=66af3f29f26361b2a3414205" className="dropdown-item" >Shirts</Link>
                                                    <Link to="/subproducts?cat=66af3ee5f26361b2a3414201" className="dropdown-item" >T-shirts</Link>
                                                    <Link to="/subproducts?cat=6731ddadccb870cf506cecd5" className="dropdown-item" >Jeans</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="nav-item dropdown has-mega-menu" >
                                    <Link to="/products?cat=66add7e7ab973315287dd8dc" className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Girl's Clothing</Link>
                                    <div className="dropdown-menu" >
                                        <div className="px-0 container">
                                            <div className="row ">
                                                <div className="col-md-4">
                                                    <Link to="/products?cat=66add7e7ab973315287dd8dc" className="dropdown-item" >Girls</Link>
                                                    <Link to="/subproducts?cat=6731e36e51fe8136b95778d7" className="dropdown-item" >Dresses</Link>
                                                    <Link to="/subproducts?cat=6731e63fbdd074b3c98f99d9" className="dropdown-item">T-Shirts</Link>
                                                    <Link to="/subproducts?cat=6731ea3cfeb37f0eb36ec3e0" className="dropdown-item">Jeans</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <Link to="/contact" className="nav-link" >Contact</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </header>
        </>
    )
}
export default Header