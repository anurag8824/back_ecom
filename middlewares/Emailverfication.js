import nodemailer from "nodemailer";
const EmailVerfication = (Toemail,Subject,Message)=>{
    const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port:  587,
    secure: false, // use TLS
    requireTLS: true,
    auth: {
        user:process.env.SENDING_EMAIL,
        pass:process.env.EMAIL_PASSWORD


    }
    
})
const mailOptions = {
    from:"lokesh@iiitmanipur.ac.in",
    to:Toemail,
    subject:Subject,
    text:Message
}

transporter.sendMail(mailOptions,(err,info)=>{
if(err){
    console.log(err);
    return err


}
else{

    console.log(" mail sended sucessfully ! ")
}
})
}

export default EmailVerfication