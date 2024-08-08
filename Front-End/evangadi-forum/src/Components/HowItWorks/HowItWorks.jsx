// import React from "react";
// import "./HowItWorks.css";

// function HowItWorks() {
//   return (
//     <div className="how-it-works">
//       <h2>How it Works</h2>
//       <div className="how-it-works-content">
//         <h3>1. Create an Account</h3>
//         <p>
//           Sign up with your first name, last name, username, email, and
//           password. Ensure your email and username are unique.
//         </p>

//         <h3>2. Login</h3>
//         <p>
//           If you already have an account, log in with your email and password.
//         </p>

//         <h3>3. Ask Questions</h3>
//         <p>
//           After logging in, you can post your programming-related questions on
//           the Questions Page. Provide a concise title and a detailed
//           description.
//         </p>

//         <h3>4. Answer Questions</h3>
//         <p>
//           Browse questions posted by other users and provide answers. Your
//           username will be displayed with each answer you post.
//         </p>

//         <h3>5. View and Review Questions and Answers</h3>
//         <p>
//           Review questions and answers posted by others to enhance your
//           knowledge and help the community.
//         </p>
//       </div>
//     </div>
//   );
// }

// export default HowItWorks;


import React from "react";
import "./HowItWorks.css";
import { FaUserPlus, FaSignInAlt, FaQuestion, FaReply, FaEye } from "react-icons/fa";

function HowItWorks() {
  return (
    <div className="how-it-works">
      <h2>How it Works</h2>
      <div className="how-it-works-content">
        <div className="how-it-works-step">
          <FaUserPlus className="step-icon" />
          <h3>1. Register</h3>
          <p>
            Create an account by providing your first and last name, username, email address, and password. Ensure your username and email are unique.
          </p>
        </div>

        <div className="how-it-works-step">
          <FaSignInAlt className="step-icon" />
          <h3>2. Sign In</h3>
          <p>
            Already a member? Log in using your email and password to access your account.
          </p>
        </div>

        <div className="how-it-works-step">
          <FaQuestion className="step-icon" />
          <h3>3. Post Questions</h3>
          <p>
            After logging in, navigate to the Questions Page to post your programming-related inquiries. Make sure to include a clear title and a detailed explanation to get the best help.
          </p>
        </div>

        <div className="how-it-works-step">
          <FaReply className="step-icon" />
          <h3>4. Provide Answers</h3>
          <p>
            Browse through questions posted by other users and share your expertise by answering them. Your username will be displayed with each answer.
          </p>
        </div>

        <div className="how-it-works-step">
          <FaEye className="step-icon" />
          <h3>5. Explore and Evaluate</h3>
          <p>
            Discover and review various questions and answers to gain knowledge and assist others. Engaging with the community helps everyone learn and grow.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
