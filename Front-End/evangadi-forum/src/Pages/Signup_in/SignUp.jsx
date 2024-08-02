import { Link } from "react-router-dom";
import EvaNetDisc from "./EvaNetDisc";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import axios from "../../Axios";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

const SignUp = () => {
  const [form, setForm] = useState({});
  const navigate = useNavigate();
  const [userData, setUserData] = useContext(UserContext);
  const [visible, setVisible] = useState(true);
  
 const handleChange = (e) => {
   setForm({ ...form, [e.target.name]: e.target.value });
 };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // sending data to registered in database
      await axios.post("/api/user/register", form);

      // login automatically after user registerd
      const loginRes = await axios.post(
        "/api/user/login",
        {
          email: form.email,
          password: form.password,
        }
      );

      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user.username,
        userid: loginRes.data.user.id,
      });

      // set local storage
      localStorage.setItem("auth-token", loginRes.data.token);
      navigate("/home");
    } catch (err) {
      console.log(err.response.data.message);
      alert(err.response.data.message);
    }
  };

  useEffect(()=>{
    if(userData.user) navigate('/home')
  },[userData.user,navigate])

  return (
    <div className="block sm:flex  align-middle justify-center bg-[url('/src/Assets/HomeBg.svg')] bg-no-repeat bg-cover mt-[-34px] ">
      <div>
        <div>
          <div className="flex mt-[10%] justify-center border  h-[512px] w-[537px] m-6 shadow-2xl bg-white">
            <div>
              <h2 className="text-xl text-center mt-11 font-bold text-[#4b456f]">
                Join The Network
              </h2>
              <p className="text-center mt-3">
                Already have an account?
                <Link to="/">
                  <a href="" className="text-[#FE8402]">
                    Sign In
                  </a>
                </Link>
              </p>

              <br />

              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Email address"
                  name="email"
                  className="mt-3 mb-3 px-2 py-3 border border-[#9a9696] outline-none  rounded-[5px]"
                  size={60}
                  onChange={handleChange}
                />
                <br />

                <div className="flex gap-x-6 mb-3 ">
                  <input
                    className="border outline-none border-[#9a9696] py-3 px-2 rounded-md"
                    type="text"
                    placeholder="First Name"
                    size={25}
                    onChange={handleChange}
                    name="firstname"
                  />
                  <input
                    className="border outline-none border-[#9a9696] py-3 px-2 rounded-md"
                    type="text"
                    placeholder="Last Name"
                    size={25}
                    onChange={handleChange}
                    name="lastname"
                  />
                </div>

                <input
                  type="text"
                  placeholder="UserName"
                  className="px-2 outline-none py-3 border border-[#9a9696] rounded-[5px]"
                  size={61}
                  onChange={handleChange}
                  name="username"
                />
                <br />

                <div className="flex px-2 py-3 border border-[#9a9696] rounded-[5px] mt-2">
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
                <p className="text-center text-sm m-2">
                  I agree to the
                  <a className="text-[#FE8402] hover:underline" href="">
                    privacy policy
                  </a>
                  and
                  <a className="text-[#FE8402] hover:underline" href="">
                    terms of service.
                  </a>
                </p>
                <button
                  className="bg-[#516CF0] w-[495px] py-2 mt-3 rounded-[5px] text-white hover:bg-[#FE8402]"
                  type="submit"
                >
                  Login
                </button>
              </form>
              <p className="my-3 text-center hover:underline">
                <Link to="/">
                  <a className="text-[#FE8402]" href="">
                    Already have an account?
                  </a>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <EvaNetDisc />
      </div>
    </div>
  );
};

export default SignUp;