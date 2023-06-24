const express = require('express')
const router = express.Router()
const { taskAddController , taskRemoveController , taskRetrieveController } = require('../controllers/taskController')

router.route('/add').post(taskAddController)
router.route('/delete/:name/:taskString').delete(taskRemoveController)
router.route('/retrieve/:name').get(taskRetrieveController)



module.exports = router