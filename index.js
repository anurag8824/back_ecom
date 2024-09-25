import express from "express"
import connection from "./db/connection.js";
import dotenv from 'dotenv';
import User from "./Routes/User.Routes.js"
import Admin from "./Routes/Admin.Routes.js"
import cookieParser from "cookie-parser"
import cors from "cors";

dotenv.config();
const app = express();
const PORT = 8000;
connection();
app.use(express.json({limit:"16kb"}))
app.use(cookieParser())
app.use(cors({
    origin:["https://test-ecom-ten.vercel.app", "http://localhost:3000","http://88.222.241.94:3000" ], 
    credentials:true
}));



app.use("/user",User)
app.use("/admin",Admin)
















app.listen(PORT,()=>{
    console.log("server is running on port 8080")
});
