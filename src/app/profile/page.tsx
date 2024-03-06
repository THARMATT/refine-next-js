'use client'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

function page() {
  const router=useRouter()
  const [data,setData]=useState("nothing")
  const logout=async()=>{
try {
  await axios.get("api/user/logout")
  toast.success('Logout successful')
  router.push('/signup')
} catch (error:any) {
  console.log(error.message)
  toast.error("Logout failed")
}
  }


  const getUserDetails=async()=>{
    const res=await axios.get('/api/user/me')
    console.log(res.data);
    setData(res.data.data._id);

  }
  return (
    <div className='text-2xl text-center '>
      Profile page
      <h2 className="text-center bg-green-500">{data==="nothing" ?"Nothing":<Link href={`/profile/${data}`}></Link>}{data}</h2>
      <Link href="/">
          <div onClick={logout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
           Logout
          </div>
        </Link>

        <button onClick={getUserDetails} className="bg-pink-500 mt-4 px-3 py-2 rounded">Get Details</button>
    </div>
  )
}

export default page
