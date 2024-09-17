import axiosClient from "../../../axios-client"



export function fetchAllDocs(){
    return axiosClient.get("/doc")
    .then((data)=>{
        return data;
    })
}