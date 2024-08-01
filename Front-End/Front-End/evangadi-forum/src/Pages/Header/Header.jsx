import React, { useContext } from 'react'
import logo from '../../Assets/Eva_Logo.png'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

// import { UserContext } from '../../Context/UserContext';


const Header = () => {
  const [userData, setUserData] = useContext(UserContext);
  const navigate = useNavigate()


  const logout = () => {
    setUserData({
      user:undefined,
      token:undefined,
    });
  }



  
    
  return (
    <>
      <div className="block items-center justify-center sm:flex sm:space-x-9  sm:gap-[5%] sm:justify-center  sticky top-0 py-6 bg-white  shadow-lg">
        <div className="flex items-center justify-center mb-7 sm:mb-0">
          <img className="w-[150px] h-[23px] ml-5" src={logo} alt="" />
        </div>
        <ul className="flex sm:gap-5 mr-10 justify-evenly">
          <li>
            <Link to="/home" className="hover:text-[#FE8402]">
              Home
            </Link>
          </li>
          <li>
            <a href="" className="hover:text-[#FE8402]">
              How it works
            </a>
          </li>
          <li>
            <Link to="/" >
              <button 
                onClick={logout}
                className="bg-[#516CF0] px-[30px] sm:px-[75px] py-2 text-white hover:bg-[#FE8402] rounded-md"
              >
                {!userData.user ? "Sign In" : "logOut"}
              </button>
            </Link>
          </li>
        </ul>
      </div>
      <hr className="mt-5 color-black" />
    </>
  );
}

export default Header