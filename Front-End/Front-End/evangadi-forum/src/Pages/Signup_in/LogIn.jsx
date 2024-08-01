import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EvaNetDisc from "./EvaNetDisc";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "../../Axios";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

const LogIn = () => {

  const navigate = useNavigate();
  const [userData,setUserData] = useContext(UserContext);
  const [form,setForm] = useState({});
  const [visible,setVisible] = useState(true)

  const handleChange = (e) => {
    setForm({...form,[e.target.name]:e.target.value})
  }
  const handleSubmit = async (e) => {
        e.preventDefault();
      try {
        const loginRes = await axios.post(
          "/api/user/login",{
            email: form.email,
            password: form.password
          }
        );

        setUserData({
          token: loginRes.data.token,
          user: loginRes.data.user.username,
          userid: loginRes.data.user.id,
        });

         //set localStorage with the token
        localStorage.setItem('auth-token',loginRes.data.token)
        navigate('/home')
      } catch (err) {
        console.log(err.response.data.message)
        alert(err.response.data.message);
      }
  }

  
    useEffect(() => {
      if (userData.user) navigate("/home");
    }, [userData.user, navigate]);

  return (
    <div className="block sm:flex  align-middle justify-center bg-[url('/src/Assets/HomeBg.svg')] bg-no-repeat bg-cover mt-[-34px] ">
      <div>
        <>
          <div className="flex mt-[10%] justify-center border  h-[512px] w-[537px] m-6 shadow-2xl bg-white">
            <div>
              <h2 className="text-xl text-center mt-11 font-bold text-[#4b456f]">
                Login to your account
              </h2>

              <p className="text-center mt-3">
                Don’t have an account?
                <Link to="./signup">
                  <a href="" className="text-[#FE8402]">
                    Create a new account
                  </a>
                </Link>
              </p>
              <br />
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Email address"
                  name="email"
                  onChange={handleChange}
                  className="mt-3 mb-3 px-2 py-3 border border-[#9a9696] outline-none  rounded-[5px]"
                  size={60}
                />
                <br />
                <div className="flex px-2 py-3 border border-[#9a9696] rounded-[5px]">
                  <input
                    type={visible ? "password" : "text"}
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    className="border-none outline-none"
                    size={55}
                  />
                  <a
                    className="pt-1 cursor-pointer"
                    onClick={() => setVisible(!visible)}
                  >
                    {visible ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </a>
                </div>
                <br />
                <button
                  className="bg-[#516CF0] w-[495px] py-2 mt-3 rounded-[5px] text-white hover:bg-[#FE8402]"
                  type="submit"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </>
      </div>

      <div>
        <EvaNetDisc />
      </div>
    </div>
  );
};

export default LogIn;