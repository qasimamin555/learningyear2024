import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useContext} from "react";
import {GlobalContext} from "../store";
import {SET_USER_INFO} from "../store/const";

let getData = null;
let token = null;

function getToken() {
    if (token) {
        return token;
    }
    console.log("Function is calling")

    AsyncStorage.getItem("userInfo")
        .then(response => {
            if (response) {
                getData = JSON.parse(response);
            }
        })
}

const request =  axios.create({
    // baseURL: process.env.API_URL, // Use your environment variable here
    baseURL: 'http://192.168.0.110:5000', // Use your environment variable here
    // baseURL: 'https://nodejs-boilerplate-pi.vercel.app', // Use your environment variable here
    timeout: 50000, // Set a timeout if needed
    headers: {
        'Content-Type': 'application/json',
    },
});

request.interceptors.response.use(
    response => response,
    async error => {
        if (error?.response?.status && error.response.status === 401) {
            // Perform logout actions, such as clearing local storage
            await AsyncStorage.removeItem('userInfo');
        }
        return Promise.reject(error);
    }
);

export default request;
