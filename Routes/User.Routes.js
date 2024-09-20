import User from "../controller/User.controller.js";
import { Router } from "express";
const router = Router();


router.post("/EmailRegister",User.EmailRegister)
router.post("/Otpverfiy",User.OtpVerfiy)
router.post("/register/finish",User.UserData)
// router.post("resend",User.resendOtp)



export default router;

