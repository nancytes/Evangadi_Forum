const express = require('express');
const app = express();
const port = 3000;

// user routers middleWare file
const UserRoutes = require("./routes/userRoute");
// question route middleWare file 
const questionRoutes = require("./routes/questionRoute");
// answer route middleWare file 
const answerRouter = require("./routes/answerRoute")
// db connection
// 
const dbConnection = require("./db/dbConfig");
// json middleWare  to extract json data 
app.use(express.json());
// user routes middleware
app.use("/api/users", UserRoutes);

// question route middle ware 
app.use("/api/question", questionRoutes);

// answer route middle ware
app.use("/api/answer", answerRouter);

async function start() {
  try {
    const result = await dbConnection.execute("select 'test'");
    await app.listen(port);
    console.log("database connection established");
    console.log(`listening on ${port}`);
  } catch (err) {
    console.log(err.message);
  }
}
start();

