import axios from "axios";

const http = axios.create({
    baseURL: 'http://localhost:4000',
    //GO:
    //baseURL: 'http://localhost:8000',
    headers: {
        Accept: 'application/json',
        Content: 'application/json'
        //GO:
        //'Content-Type': 'application/json'
    }
});

    
export default http 