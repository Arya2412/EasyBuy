const mongoose = require("mongoose");
const { productSchema } = require("./product");

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim: true,
    },
    email:{
        type:String,
        required:true,
        trim: true,
        validate:{
            validator:(value)=>{
                const re =   /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                return value.match(re)
            },
            message:"Please enter valid email address"
        }
    },
    password:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        default:""
    },
    type:{
        type:String,
        default:"user"
    },
    cart: [
        {
          product: productSchema,
          quantity: {
            type: Number,
            required: true,
          },
        },
      ],
});

const User = mongoose.model("User",userSchema);
module.exports = User;