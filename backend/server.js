//built in imports
const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const app = express()

dotenv.config()

//custom imports
const connectDB = require('./dbOps/dbConnector')

//options configurations for cors
const allowedOrigins = ['http://127.0.0.1:5500' , 'http://localhost:3000' , 'https://amazingtodo.onrender.com'];
const corsOptions = {
    origin: (origin, callback) => {
        if(allowedOrigins.indexOf(origin) !== -1 || !origin) { //!origin  is written cuz localhost gives undefined as origin
            callback(null, true)
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200

}




connectDB()

//built in middleware
app.use(express.json())
app.use(cors( corsOptions))

// -------------------//
// custom middleware  //
//--------------------//

//user login and register middleware
app.use('/api/users' , require('./routes/userRoutes'))

//task manipulation middleware
app.use('/api/tasks' , require('./routes/taskRoutes'))


app.listen(process.env.PORT , () => {
    console.log('Server running on Port ' + process.env.PORT)
})