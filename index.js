const express = require('express');
const cors=require('cors');

const app = express();
const user=require("./routes/user");
const dbconnect=require("./config/database");
const cloudinary=require("./config/cloudinary");
const fileupload=require('express-fileupload');
const cookieparser=require('cookie-parser');


require("dotenv").config();

const PORT=process.env.PORT || 4000;
app.use(fileupload(
    {
        useTempFiles:true,
        tempFileDir:'/tmp/'
    }
));

cloudinary.cloudinaryConnect();
app.use(express.json());
app.use(cookieparser());
app.use(
	cors({
		origin:"https://my-kart-ecommerce.vercel.app",
		credentials:true,
	})
)




app.use("/api/v1",user);



app.listen(PORT,()=>{
    console.log(`Server started successfully at ${PORT}`);
})

dbconnect();






app.get('/',(req,res)=>{
    res.send("<h1>local hai bhai local</h1>")
})
