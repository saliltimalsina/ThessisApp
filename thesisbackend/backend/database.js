const {default: mongoose} = require("mongoose");
mongoose.set('strictQuery', false);
function DBConnect(){
    const DB_URL = process.env.DB_URL;
    mongoose.connect(DB_URL,
        err =>{
            if(err) throw err;
            console.log("Database Connected!")
        }    
    );
}

module.exports = DBConnect;
