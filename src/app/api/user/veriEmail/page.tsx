'use client'
import axios from 'axios'
import { url } from 'inspector'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function verifyEmailPage() {
    const [token, setToken]=useState('')
    const [verified , setVerified]=useState(false)
    const [error, setError]=useState(false)

    const verifyUserEmail=async()=>{
        try {
            await axios.post('/api/user/verifyEmail',{token})
            setVerified(true);
        } catch (error:any) {
            setError(true);
                console.log(error.response.data)
            
        }
    }

useEffect(()=>{
const urlToken=window.location.search.split("=")
[1];
setToken(urlToken || " ")
},[])

    useEffect(()=>{
if(token.length>0){
    verifyUserEmail()
}
    },[token])
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1 className="text-4xl">Verify Email</h1>
        <h2 className='p-2 bg-pink-500 text-black'>{token?`${token}`:"no token"}</h2>
      <div>

      {verified && (
        <div>
            <h2 className="text-2xl">
                Email Verified
            </h2>
            <Link href="/login">
<div className="text-red-500">Login</div>
            </Link>
        </div>
      )}  
      </div>
      {error && (
        <div>
            <h2 className="text-2xl">
                Email not Verified
            </h2>
            <Link href="#">
<div className="text-red-500"></div>
            </Link>
        </div>
      )} 
    </div>
  )
}

export default verifyEmailPage
