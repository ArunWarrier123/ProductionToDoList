const usermodel = require('../models/UsersModel')
const bcryptjs = require('bcryptjs')
const  taskcontrollerfile = require('../controllers/taskController')

//handles succesfull and unsuccesfull login attempts
const loginController = async (req , res , next) =>{
    
    //store the data i.e email,password and check against db
    const { email , password } = req.body

    const userExists = await usermodel.findOne({ email })

    if(userExists){
        const hashedpw = userExists.hashedpw
        const confirmpw = await matchedPassword(password , hashedpw) 
        if( confirmpw) res.json(userExists)
        else res.status(401).send('Invalid password ')
    }
    else{
        res.status(401).send('No Such User Exists')
    }
}


//handles succesfull and unsuccesfull signup attempts
const registerController = async (req , res , next) =>{
    
    const {name , email , password } = req.body;

    const userExists = await usermodel.findOne({ email })
    if(userExists){
        res.status(409).send('Email already in Use')
    }
    else{
        //encrypt pw then create user
        //call encryptor
       const hashedpw = await  encryptor(password)
        //create new user
        const newuser = await usermodel.create({
            name,
            email,
            hashedpw
        })

        if(newuser){
            const docc = await taskcontrollerfile.taskDocCreator(name)
            res.send('New user Created Succesfully')
        }
        else{
            res.send('User was not created . unknown error occurred')
        }
    }



}


//handles logout functionality not used currently
const logoutController = (req , res , next) =>{
    res.send('User Log out called')
}


//function to encrypt password
 async function encryptor  (enteredpassword) {
    const salt = await bcryptjs.genSalt(10) // the higher the value the better the security
    return await bcryptjs.hash(enteredpassword , salt )
}


//function to decrypt and match password given
async function matchedPassword(enteredpassword , hashedpw){
        return await bcryptjs.compare(enteredpassword , hashedpw)
}


module.exports = { loginController , registerController , logoutController}