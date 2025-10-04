const mongoose = require('mongoose');

require('dotenv').config();

const db = () =>{



mongoose.connect(process.env.MONGO_URI,()=>{
    try {
        console.log('MongooseDB Connected')

    } catch (error) {
        console.error("Db error",error);
    }
})
}
module.exports =db;