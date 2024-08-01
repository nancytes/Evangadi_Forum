import React from "react";
import { BiSolidUserCircle } from "react-icons/bi";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const QuestionDetail = (props) => {

    const navigate = useNavigate()

  return (
    <>
      <div className="mx-7 p-5">
        {props.question.map((data) => (
          <div
            className="flex  hover:bg-slate-200  p-5 pb-6  border-b-2 border-[#9a9696]"
            onClick={() => navigate(`/answer/${data.questionid}`)}
          >
            <div className="block">
              <div className="text-8xl">
                <BiSolidUserCircle />
              </div>
              <h1 className="font-bold text-center">{data.username}</h1>
              <p></p>
            </div>

            <p className="mx-11 my-9 font-bold">{data.title}</p>

            {/* <div className="text-xl  my-8 text-right">
              <BsFillArrowRightCircleFill />
            </div> */}
          </div>
        ))}
      </div>
    </>
  );
};

export default QuestionDetail;