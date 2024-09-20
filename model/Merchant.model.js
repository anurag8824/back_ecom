import mongoose from "mongoose";

const merchant = new mongoose.Schema({
    Name:{
        type:String
    },
    Email:{
        type:String,

    },
    Password:{
        type:String
    }
})


const MerchantData = mongoose.model("merchantdetail",merchant)