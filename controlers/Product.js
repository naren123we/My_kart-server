const Product=require("../models/Product")
const mongoose=require('mongoose');
require("dotenv").config();
const cloudinary=require("cloudinary").v2;


async function uploadToCloudinary(file,folder,quality)
{
    const options={folder};
    options.resource_type="auto";
    if(quality)
    {
        options.quality=quality
    }
    return await cloudinary.uploader.upload(file.tempFilePath,options)
}

exports.addProduct=async(req,res)=>{
    try{

        const {name,
            company,
            price,
            colors,
            description,
            category,
            featured,
            reviews,
            stars
        }=req.body;


        const files=req.files.imagefile;
     

        let imageurls=[];

        for(let i=0;i<files.length;i++){
         const response=await uploadToCloudinary(files[i],"backend");
         imageurls.push(response.secure_url);
        }
         

       const fileData=await Product.create({
        name,
        company,
        price,
        colors,
        image:imageurls,
        description,
        category,
        featured,
        reviews,
        stars,
       })
        res.json({
            success:true,
            message:"Product Added",
            data:fileData
        })
    }catch(err){
        console.error(err);
        console.log(err);
        res.status(500).json({
            success:false,
            data:"Internal Server Error",
            message:err.message
        })
    }
}
exports.getAllProducts=async(req,res)=>{
    try{
        const allProducts=await Product.find({},{name:1,image:1,price:1,featured:1,category:1})
        return res.status(200).json({
            success: true,
            data: allProducts,
          })
    }
    catch(err)
    {
        console.error(err);
        console.log(err);
        res.status(500).json({
            success:false,
            data:"Internal Server Error",
            message:err.message
        })
    }
}
exports.getSingleProduct=async(req,res)=>{
    try{
        const {id}=req.params;
 
      
        const singleProduct=await Product.findById({_id: new mongoose.Types.ObjectId(id)})
        return res.status(200).json({
            success: true,
            data: singleProduct,
          })
    }
    catch(err)
    {
        console.error(err);
        console.log(err);
        res.status(500).json({
            success:false,
            data:"Internal Server Error",
            message:err.message
        })
    }
}