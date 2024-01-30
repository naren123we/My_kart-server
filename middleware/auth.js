
const jwt=require("jsonwebtoken");
require('dotenv').config();


exports.auth=(req,res,next)=>{
   try{
     
    const authorizationHeader = req.headers['authorization']?.split(' ')[1];


   const token =authorizationHeader||req.body.token;
 
   if(!token){
       return res.status(400).json({
        success:false,
        message:'Token missing',
       })
   }
 

       
   try{

    const decode=jwt.verify(token,process.env.JWT_SCERET);
    console.log(decode);

    req.user=decode;

   }catch(err){
            console.log(err.message);
            console.log(err);
        return res.status(401).json({
            
                success:false,
                message:'Token is invalid',
               
        })
   }

   next(); 

   }catch(err){
    console.log(err);
    console.log(err.message)
    return res.status(401).json({
          
        success:false,
        message:'User not authenticated',
        body:req.body

       
})
   }
}

exports.isCustomer=(req,res,next)=>{
   try{
       
    if(req.user.role!="Customer"){
        return res.status(401).json({
            
            success:false,
            message:'this is protected rout for Customer',
           
    })
  
    }
    next();

   }catch(err){
    return res.status(500).json({
            
        success:false,
        message:'user role is not matching',
       
})
   }
}

exports.isAdmin=(req,res,next)=>{
    try{
        
     if(req.user.role!="Admin"){
         return res.status(401).json({
             
             success:false,
             message:'this is protected rout for student',
            
     })
     }

     next();
 
    }catch(err){
     return res.status(500).json({
             
         success:false,
         message:'user role is not matching',
        
 })
    }
 }