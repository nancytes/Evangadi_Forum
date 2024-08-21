import React from "react";
import backGroundPic from "../../Images/blackLogo.png";
import classes from "./Landing.module.css";
import { Link, useNavigate } from "react-router-dom";

function LandingPage() {
	const navigate = useNavigate();

	function ToLogIn() {
		navigate("./secondPage");
	}
	return (
		<div>
			<div className={classes.background}>
				<ul className={classes.ulupdate}>
					<li>
						<img src={backGroundPic} alt="" />
					</li>
					<li className={classes.item_link}>
						<Link to="">Home</Link>
					</li>
					<li className={classes.item_link}>
						<Link to="/how-it-works">How it works</Link>
					</li>

					<li>
						<button onClick={ToLogIn} className={classes.login_button}>
							Sign In
						</button>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default LandingPage;
