import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../Context/UserContext';
import axios from '../../Axios';
import { useNavigate } from 'react-router-dom';


const AskQuestion = () => {
    const navigate = useNavigate()
    const [form,setForm] = useState({})
    const [userData, setUserData] = useContext(UserContext);

    console.log(userData)
    
    

    const handleChange = (e) => {
      setForm({...form,[e.target.name]:[e.target.value]})
    }

    const handleSubmit = async (e) => {
          e.preventDefault()
          try {
            await axios.post(
              "/api/questions/askQuestions",
              {
                title: form.title,
                description: form.description,
                userid: userData.userid,
              },
              {
                headers: {
                  Authorization: "Bearer " + userData.token,
                },
              }
            );
            // setForm('');
            alert("Question posted successfully.");
            navigate('/home')
          } catch (err) {
             console.log(err);
             alert(err);
          }
    }
 useEffect(() => {
   if (!userData.userid) navigate("/");
 }, [userData.userid, navigate]);

  return (
    <div>
      <div className="mt-6">
        <h1 className="text-2xl font-mono font-bold mb-3 mx-[20%] ">
          Steps To Write A Good Questions
        </h1>
        <ul className="mx-[25%] list-disc font-bold font-mono">
          <li>Summerize your Problem in One Line Title</li>
          <li>Describe Problem In More Detail</li>
          <li>Describe what You Tried And What You Expected To Happen</li>
          <li>Review Your Question And Post It To The Site</li>
        </ul>
      </div>

      <div className=" m-10 px-[190px] py-2 rounded-md shadow-xl">
        <div className="text-center m-2 text-2xl font-mono font-extrabold">
          <h1>Ask Your Question</h1>
        </div>

        <div className="">
          <form onSubmit={handleSubmit}>
            <input
              name="title"
              onChange={handleChange}
              className="w-[100%] px-[20px] py-2 border border-[#9a9696] outline-none rounded-md m-3"
              type="text"
              placeholder="Title"
              //   size={100}
            />
            <textarea
              className="w-[100%]  p-3 border border-[#9a9696] outline-none rounded-md m-3"
              name="description"
              onChange={handleChange}
              rows="5"
              placeholder="Question Description..."
            ></textarea>
            <button
              className="bg-[#516CF0] mb-2 ml-3 items-start justify-start flex px-[50px] sm:px-[75px] py-2 text-white hover:bg-[#FE8402] rounded-md"
              type="submit"
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AskQuestion