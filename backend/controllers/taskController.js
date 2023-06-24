const taskModel = require('../models/TasksModel')


async function taskDocCreator(name) {

    const newTaskDoc = await taskModel.create({
        name
    })
    if (newTaskDoc) console.log("taskdoc was created")
}



const taskAddController = async (req, res, next) => {
    // res.send('New Task Added')
    console.log('add controller called')
    const { name, taskString } = req.body

    const userExists = await taskModel.findOne({ name })

    if (userExists) {
        const _id = userExists._id.valueOf()
        // console.log(id.valueOf())
        const result = await taskModel.updateOne({ _id }, {
            $push: {
                tasks: taskString
            }
        })
        // const newTask = taskModel
        // const pusheddata =  await userExists
        const newuser = await taskModel.findOne({ name })
        res.json(newuser.tasks)

        // if(pusheddata){
        // }
        // else{
        //     res.send('Task was not added although user was found')
        // }
    }
    else {
        console.log('no user found')

    }
}


const taskRemoveController = async (req, res, next) => {
    // res.send('Task Removed Succesfully')
    const  name  = req.params.name
    const  taskString  = req.params.taskString

    const userExists = await taskModel.findOne({ name })

    if (userExists) {
        const _id = userExists._id.valueOf()
        // console.log(id.valueOf())
        const result = await taskModel.updateOne({ _id }, {
            $pull: {
                tasks: taskString
            }
        })

        if(result) res.send('Task Deleted Succesfully')
    }

}


const taskRetrieveController = async (req, res, next) => {
    // res.send('Tasks Retreived Succesfully')
    console.log('task controller called')
    const  name  = req.params.name
    console.log(name)
    const userExists = await taskModel.findOne({ name })

    if (userExists) {
        console.log('user found')
        const result = await userExists.tasks
        res.send(result)
    }

}


module.exports = { taskAddController, taskRemoveController, taskRetrieveController, taskDocCreator }