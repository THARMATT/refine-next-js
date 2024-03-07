// domain.com/verifytoken?token=

import nodemailer from 'nodemailer';
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'

export const sendMail=async({email,emailType,userId}:any)=>{
    try {
        //create a hashToken
     const hashToken= await   bcryptjs.hash(userId.toString(),10)
     if(emailType==='VERIFY'){
        await User.findByIdAndUpdate(userId,{
            verifyToken:hashToken,
            
            verifyTokenExpiry:Date.now()+3600000
         },
        )
     }
     else if(emailType==='RESET'){
        await User.findByIdAndUpdate(userId,{
            forgotPasswordToken:hashToken,
            
            forgotPasswordTokenExpiry:Date.now()+3600000
         },
        )
     }

     
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "542543005f7a84",
              pass: "bce51f8d92caae"
            }
          });


          const mailOptions={
            from:'nigam@gmail.com',
            to:email,
            subject:emailType==='VERIFY'?'Verify your email':'Reset your password',
            html:`<p>
            click <a href="${process.env.DOMAIN}/verifyemail?token=${hashToken}">here</a> to
            ${emailType==="VERIFY"?"VERIFY YOUR EMAIL":"RESET YOUR PASSWORD"}
${process.env.DOMAIN}/verifyEmail?token=${hashToken}

            </p>`
         

          }
          const mailresponse=await transport.sendMail(mailOptions);
          return mailresponse
    } catch (error:any) {
        throw new Error(error.message)
    }
}