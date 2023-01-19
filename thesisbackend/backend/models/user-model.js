const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    phone: {type:String, require:true},
    fname:{type:String, require:false, default:"Sparrow"},
    lname:{type:String, require:false},
    username:{type:String, require:false,default:"Test"},
    secondaryEmail:{type:String, require:false},
    address:[
        {
            state:{type:String, require:false},
        },
        {
            city:{type:String, require:false},
        }
    ],
    followers:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],

    followings:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    profile: {type:String, default:"/storage/profile/default.png" ,
    required:false, get:(profile) => {
        return `${process.env.BASE_URL}${profile}`;
    }},
    // required:false, get:(profile) => {
    //     return profile;
    // }},
    password: {type:String, require:true, default:"Test"},
    activated:{type:Boolean, require:false, default:false},

},{
    timestamps:true.valueOf,
    toJSON: {getters:true}
})
module.exports = mongoose.model('User',userSchema,'users');




