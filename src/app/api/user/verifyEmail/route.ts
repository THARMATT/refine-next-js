 import {connect} from '@/dbConfig/dbConfig'
import { sendMail } from '@/helpers/mailer'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
 connect()
 

 export async function Post(req:NextRequest){
try {
    const reqBody=await req.json()
    const {token}=reqBody
   const user=await  User.findOne({
        verifyToken:token,
        verifyTokenExpiry:{$gt:Date.now()}
    })
    if(!user){
        return NextResponse.json({
            error:"Invalidtoken"
        })
    }
   user.isVerified=true;
   user.verifyToken=undefined;
   user.verifyTOkenExpiry=undefined;
  const savedUser= await user.save();
  
   return NextResponse.json({
mesage:"Email verified successfully"
   })
} catch (error:any) {
    return NextResponse.json({
        message:error.message
    })
}
 }