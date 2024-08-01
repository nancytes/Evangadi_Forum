import React from 'react'
import Eva_Logo from '../../Assets/eva_logo_white.png'
import {FiFacebook, FiInstagram, FiYoutube} from 'react-icons/fi'


const Footer = () => {
  return (
    <div className="bg-[#3b455a]">
      <div className="block sm:flex sm:justify-evenly p-10 text-white">
        <div>
          <img className="h-[30px] w-[200px]" src={Eva_Logo} alt="" />
          <div className="flex gap-3 text-2xl py-5">
            <FiFacebook />
            <FiInstagram />
            <FiYoutube />
          </div>
        </div>

        <div>
          <h1 className="text-xl">Usefull Links</h1>
          <ul className="py-5 opacity-50 text-sm">
            <li className="hover:underline mb-2">
              <a href="">How It Works</a>
            </li>
            <li className="hover:underline mb-2">
              <a href="">Terms Of Services</a>
            </li>
            <li className="hover:underline mb-2">
              <a href="">Privacy Policy</a>
            </li>
          </ul>
        </div>

        <div>
          <h1 className="text-xl">Cotact Info</h1>
          <ul className="py-5 opacity-50 text-sm">
            <li className="hover:underline mb-2">
              <a href="">Evangadi Networks</a>
            </li>
            <li className="hover:underline mb-2">
              <a href="">support@evangadi.com</a>
            </li>
            <li className="hover:underline mb-2">
              <a href="">+1-202-386-2702</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer