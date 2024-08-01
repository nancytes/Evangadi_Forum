
import axios from 'Axios'


const Axios = axios.create({
  baseURL: "https://evangadi-forum-555a.onrender.com",
});

export default Axios

// import axios from "axios";

// const Axios = () => {
//   return axios.create({
//     baseURL: "http://localhost:5173", // the url of our server
//   });
// };

// export default Axios;