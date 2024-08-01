import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../Context/UserContext'
import {Link, useNavigate} from 'react-router-dom'
import axios from "../../Axios";
import QuestionDetail from '../AskQuestion/QuestionDetail'

const Home = () => {
  
  const navigate = useNavigate();
  const [userData, setUserData] = useContext(UserContext);
  const [question,setQuestion] = useState([])

  
  
  const logOut = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });

    // resetting localstorage
    localStorage.setItem("auth-token", "");
  };

  // load questions
  useEffect(() => {
    loadQuestion();
  },[userData.user])

  const loadQuestion = async () => {
      try {
        const allquestion = await axios.get(
          "/api/questions/allquestions",
          {
            headers: {
              Authorization: "Bearer " + userData.token,
            },
          }
        );

        setQuestion(allquestion?.data?.allQuestion);
      } catch (err) {
        console.log(err);
        // alert(err);
      }
  }
  

  // console.log(userData)
  useEffect(() => {
    if (!userData.token) navigate('/')
  }, [userData.user, navigate]);

  // console.log(question)

  return (
    <div>
      <div className="flex justify-between  m-6 p-5 rounded-md shadow-2xl">
        <Link to="/askquestion">
          <button className="bg-[#516CF0] px-[30px] sm:px-[75px] py-2 text-white hover:bg-[#FE8402] rounded-md">
            Ask Questions
          </button>
        </Link>
        <h1 className="text-xl font-bold">
          Welcome: <span className=" text-red-600"> {userData.user}</span>
        </h1>
      </div>
      {/* <button onClick={logOut}>LogOut</button> */}

      <div>
        <div className="text-lg my-5 mx-11 font-mono font-bold border-b-2 border-[#9a9696] pb-5 flex justify-evenly">
          <h1 className="font-extrabold text-3xl">Questions</h1>
          <h1 className="text-right">
            <span className=" text-red-600">{question.length}</span> Questions
            Posted
          </h1>
        </div>
      </div>

      <QuestionDetail question={question} />
    </div>
  );
};

export default Home