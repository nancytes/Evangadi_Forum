const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes"); // Corrected import

const jwt = require("jsonwebtoken");

// db connection
const { dbConnectionPool, dbConnectionPromise } = require("../db/dbConfig");

async function register(req, res) {
	const { username, firstname, lastname, email, password } = req.body;
	if (!username || !firstname || !lastname || !email || !password) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ msg: "Please fill all fields" }); // Corrected reference to StatusCodes
	}
	try {
		const [user] = await dbConnectionPromise.query(
			"select username,userid from users where username=? or email=? ",
			[username, email]
		);
		if (user.length > 0) {
			return res.status(StatusCodes.BAD_REQUEST).json("user already registered"); // Corrected reference to StatusCodes
		}
		if (password.length <= 8) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ msg: "Password should be at least 8 characters " }); // Corrected reference to StatusCodes
		}
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		await dbConnectionPromise.query(
			"INSERT INTO users (username,firstname,lastname,email,password) value (?,?,?,?,?)",
			[username, firstname, lastname, email, hashedPassword]
		);

		return res.status(StatusCodes.CREATED).json({ msg: "inserted" }); // Corrected reference to StatusCodes
	} catch (error) {
		console.log(error.message);
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: "something is wrong" }); // Corrected reference to StatusCodes
	}
}

module.exports = {
	register,
};
