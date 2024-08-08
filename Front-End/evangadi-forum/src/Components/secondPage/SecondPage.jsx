import React, { useContext, useEffect, useState } from "react";
import "./SecondPage.css";
import SignIn from "../SignIn/SignIn";
import { Link } from "react-router-dom";
import SignUp from "../SignUp/SignUp";
import { userProvider } from "../../Context/UserProvider";

function SecondPage() {
  const [user, setUser] = useContext(userProvider);
  const [showSignIn, setSignIn] = useState(true);

  function toggleForm() {
    setSignIn((prevState) => !prevState);
  }

  useEffect(() => {
    if (user.userName) {
      setUser({});
      localStorage.setItem("token", "");
      console.log("deleted user");
    }
  }, [user, setUser]);

  return (
    <div className="home">
      <div className="container">
        <div className="con row">
          {showSignIn ? (
            <SignIn key="signIn" toggleForm={toggleForm} />
          ) : (
            <SignUp key="signUp" toggleForm={toggleForm} />
          )}

          <div className="info col col-md pb-sm-5">
            <Link to ="" className="about" target="_blank" >About</Link>
            <h1 className="network pb-3">Evangadi Networks</h1>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat, accusantium soluta? Vitae consequuntur repellat nam hic expedita. Distinctio enim tempore eius similique animi impedit, maxime eaque dolores vero, deserunt odio aspernatur porro temporibus possimus eligendi nisi eum, ex voluptatem ullam.
            </p>

            <p className="pl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, aperiam tempore. Itaque quod ducimus at, tenetur sit repudiandae! Repellat, nesciunt.
            </p>
            
            <Link to="/how-it-works">
              <button className="works">HOW IT WORKS</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecondPage;