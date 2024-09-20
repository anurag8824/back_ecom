import { Router } from "express";
const router = Router();

import Admin from "../controller/Admin.controller.js"


router.post("/register",Admin.RegisterAdmin);
router.post("/register/otpverify",Admin.OtpVerfiy);
router.post("/login",Admin.AdminLogin);
router.post("/login/verfiyotp",Admin.LoginOtpverify);