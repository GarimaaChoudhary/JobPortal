import React,{useContext,useEffect,useState} from 'react'
import { Context } from '../../main'
import {Link, useNavigate } from 'react-router-dom';
import {GiHamburgerMenu} from 'react-icons/gi';
import axios from 'axios';
import toast from 'react-hot-toast';
const Navbar = () => {
  const [show,setShow]=useState(false);
  const {isAuthorized,setIsAuthorized,user}=useContext(Context);
  const navigateTo = useNavigate();
 
  const handleLogout = async() =>{
    try{
      const response = await axios.get("http://localhost:4000/api/v1/user/logout",{withCredentials:true});
      toast.success(response.data.message);
      setIsAuthorized(false)
      navigateTo("/login");
    }catch(error){
      toast.error(error.response.data.message),
      setIsAuthorized(true);
    }
  };
return (
    <nav className={isAuthorized ?"navbarShow" : "navbarHide"}>
      <div className='container'>
        <div className='logo'>
          <img src="JobZee-logos__white.png" alt="logo"/>

        </div>
        <ul className={!show ? "menu":"show-menu menu"}>
          <li>
            <Link to={"/"} onClick={()=> setShow(false)} >
               Home
            </Link>
          </li>
          <li>
            <Link to={"/job/getall"} onClick={()=> setShow(false)} >
               All Jobs
            </Link>
          </li>
          <li>
            <Link to={"/applications/me"} onClick={()=> setShow(false)} >
               {
                user && user.role ==="Employer"
                ? "Applicant's Applications"
                : "My Applications" }
            </Link>
          </li>
          {
            user && user.role ==="Employer"?(
             <>
             <li>
              <Link to={'/job/post'} onClick={()=> setShow(false)}>POST NEW JOB</Link>
             </li>

             <li>
              <Link to={'/job/me'} onClick={()=> setShow(false)}>VIEW YOUR JOBS</Link>
             </li>
             </> 
            ):(
            <></>
            )
          }
        <button onClick={handleLogout}>Logout</button>
        </ul>
        <div className='hamburger'>
          <GiHamburgerMenu onClick={()=>setShow(!show)}/>
          
        </div>
      </div>
    </nav>

  );
};


export default Navbar;