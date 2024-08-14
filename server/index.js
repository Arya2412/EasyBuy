
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const adminRouter = require("./routes/admin.js");

const authRouter = require("./routes/auth.js");
const productRouter = require("./routes/product.js");
const userRouter = require("./routes/user.js");
const dotenv = require('dotenv');
dotenv.config()
const PORT = process.env.PORT || 4000;

app.use(express.json())
app.use(authRouter);
app.use(adminRouter);
app.use(productRouter);
app.use(userRouter);

mongoose
.connect(process.env.DB)
.then(()=>{
    console.log("Connection to DB done");
})
.catch((e)=>{
    console.log(e);
})

app.listen(PORT,"0.0.0.0",()=>{
    console.log(`Server is running on port ${PORT}`);
})
