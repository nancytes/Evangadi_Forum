import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { UserContext } from '../Context/UserContext';
import axios from "../Axios";
import { useNavigate, useParams } from 'react-router-dom';
import { BiSolidUserCircle } from "react-icons/bi";

 
const Answer = () => {
  // const [answer,]
  const [answer, setAnswer] = useState([]);
  const [userData, setUserData] = useContext(UserContext);
  const [question,setQuestion] = useState([]);
  const [form, setForm] = useState({});
  const {questionid} = useParams();
  const navigate = useNavigate()
  console.log(questionid)


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: [e.target.value] });
  }
  
 const loadQuestion = async () => {
   try {
     const allquestion = await axios.get(
       `/api/questions/getQuestions/${questionid}`,
       {
         headers: {
           Authorization: "Bearer " + userData.token,
         },
       }
     );

     setQuestion(allquestion?.data?.oneQuestion);
   } catch (err) {
     console.log(err);
     // alert(err);
   }
 };

 const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await axios.post(
            `/api/answers/${questionid}/answer`,
            {
              userid: userData.userid,
              questionid: questionid,
              answer: form.answer,
            },
            {
              headers: {
                Authorization: "Bearer " + userData.token,
              },
            }
          );
          loadaAnswer()
          setAnswer((answer) => [
            ...answer,
            // {
            //   answer: form.answer,
            //   username: answer.map((data)=>(data.usernme))
            // },
          ]);

          e.target.reset()
          alert("Answer posted successfully.");
        } catch (err) {
          console.log(err);
          // alert(err);
        }
  }

    const loadaAnswer = async () => {
      try {
        const allquestion = await axios.get(
          `/api/answers/${questionid}/answer`
          // {
          //   headers: {
          //     Authorization: "Bearer " + userData.token,
          //   },
          // }
        );

        setAnswer(allquestion?.data?.questionAnswer);
      } catch (err) {
        console.log(err);
        // alert(err);
      }
    };
    console.log(answer);

    useEffect(()=>{
      if(!userData.userid) navigate('/')
    },[userData.userid,navigate])


  // load answer
  useEffect(() => {
    loadaAnswer();
    loadQuestion();
  }, [userData.user]);

  return (
    <div className="mx-10 my-3">
      <div className="border-b-2 border-[#9a9696] pb-4">
        <h1 className="font-bold text-3xl mb-6 ">
          Questio 
          <span className="text-[#fe8402]">ns</span>
        </h1>
        {question.map((data) => (
          <div>
            <h1 className="text-xl font-mono">{data.title}</h1>
            <h1 className="text-md font-mono">{data.description}</h1>
          </div>
        ))}
      </div>

      <div className="border-b-2 border-[#9a9696]">
        <h1 className="font-bold text-2xl m-7 text-center text-[#fe8402]">
          Answer From The Community
        </h1>
      </div>

      <div className="h-80 overflow-y-auto rounded-md shadow-xl mt-5 mx-11 p-3 border border-[#9a9696]">
        {answer == "" ? (
          <div>
            <h1 className="flex justify-center items-center text-xl font-bold mt-11">
              No Answer Posted
            </h1>
            <h1 className="flex justify-center items-center text-[120px] font-bold">
              😟
            </h1>
          </div>
        ) : (
          answer.map((data) => (
            <div className="flex my-3 border-b-[2px] border-[#9a9696]">
              <div className="my-4">
                <div className="text-7xl">
                  <BiSolidUserCircle />
                </div>
                <h1 className="font-bold text-center">{data.username}</h1>
              </div>
              <h1 className="mt-6 ml-5">
                {data.answer ? data.answer : "Answer not existed"}
              </h1>
            </div>
          ))
        )}
      </div>

      <div className="m-10 px-[190px] py-2 rounded-md shadow-xl">
        <h1 className="text-center text-2xl font-mono font-bold">
          Answer The Top Question
        </h1>
        {/* <h1 className="text-center">Go to Question Page</h1> */}
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-[100%]  p-3 border border-[#9a9696] outline-none rounded-md m-3"
            name="answer"
            onChange={handleChange}
            rows="5"
            placeholder="Your Answer..."
          ></textarea>
          <button
            className="bg-[#516CF0] mb-2 ml-3 items-start justify-start flex px-[50px] sm:px-[75px] py-2 text-white hover:bg-[#FE8402] rounded-md"
            type="submit"
          >
            Post Your Answer
          </button>
        </form>
      </div>
    </div>
  );
}

export default Answer