import mongoose from "mongoose";
import { type } from "os";

const Admin = new mongoose.Schema({
    Email:{
        type:String,
        
    },
    Otp:{
        type:String
    },
    Phoneno:{
        type:String,
        default:""
    },
    Name:{
        type:String,
        default:""
    },
    verified:{
     type:Boolean,
     default:false
    }
})

const AdminData = mongoose.model("Admindetail",Admin)

export default AdminData;