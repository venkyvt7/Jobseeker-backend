const mongoose=require('mongoose');


const Schema=mongoose.Schema;


const register=new Schema({
         email:{
             type:String,
             required:true,
             unique: true
         },
         username:{
            type:String,
            required:true
        
        },
         
         password:{
            type:String,
             required:true
             
         }

})

const SignUp=mongoose.model("adminsingup",register);

module.exports=SignUp;