import axios from 'axios'

const axiosBase = axios.create({
    baseURL:'http://localhost:3000/api'
    // baseURL: "https://forum-backend-5.onrender.com/",
})
export default axiosBase
