import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import bcryptjs from 'bcryptjs'
import User from "@/models/userModel";
import jwt from 'jsonwebtoken'
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    //check if user exits or not
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        {
          error: "User does not exist",
        },
        { status: 400 }
      );
    }

    //if password is correct
    const validPassword=await bcryptjs.compare(password,user.password)

    if(!validPassword){
        return NextResponse.json(
            {
              error: "Put right credentials",
            },
            { status: 400 }
          );
    }

// craete tokenData
const tokenData={
   id:user._id ,
   username:user.username,
   email:user.email,
}


//create token

const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:"4d"})

const response=NextResponse.json({
    message:"Login Successfully",
    success:true
})
response.cookies.set("token",token,{
    httpOnly:true
})
return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
