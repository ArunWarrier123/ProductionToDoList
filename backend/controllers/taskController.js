const taskModel = require('../models/TasksModel')

//function for creating a document under tasks collection for a user
async function taskDocCreator(name) {

    const newTaskDoc = await taskModel.create({
        name
    })
    if (newTaskDoc) console.log("taskdoc was created")
}


//function for adding a task
const taskAddController = async (req, res, next) => {

    const { name, taskString } = req.body

    const userExists = await taskModel.findOne({ name })

    if (userExists) {
        const _id = userExists._id.valueOf()
        const result = await taskModel.updateOne({ _id }, {
            $push: {
                tasks: taskString
            }
        })

        const newuser = await taskModel.findOne({ name })
        res.json(newuser.tasks)

    }
    else {
        console.log('no user found')

    }
}


//function for deleteing a task
const taskRemoveController = async (req, res, next) => {
    const  name  = req.params.name
    const  taskString  = req.params.taskString

    const userExists = await taskModel.findOne({ name })

    if (userExists) {
        const _id = userExists._id.valueOf()
        const result = await taskModel.updateOne({ _id }, {
            $pull: {
                tasks: taskString
            }
        })

        if(result) res.send('Task Deleted Succesfully')
    }

}

//function to retreive all tasks from mongoDB
const taskRetrieveController = async (req, res, next) => {

    const  name  = req.params.name
    const userExists = await taskModel.findOne({ name })

    if (userExists) {
        const result = await userExists.tasks
        res.send(result)
    }
}


module.exports = { taskAddController, taskRemoveController, taskRetrieveController, taskDocCreator }