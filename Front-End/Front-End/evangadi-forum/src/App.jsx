import React,{ useContext, useEffect, useState } from 'react'
import { UserContext, UserProvider } from './Context/UserContext';
import { Route, Routes } from 'react-router-dom';
import SignUp from './Pages/Signup_in/SignUp'; 
import LogIn from './Pages/Signup_in/LogIn';
import SharedLalyout from './Pages/SharedLayout/SharedLayout';
import axios from '../src/Axios'
import Home from './Pages/Home/Home';
import AskQuestion from './Pages/AskQuestion/AskQuestion';
import Answer from './Answear/Answer';

const App = () => {

  const [userData, setUserData] = useContext(UserContext);
  // console.log(userData)

  const checkLogedIn = async () => {
      
      let token = localStorage.getItem('auth-token')

      if (token === null) {
        localStorage.setItem('auth-token','');
        token = '';
      }else{
        // if token existed
        let userRes = await axios.get("/api/user/check", {
          headers: { "x-auth-token": token },
        });

        // set the globalstate with userData

        setUserData({
          token,
          user: {
            userid: userRes.data.userid,
            username: userRes.data.username,
          },
        });
      }       
  }; 


  // const logOut = () => {
  //   setUserData({
  //     token:undefined,
  //     user: undefined
  //   })

  //   // resetting localstorage
  //   localStorage.setItem('auth-token','')
  // }

  useEffect(()=>{
    checkLogedIn();
  },[])

  return (
    <Routes>
      <Route path="/" element={<SharedLalyout />}>
        {/* <Route path="/" element={<LogIn />} /> */}
        <Route path="/signup" element={<SignUp />} /> 
        <Route path="/home" element={<Home />} />
        <Route path="/askquestion" element={<AskQuestion />} />
        <Route path="/answer/:questionid" element={<Answer />} />
        <Route path='*' element={<LogIn/>} />
      </Route>
    </Routes>
  );
}

export default App