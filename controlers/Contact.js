const mailSender=require('../utils/mailsender');
const {contactUsEmail}=require('../mail/templates/ContactUsEmail');
const {contactTeamEmail}=require('../mail/templates/CotactTeamEmail');

require("dotenv").config();


exports.contactUs=async(req,res)=>{

    try{
        const {name,email,message}=req.body;
  
           try{
            const mailToContactTeam=await mailSender(
                process.env.Contact_Team_Mail,
                "Message By User",
                contactTeamEmail(name,email,message)
                );
           
           }catch(err){
              console.log(err);
           }
    
        const emailRes = await mailSender(
            email,
            "Your Data send successfully",
            contactUsEmail(name,email,message)
          )
          console.log("Email Res ", emailRes);


          return res.json({
            success: true,
            message: "Message send successfully",
          })

           

 
    }catch(err){
       
     console.error(err);
 
     return res.status(500).json({
         success:false,
         message:'Message not sent',
     })
    
    
    }
 
 }