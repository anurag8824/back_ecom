import User from "../controller/User.controller.js";
import { Router } from "express";
const router = Router();


router.post("/EmailRegister",User.EmailRegister)
router.post("/Otpverfiy",User.OtpVerfiy)
router.post("/register/finish",User.UserData)
// router.post("resend",User.resendOtp)
router.get("/me",User.UserCheck)
router.get("/Deals",User.Deals);
router.post("/orderclick",User.OrderClick)
router.post("/myproduct",User.Myproduct);
router.get("/singledeal/:id",User.SingleDeal)


export default router;

