const express=require("express");

const router=express.Router();

const{login,signup}=require('../controlers/Auth');
const {auth,isCustomer,isAdmin}=require('../middleware/auth');
const {contactUs} = require("../controlers/Contact");
const {addProduct,getAllProducts,getSingleProduct}=require("../controlers/Product");



router.get('/customer',auth,isCustomer,(req,res)=>{
    res.json({
        success:true,
        message:"welcome to protected route for customer"
    })
})

router.get('/admin',auth,isAdmin,(req,res)=>{
    res.json({
        success:true,
        message:"welcome to protected route for admin"
    })
})

router.get('/test',auth,(req,res)=>{
    res.json({
        success:true,
        message:"welcome to protected route for test"
    })
})



router.post('/login',login);
router.post('/signup',signup);
router.post("/contactus",auth,contactUs);
router.post("/addproduct",auth,isAdmin,addProduct);
router.get("/getallproduct",getAllProducts);
router.get("/getsingleproduct/:id",getSingleProduct);

module.exports=router;