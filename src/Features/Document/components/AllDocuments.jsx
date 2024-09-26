import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosClient from '../../../axios-client'
import axios from 'axios'
import { useStateContext } from '../../Auth/contexts/StateContext'
import { useQuery } from '@tanstack/react-query'
import { fetchUser } from '../../Auth/services/user-api'

const AllDocuments = () => {

    // const [userId, setUserId] = useState(1)
    const [files, setFiles] = useState(null)
    // const navigate= useNavigate()
    // const handleClick = async () => {
    useEffect(()=>{

        console.log("hello all documents")
        // console.log(authUser.data.id)
        // console.log("user id", user.id)
        axiosClient.get(`/doc/getbytoken`)
            .then(response => {
                // console.log("response", response.data)
                setFiles(response.data)

            })
            .catch(error => {
                console.log(error)
            })
    },[])
    

    return (
        <>
            <div className='' >
                All documents
            </div>
            <div className='flex justify-center items-center flex-wrap gap-5'>
                {files && files.map((item, index) => (
                    <div className='h-52 w-52 overflow-hidden rounded' key={index}>

                        {/* <img  src={item.url} alt={`Uploaded Image ${index + 1}`} className='h-full w-full' /> */}
                        {/* <iframe src={item.url} alt={`Uploaded document ${index + 1}`} className='h-full w-full'></iframe> */}

                        {
                            item.mime_type == "image/png" &&
                            <object data={item.url} type="image/png" className='h-full w-full'>
                            </object>

                        }

                        {
                            item.mime_type == "image/jpeg" &&
                            <object data={item.url} type="image/jpeg" className='h-full w-full'>
                            </object>

                        }

                        {
                            item.mime_type == "application/pdf" &&
                            <object data={item.url} type="application/pdf" className='h-full w-full'>
                                <img src="https://www.science.co.il/internet/browsers/PDF-doc-256.png" alt="" className='h-full w-full' />
                            </object>

                        }

                        {
                            item.mime_type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
                            <object data={item.url} type="application/vnd.ms-excel" className='h-full w-full'>

                            </object>

                        }

                        {
                            item.mime_type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
                            <object data={item.url} type="application/vnd.ms-excel" className='h-full w-full'>
                                <img src="https://static.vecteezy.com/system/resources/previews/036/897/160/non_2x/ms-word-office-file-icon-free-png.png" alt="" className='h-full w-full' />

                            </object>

                        }

                        {
                            item.mime_type == "application/vnd.openxmlformats-officedocument.presentationml.presentation" &&
                            <object data={item.url} type="application/vnd.ms-powerpoint" className='h-full w-full'>
                                <img src="https://www.freeiconspng.com/thumbs/ppt-icon/microsoft-powerpoint-icon-microsoft-powerpoint-2.png" alt="" className='h-full w-full' />

                            </object>

                        }


                    </div>
                ))}
            </div>

        </>
    )
}

export default AllDocuments
