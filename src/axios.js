import axios from "axios";

export default  axios.create(
    {
        baseURL:'http://localhost:3050',
        // withCredentials:true,
        headers:{
            'Content-Type': 'application/json',
        }
    }
)

