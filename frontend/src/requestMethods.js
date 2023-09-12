import axios from "axios";

const TOKEN = process.env.REACT_APP_TOKEN
// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).currentUser).token
export const publicRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
    
})

export const userRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    header:`${TOKEN}`
})
