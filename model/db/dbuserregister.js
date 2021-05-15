const mongoose=require('mongoose');

const register= mongoose.Schema({
    username: {
        type: String,
        required: [true, 'The username is required'],
        unique: [true, 'These username just exist']
    },
    name: String,
    email: {
        type: String,
        required: [true, 'The email is required']
    },
    password: {
        type: String,
        required: [true, "The password is empty"],
        validate: {
            validator: (password) => {
                if(password.length >= 8){
                    return true;
                } else if(password.indexOf(/[A-Z]/) >= 1 || password.indexOf(/[0-9]/) >=1){
                    return true
                } else {
                    return false;
                }
            },
            message: 'The password required any capital letter and any number'
        }
    },
    desiredposition:String
});

const SignUp=mongoose.model("usersignup",register);

module.exports=SignUp;