import axios from 'axios'

const axiosBase = axios.create({
    // baseURL:'http://localhost:3000/api'
    baseURL: 'https://forum-backend-2-am7z.onrender.com'
})
export default axiosBase
