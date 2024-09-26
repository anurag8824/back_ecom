import mongoose from "mongoose";

const ProductList = new mongoose.Schema({
    DealTitle:{
        type:String,
    },
    Price:{
        type:String
    },
    Offer:{
        type:String
    },
    Store:{
        type:String
    },
    Variant:{
        type:String
    },
    Image:{
        type:String
    },
    Link:{
        type:String
    },
    OfferAmmount:{
        type:String,
    },
    CardType:{
        type:String,
    },
    DealNumber:{
        type:String,
    },
    offerCash:{
    type:String,
    }
  
},{timestamps:true})


const Product = mongoose.model("product",ProductList);

export default Product;
