
import mongoose from 'mongoose';

const ngoSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    registrationId:{
        type:String,
        required:true,
        unique:true
    },
    Password:{
        type:String,
        required:true
    },
});

module.exports=mongoose.model('Ngo',ngoSchema);