const mongoose=require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true,
        min:4

    },
    password:{
        type:String,
        require:true
    }
});

const UserModel=mongoose.model('user',userSchema);
module.exports=UserModel;