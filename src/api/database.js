import axios from "axios";

//base database request
export default axios.create({
    baseURL: 'https://5e7hnb1vb3.execute-api.us-west-2.amazonaws.com/dev',
    headers: {
        "Content-Type": "application/json"
    }
});
