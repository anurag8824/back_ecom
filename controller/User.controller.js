import EmailVerfication from "../middlewares/Emailverfication.js";
import userModel from "../model/user.model.js";
import crypto from "crypto";
const genrateOtp = ()=>{
return crypto.randomInt(1000,10000)
}
const option = {
    path: "/",
    secure: true,       // Ensure the cookie is only sent over HTTPS
    httpOnly: true, 
    sameSite:"Lax"         // The cookie will not be accessible via JavaScript
    
};
const EmailRegister = async (req,res) =>{
    const Email = req.body.Email;
    console.log(Email);
    const user = await userModel.findOne({Email:Email})
    console.log(user)
    if(user){
    const otp = genrateOtp();
    console.log(otp)

  
   const Subject = "Otp Verification";
   const Message = `Otp is ${otp}`
    EmailVerfication(Email,Subject,Message)
    user.Otp = otp;
    await user.save();
   return  res
   .status(200)
   .cookie("Email",Email,option)
   .json({msg:"Email sent sucessfully !" ,user})

    }
    const otp = genrateOtp();
    console.log(otp)

  
   const Subject = "Otp Verification";
   const Message = `Otp is ${otp}`
  try {
     EmailVerfication(Email,Subject,Message)
  
      await userModel.create({
          Email:Email,
          Otp:otp
    
     })
    res
    .status(200)
    .cookie("Email",Email,option)
    .json({msg:"Email sent sucessfully !",user})
  } catch (error) {
    console.log(error)
    res.status(202).json({msg:"Error in sending Email !",user})

  }


}

const OtpVerfiy = async(req,res)=>{
    const {Otp} = req.body;
    console.log(Otp)
    const Email = req.cookies.Email;
    console.log(Email,"email from cookies")
    const user = await userModel.findOne({Email:Email});
    console.log(user);
    if(!user){
       return res.json({msg:"Email Doesn't match",user,Email});

    }
    if(user.Otp == Otp){
        user.verifed = true;
        await user.save();
        res.status(200).json({msg:"Sucessfully Otp Match"})
        
    }
    else{
        res.json({msg:"Otp Doesn't Match"})
    }

}

const UserData = async(req,res)=>{
    const Email = req.cookies.Email;
    const {first_Name,last_Name,Phoneno } = req.body
    const user = await userModel.findOne({Email});
    if(!user){
        return res.json("Email doesn't exist in db");
    
    }
    user.first_Name = first_Name;
    user.last_Name = last_Name;
    user.Phoneno = Phoneno;

    await user.save()
    res.status(200).json("sucessfully Registered !");
}

const ResndOtp = async (req,res)=>{
    
}



export default {EmailRegister,OtpVerfiy,UserData,ResndOtp}
