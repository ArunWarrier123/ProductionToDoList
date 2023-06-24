import React, { useEffect, useState } from 'react'
import { Container, Card, Button } from 'react-bootstrap'
import "./HomeScreen.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch , useSelector} from 'react-redux'
// import { taskAdderAction } from '../../actions/taskActions'
// import taskActions from '../../actions/taskActions'
// const { taskAdderAction } = taskActions


export default function HomeScreen() {

    const [taskString, setTaskString] = useState("")
    // const [todos, setTodos] = useState([]);
    const [name, setName] = useState(localStorage.getItem('name'))

    const navigate = useNavigate()
    let ignore = false
    //state management
    const dispatch = useDispatch()
    const Taskred = useSelector((state ) => state.Taskred) 
    let { tasks } = Taskred || {};

    // setTodos(tasks)

    const taskAdderAction = (taskString) =>(dispatch , getState) =>{
        const { Taskred : { tasks }} = getState();
    
        const hasToDo = tasks.find((i) => i.task === taskString );
    
        if(!hasToDo && taskString !== ""){
            // console.log(taskString)
            dispatch({
                type: "ADD_TASK",
                payload: [ {id: taskString , taskString} , ...tasks]
            })
        }
    }

    const taskRemoverAction = (taskString) => (dispatch , getState) =>{
        const{ Taskred: { tasks }} = getState()
    
        dispatch({
            type:"DELETE_TASK",
            payload: tasks.filter((t) => t.id !== taskString)
        })
    
    }


    const fetchData = async () => {
        try {
            
            const { data } = await axios.get(`http://localhost:5000/api/tasks/retrieve/${name}`)
            
            if (data) {
                // setTodos(data)
                tasks = null
                data.forEach(element => {
                dispatch(taskAdderAction(element))    
                });
                console.log(data)
            }
        }
        catch (error) {
            console.log(error)
        }
    }
// fetchData()
    useEffect(() => {
        if(!localStorage.getItem('isLoggedIn')) navigate('/login')
        
        if(!ignore){
        fetchData()
        ignore = true;
        }
        setName(localStorage.getItem('name'))
    },[])


    const taskAdder = async (e) => {
        e.preventDefault()


        try {
            const config = {
                headers: {
                    'Content-type': 'application/json'
                }
            }
            // const name = localStorage.getItem('name')
            // console.log(name)
            const { data } = await axios.post('http://localhost:5000/api/tasks/add', {
                name,
                taskString
            }, config)
            // console.log(data)
            if (data) {
                console.log('data shud be added')
                // setTasks(data)
                dispatch(taskAdderAction(taskString))
                window.localStorage.setItem('state' , JSON.stringify(tasks))
                // fetchData()

                console.log(tasks)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

   async function deleteTaskHandler (e, taskString){
        e.preventDefault()
        // const taskString = tasks[taskindex]
        console.log(taskString)

        try {
            const config = {
                headers: {
                    'Content-type': 'application/json'
                }
            }
            const name = localStorage.getItem('name')
            console.log(name)
            const { data } = await axios.delete(`http://localhost:5000/api/tasks/delete/${name}/${taskString}`)
            // console.log(data)
            if (data) {
                console.log('data shud be deleted')
                // setTasks(data)
                // fetchData()
                dispatch(taskRemoverAction(taskString))
                console.log(data)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className='Heading'> TO-DO-NOW</div>
            <hr />

            <Container>

                <div class="input-group mb-3" className='newtaskgroup'>
                    <input type="text" class="form-control" value={taskString} onChange={(e) => setTaskString(e.target.value)} placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2" />
                    <button class="btn  addtaskbtn" type="button" id="button-addon2" onClick={taskAdder}>Button</button>
                </div>

                {
                   tasks && tasks.map((todocurr , index) => {
                        // console.log("hi");
                        return <div className='tasks'>
                            <Card style={{ width: '50rem' }}>
                                <Card.Body>
                                    <div style={{ display: 'flex' }} >
                                        <div>
                                            <Card.Title>{todocurr.taskString}</Card.Title>
                                        </div>

                                        <Button variant='danger' className='deletebtn' onClick={ e => deleteTaskHandler(e, todocurr.taskString) }>
                                            Delete Task
                                        </Button>
                                    </div>

                                </Card.Body>
                            </Card>
                        </div>
                    })
                }


            </Container>
        </>
    )
}
