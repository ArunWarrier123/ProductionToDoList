const mongoose = require('mongoose')

//establish connection between node server and MongoDB database
const connectDB = async ()=>{
    try {
       const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        console.log('Connection Succesfull')
    } catch (error) {
        console.log(error)
    }
}


module.exports = connectDB