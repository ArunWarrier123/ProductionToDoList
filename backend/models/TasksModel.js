const mongoose = require('mongoose')

const TaskSchema = mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    tasks:{
        type: [String],
        default:[]
    }

})

const taskModel = mongoose.model('Task' , TaskSchema)

module.exports = taskModel