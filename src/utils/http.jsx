import axios from "axios";

let authToken = localStorage.getItem("token");

const baseURL = "http://13.60.50.22/";

const $API = axios.create({
    baseURL: baseURL,
});

const $authHost = axios.create({
    baseURL: baseURL,
    headers:{
        Authorization: `Token ${authToken}`
    }
});




// setInterval(refreshToken, 20 * 60 * 1000);

export { $authHost, $API };
