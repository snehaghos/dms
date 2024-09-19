import axiosClient from "../../../axios-client";


export function fetchUser(){
    return axiosClient.get("/user")
    .then(({res})=>{
        console.log("data in user-api - ",res.data.data)
        return res.data;
    })
}