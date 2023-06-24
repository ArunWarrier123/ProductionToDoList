const express = require('express')
const router = express.Router()
const { taskAddController , taskRemoveController , taskRetrieveController } = require('../controllers/taskController')

//route for adding task
router.route('/add').post(taskAddController)

//route for deleting task
router.route('/delete/:name/:taskString').delete(taskRemoveController)

//route for retrieving all tasks
router.route('/retrieve/:name').get(taskRetrieveController)



module.exports = router