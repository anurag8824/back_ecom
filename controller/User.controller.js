import EmailVerfication from "../middlewares/Emailverfication.js";
import userModel from "../model/user.model.js";
import Product from "../model/Productlist.model.js";
import crypto from "crypto";
const genrateOtp = ()=>{
return crypto.randomInt(1000,10000)
}
const option = {
    path: "/",
    secure: true,       // Ensure the cookie is only sent over HTTPS
    // httpOnly: true, 
    sameSite:"None"
   
    
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

const UserCheck = async(req,res)=>{
const Email = req.cookies.Email;
  const user = await userModel.findOne({Email});
    if(!user){
        return res.json({msg:"user not exist !"})
    }
    if(user.verifed == false){
       res.json({msg:"Email not verifed !"})
    }
    else{
        res.json({msg:"Email verifed !",user,Email})
    }
}


const OrderClick = async (req, res) => {
  try {
    const Email = req.cookies.Email;

    // Check if the Email cookie exists
    if (!Email) {
      return res.status(400).json({ error: 'Email cookie not found' });
    }

    console.log(req.cookies);
    console.log("User", Email);

    // Generate a random AppId
    const AppId = "app" + crypto.randomInt(1000000, 10000000);
    console.log("Generated AppId:", AppId);

    // Uncomment and modify this section when database integration is needed
    await myproduct.create({
        AppId: AppId,
        UserId: Email,
        Product_id: req.body.Product_id
    });

    console.log(req.body, AppId);
    res.json({ "msg": AppId ,Email });
  } catch (error) {
    console.error("Error in OrderClick:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

  
  
  const Myproduct = async(req,res)=>{
       try {
          const {OrderId,TrackingCompnay,TrackingId,Otp,FourDigit,Invoice,AppId} = req.body
          const Product = await myproduct.findOne({AppId});
          if(!Product){
             res.json({msg:"AppId is Doesn't Exist !"})
          }
          else{
             Product.OrderId=OrderId
             Product.TrackingCompnay=TrackingCompnay
             Product.TrackingId=TrackingId
             Product.Otp=Otp
             Product.FourDigit=FourDigit
             Product.Invoice=Invoice
     
             await Product.save();
             res.json({msg:"order sucessfully Placed !"})
     
     
          }
       } catch (error) {
          res.json(error);
       }
  }
   const Deals = async(req,res)=>{
    const Deals =await Product.find({})
    if(Deals.length >0){
        res.json({Deal:Deals.length,Deals})
    }
    else{
        res.json({msg:"0 Deals is live !"})
    }
   }

   const SingleDeal = async(req,res) => {
    const id = req.params.id;
    console.log(id);
    const deal = await Product.findById(id);
    if(deal){
        res.json({Deal:deal})

    }
    else{
        res.json({msg:"no deal found"});
    }

   }
  
  export default {EmailRegister,OtpVerfiy,UserData,ResndOtp,OrderClick,Myproduct,Deals,UserCheck,SingleDeal}
