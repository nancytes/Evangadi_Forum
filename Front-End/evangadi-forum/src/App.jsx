import Header from "./Components/Header/Header";
import Landing from "./Components/Landing/Landing.jsx";
import Footer from "./Components/Footer/Footer";
import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";
import QuestionDetail from "./Components/QuestionDetail/QuestionDetail.jsx";
import AskQuestion from "./Components/AskQuestion/AskQuestion";
import SignUp from "./Components/SignUp/SignUp";
import { UserProvider, userProvider } from "./Context/UserProvider";
import axios from "./Components/axios";
import { useContext, useEffect } from "react";
import { QuestionContext } from "./Context/QuestionContext";
import HowItWorks from "./Components/HowItWorks/HowItWorks";
import  PrivateRoute  from "./Context/PrivateRoute.jsx";
import SignIn from "./Components/SignIn/SignIn.jsx";
import SecondPage from "./Components/secondPage/SecondPage.jsx";
// import ExternalPage from "./Components/ExternalPage/ExternalPage.jsx"
function App() {
  const { questions, setQuestions } = useContext(QuestionContext);
  const [user, setUser] = useContext(userProvider);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  function logOut() {
    setUser({});
    localStorage.removeItem("token"); // Change to remove the token
    navigate("/"); // Redirect to home or login page
  }

  async function checkUser() {
    try {
      const { data } = await axios.get("/users/check", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setUser({ userName: data.username, userId: data.userid });

      // get all questions
      const res = await axios.get("/questions/all-questions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setQuestions(res.data.data);
    } catch (error) {
      console.log(error);
      navigate("/");
    }
  }

  useEffect(() => {
    if (token) {
      checkUser();
    } else {
      navigate("/");
    }
  }, [token]);
  const isLandingPage = location.pathname === '/';
  return (
    <>
      {!isLandingPage && <Header logOut={logOut} />}
      <Routes>
      {/* <Route path="/" element={<ExternalPage />} /> */}
        <Route path="/" element={<Landing />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route path="/questions/:questionid" element={<QuestionDetail />} />
        <Route path="/ask" element={<AskQuestion />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/secondPage" element={<SecondPage />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
