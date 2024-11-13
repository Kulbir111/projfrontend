import {useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../userSlice";

function AdminHeader() {
    const { isLoggedIN, uinfo } = useSelector((state)=>state.user);
	const disptach=useDispatch();
	const[st,setst]=useState();
	const navigate = useNavigate();
	function onlogout() {
		disptach(logout());
		sessionStorage.clear();
		navigate("/home");
	}
	function onsearch()
    {
        navigate("/searchresults?s=" + st);
    }

    return (
        <>
            <header>
                <div className="container">
                    <nav className="top_nav d-flex pt-3 pb-1">
                        <h1>
                            <Link to="/adminhome" className="navbar-brand" >fh
                            </Link>
                        </h1>
                        {
                            isLoggedIN === false?
                            <p>Welcome Guest</p>:
                            <p>Welcome {uinfo.pname}</p>
                        }
                        
                        <div className="w3ls_right_nav ml-auto d-flex">
                            <form className="nav-search form-inline my-0 form-control">
                            <input type="search" name="Search" placeholder="Search for a Product..." onChange={(e) => setst(e.target.value)
                                } required="" />
                                <input className="btn btn-outline-secondary  ml-3 my-sm-0" type="submit" value="Search" onClick={onsearch} />
                            </form>
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
                                </>:<>
                                <a className="text-dark login_btn align-self-center mx-3">
                                <Link to="/vieworders">Your Orders</Link></a>
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
                                </div>:null
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
                                    <Link to="/adminhome" className="nav-link  active" >Home
                                        <span className="sr-only">(current)</span>
                                    </Link>
                                </li>
                                <li className="nav-item dropdown has-mega-menu">
                                    <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Manage Categories</a>
                                    <div className="dropdown-menu">
                                        <div className="px-0 container">
                                            <div className="row">
                                                <div className="col-md-4">
                                                <Link to="/managecategory" className="dropdown-item">Category</Link>
                                                <Link to="/managesubcategory" className="dropdown-item">Sub Category</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="nav-item dropdown has-mega-menu">
                                    <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Manage Products</a>
                                    <div className="dropdown-menu">
                                        <div className="px-0 container">
                                            <div className="row">
                                                <div className="col-md-4">
                                                <Link to="/manageproduct" className="dropdown-item">Products</Link>
                                                <Link to="/managesubproduct" className="dropdown-item">Sub Products</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="nav-item dropdown has-mega-menu" >
                                    <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">View</a>
                                    <div className="dropdown-menu" >
                                        <div className="px-0 container">
                                            <div className="row">
                                                <div className="col-md-4">
                                                <Link to="/listofusers" className="dropdown-item" >Users</Link>
                                                <Link to="/searchuser" className="dropdown-item" >Search Users</Link>
                                                <Link to="/vieworders" className="dropdown-item" >Orders</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <Link to="/addadmin" className="nav-link " >Admin
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </header>
        </>
    )
}
export default AdminHeader