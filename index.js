import express from "express"
import connection from "./db/connection.js";
import dotenv from 'dotenv';
import User from "./Routes/User.Routes.js"
import cookie from "cookie-parser"
import cors from "cors";

dotenv.config();
const app = express();
const PORT = 8000;
connection();
app.use(express.json({limit:"16kb"}))
app.use(cookie())
app.use(cors({
    origin:"https://test-ecom-ten.vercel.app/",
    credentials:true
}));



app.use("/user",User)
















app.listen(PORT,()=>{
    console.log("server is running on port 8080")
});
