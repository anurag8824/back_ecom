import EmailVerfication from "../middlewares/Emailverfication.js"
import crypto from "crypto";
import AdminData from "../model/Admin.model.js";
import Product from "../model/Productlist.model.js";
import MerchantData from "../model/Merchant.model.js"
import myproduct from "../model/Myproduct.js";
const genrateOtp = ()=>{
return crypto.randomInt(1000,10000)
}
const option={
    path:"/",
    httpOnly:true,
    Credentials:true

}
const RegisterAdmin = async(req,res)=>{
    const Email = req.body;
    try {
        const otp = genrateOtp();
        console.log(otp)
    
      
       const Subject = "Otp Verification";
       const Message = `Otp is ${otp}`
      
        EmailVerfication(Email,Subject,Message)
      await AdminData.create({
        Email:Email,
        Otp:otp
      })
        res
        .cookie("Email",Email,option)
        .json("otp sent on yor Email")
    } catch (error) {
        res.json(error)
    }

}

const OtpVerfiy = async(req,res) =>{
    const Email = req.cookie
    const Admin = await AdminData.findOne(Email);

    const otp = Admin.Otp;

    if(Otp == req.body){
        Admin.verified = true;
        await Admin.save();
        res.json("Sucessfully Registered !")
    }
    else{
        res.json("Wrong Otp")
    }

}







const AdminLogin = async (req,res)=>{
    const Email = req.body
const Admin = AdminData.findOne(Email)
if(!Admin){
    return res.json("Email Doesn't Exist");
}
if(Admin.verified){
    return res.json("First Verfiy Your Email !")
}
try {
    const otp = genrateOtp();
    console.log(otp)

  
   const Subject = "Otp Verification";
   const Message = `Otp is ${otp}`
  
    EmailVerfication(Email,Subject,Message)

Admin.Otp = otp;
await Admin.save();
res.json("Otp Send on Your Email !")
} catch (error) {
    res.json(error)
}
}

const LoginOtpverify = async (req,res)=>{
    const Email = req.cookie
    const Admin = await AdminData.findOne(Email);

    const otp = Admin.Otp;

    if(Otp == req.body){
        res.json("Sucessfully Login !")
    }
    else{
        res.json("Wrong Otp")
    }


}

const Addproduct = async(req,res)=>{

   try {
     await Product.create({
         DealTitle:req.body.DealTitle,
         Price:req.body.Price,
         Offer:req.body.Offer,
         Store:req.body.Store,
         Variant:req.body.Variant,
         Image:req.body.Image,
         Link:req.body.Link,
         OfferAmmount:req.body.OfferAmmount,
         CardType:req.body.CardType,
         DealNumber:req.body.DealNumber,
         offerCash:req.body.offerCash
     })
     res.json("Product List Sucessfully !")
 
   } catch (error) {
    res.json(error)
    
   }


}

const AllMerchant = async(req,res)=>{
  try {
      const Data = await MerchantData.find()
      if(!Data){
          return res.json("Error in Fecting Data")
      }
      res.json(Data);
  }
  catch (error) {
    res.json(error)
    
  }
}

const AddMerchant = async(req,res)=>{
    try {
        const {Email,Password} = req.body;
        const Merchant = await MerchantData.findOne(Email);
        if(Merchant){
            return res.json("Email Alreadt Exist !")
        }
        await MerchantData.create({
            Email:req.body.Email,
            Password:req.body.Password
        })
        res.json("Merchant Created Sucessfully !")
    } catch (error) {
        res.json(error)
    }
}

const AllDeals = async(req,res)=>{
    const Products = await myproduct.find({});
    if(Products.length>0){
    const UpdatePrdocts = await Promise.all(
        Products.map(async(product)=>{
            const ProductDetails = await Product.findById(product.Product_id)
            return{
                ...Products._doc,
                ProductDetails:ProductDetails
            }
        })
    )

    res.json(UpdatePrdocts)
}
else{
    res.json({msg:"0 Deal Closes !"});
}

}


export default{AdminLogin,RegisterAdmin,OtpVerfiy,LoginOtpverify,Addproduct,AllMerchant,AddMerchant,AllDeals}
