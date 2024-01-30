const mongoose = require('mongoose');
require("dotenv").config();


const dbconnect=()=>{
    mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true, // Removed deprecated option
    useUnifiedTopology: true // Removed deprecated option
})
    .then(() => {
        console.log("hogya connection");
    })
    .catch((err) => {
        console.log("error");
        console.log(`${err.message}`);
        process.exit(1);
    });
}

module.exports=dbconnect;