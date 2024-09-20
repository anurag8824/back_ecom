import MerchantData from "../../model/Merchant.model.js"


const MerchantLogin = async(req,res)=>{
    const {Email,Password} = req.body;
    const authEmail = await MerchantData.findOne(Email)
    if(!authEmail){
        return res.json("User not Exist ! check your email")
    }
    const CheckPassword = (authEmail.Password === Password)
    if(! CheckPassword){
        return res.json("Wrong Password! Check Your Password ")
    }

    res.json("Succesfully Login!");
}


export default {MerchantLogin}