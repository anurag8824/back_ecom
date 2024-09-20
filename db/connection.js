import mongoose from "mongoose";

const connection = () =>{
mongoose.connect("mongodb+srv://rahulk:123456%40Info@cluster0.o1kxp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("Database sucessfully connected!")
    
})
.catch((err)=>{
    console.log("error in connecting DataBase",err)
})


}

export default connection
