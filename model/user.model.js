import mongoose from "mongoose";
import connection from "../db/connection.js";

const User = new mongoose.Schema({
    first_Name:{
        type:String,
        // required: true,
        default:""
    },
    last_Name:{
        type:String,
        // required:true,
        default:""
    },
    Email:{
        type:String,
        required:true
    },
    
    Otp:{
    type:String,
    required:true
    },
    Phoneno:{
        type:String,
        // required:true,
        default:"1234567890",
    },
    verifed:{
       type:Boolean,
       default: false
    }
})

const userModel = mongoose.model("userdetail",User)

export default userModel