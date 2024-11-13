import { ToastContainer } from 'react-toastify';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import SitesRoutes from './components/SitesRoutes';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect} from 'react';
import AdminHeader from './components/AdminHeader';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './userSlice';
function App() {
  const { isLoggedIN, uinfo } = useSelector((state)=>state.user);
  const disptach=useDispatch();
  useEffect(()=>
  {
    if(sessionStorage.getItem("userdata")!==null)
    {
      disptach(login(JSON.parse(sessionStorage.getItem("userdata"))));
    }
  },[]
  )
  return (
    <>
      {
        isLoggedIN===false?<Header/>:uinfo.usertype==="admin"?<AdminHeader/>:<Header/>
      }
      <SitesRoutes/>
      <Footer/>
      <ToastContainer/>
    </>
  );
}

export default App;
