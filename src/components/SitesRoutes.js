import {Route, Routes } from "react-router-dom";
import Register from "./Register";
import Home from "./Home";
import Login from "./Login";
import Searchuser from "./Searchuser";
import Listofusers from "./Listofusers";
import Managecategory from "./Managecategory";
import ManageProduct from "./ManageProduct";
import Categories from "./Categories";
import Products from "./Products";
import Details from "./Details";
import Showcart from "./Showcart";
import Checkout from "./Checkout";
import Ordersummary from "./Ordersummary";
import ViewuserOrders from "./ViewuserOrders";
import OrderItems from "./OrderItems";
import ViewOrders from "./ViewOrders";
import UpdateStatus from "./UpdateStatus";
import Changepassword from "./Changepassword";
import Contact from "./Contact";
import SearchProducts from "./SearchProducts";
import AdminHeader from "./AdminHeader";
import AdminHome from "./AdminHome";
import AdminContact from "./AdminContact";
import Managesubcategory from "./Managesubcategory";
import ManageSubProduct from "./ManageSubProduct";
import SubCategories from "./SubCategories";
import SubProducts from "./SubProducts";
import SubDetails from "./SubDetails";
import CreateAdmin from "./CreateAdmin";
import Profile from "./Profile";
import Registers from "./Registers";
import Activate from "./Activate";
import Forgotpass from "./Forgotpass";
import ResetPassword from "./ResetPassword";

function SitesRoutes()
{
    return(
        <>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/searchuser" element={<Searchuser/>}/>
                <Route path="/listofusers" element={<Listofusers/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/changepassword" element={<Changepassword/>}/>
                <Route path="/managecategory" element={<Managecategory/>}/>
                <Route path="/managesubcategory" element={<Managesubcategory/>}/>
                <Route path="/manageproduct" element={<ManageProduct/>}/>
                <Route path="/managesubproduct" element={<ManageSubProduct/>}/>
                <Route path="/categories" element={<Categories/>}/>
                <Route path="/subcategories" element={<SubCategories/>}/>
                <Route path="/products" element={<Products/>}/>
                <Route path="/subproducts" element={<SubProducts/>}/>
                <Route path="/details" element={<Details/>}/>
                <Route path="/subdetails" element={<SubDetails/>}/>
                <Route path="/showcart" element={<Showcart/>}/>
                <Route path="/checkout" element={<Checkout/>}/>
                <Route path="/ordersummary" element={<Ordersummary/>}/>
                <Route path="/viewuserorders" element={<ViewuserOrders/>}/>
                <Route path="/orderitems" element={<OrderItems/>}/>
                <Route path="/vieworders" element={<ViewOrders/>}/>
                <Route path="/updatestatus" element={<UpdateStatus/>}/>
                <Route path="/searchresults" element={<SearchProducts/>}/>
                <Route path="/adminheader" element={<AdminHeader/>}/>
                <Route path="/addadmin" element={<CreateAdmin/>}/>
                <Route path="/adminhome" element={<AdminHome/>}/>
                <Route path="/admincontact" element={<AdminContact/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/registers" element={<Registers/>}/>
                <Route path="/activateaccount" element={<Activate/>}/>
                <Route path="/forgotpass" element={<Forgotpass/>}/>
                <Route path="/resetpassword" element={<ResetPassword/>}/>
            </Routes>
        </>
    )
}
export default SitesRoutes