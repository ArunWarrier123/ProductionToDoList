import React, { useEffect, useState } from 'react'
import { Container, Card, Button } from 'react-bootstrap'
import "./HomeScreen.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'



export default function HomeScreen() {

    const [taskString, setTaskString] = useState("")
    const [name, setName] = useState(localStorage.getItem('name'))

    const navigate = useNavigate()
    let ignore = false

    //state management
    const dispatch = useDispatch()
    const Taskred = useSelector((state) => state.Taskred)
    let { tasks } = Taskred || {};

    //state action function for adding task
    const taskAdderAction = (taskString) => (dispatch, getState) => {
        const { Taskred: { tasks } } = getState();

        const hasToDo = tasks.find((i) => i.task === taskString);

        if (!hasToDo && taskString !== "") {
            dispatch({
                type: "ADD_TASK",
                payload: [{ id: taskString, taskString }, ...tasks]
            })
        }
    }


    //state function for deleting a task
    const taskRemoverAction = (taskString) => (dispatch, getState) => {
        const { Taskred: { tasks } } = getState()

        dispatch({
            type: "DELETE_TASK",
            payload: tasks.filter((t) => t.id !== taskString)
        })
    }


    const fetchData = async () => {
        try {

            const { data } = await axios.get(`https://finalproductiontodo.onrender.com/api/tasks/retrieve/${name}`)

            if (data) {
                tasks = null
                data.forEach(element => {
                    dispatch(taskAdderAction(element))
                });
            }
        }
        catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        if (!localStorage.getItem('isLoggedIn')) navigate('/login')

        if (!ignore) {
            fetchData()
            ignore = true;
        }
        setName(localStorage.getItem('name'))
    }, [])


    const taskAdder = async (e) => {
        e.preventDefault()


        try {
            const config = {
                headers: {
                    'Content-type': 'application/json'
                }
            }
            const { data } = await axios.post('https://finalproductiontodo.onrender.com/api/tasks/add', {
                name,
                taskString
            }, config)

            if (data) {
                dispatch(taskAdderAction(taskString))
                window.localStorage.setItem('state', JSON.stringify(tasks))
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    async function deleteTaskHandler(e, taskString) {
        e.preventDefault()

        try {
            const config = {
                headers: {
                    'Content-type': 'application/json'
                }
            }
            const name = localStorage.getItem('name')
            console.log(name)
            const { data } = await axios.delete(`https://finalproductiontodo.onrender.com/api/tasks/delete/${name}/${taskString}`)
            if (data) {
                console.log('data shud be deleted')
                dispatch(taskRemoverAction(taskString))
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

                <div className="input-group mb-3 newtaskgroup">
                    <input type="text" className="form-control" value={taskString} onChange={(e) => setTaskString(e.target.value)} placeholder="Enter a Task" aria-label="Enter a Task" aria-describedby="button-addon2" />
                    <button className="btn  addtaskbtn" type="button" id="button-addon2" onClick={taskAdder}>Button</button>
                </div>
                {
                    tasks && tasks.map((todocurr) => {
                        return <div className='tasks'>
                            <Card style={{ width: '50rem' }}>
                                <Card.Body>
                                    <div style={{ display: 'flex' }} >
                                        <div>
                                            <Card.Title>{todocurr.taskString}</Card.Title>
                                        </div>

                                        <Button variant='danger' className='deletebtn' onClick={e => deleteTaskHandler(e, todocurr.taskString)}>
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
