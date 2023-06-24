import React from 'react'
import {Link} from 'react-router-dom'
import { Container , Button , Row , Col } from 'react-bootstrap'
import './LandingScreen.css'

export default function LandingScreen() {
    return (
        <div className='main'>
            <Container>
                <Row>
                    <div>
                    <img src="../../background1.jpg" alt="" />
                    </div>
                    <div className='introtext'>
                        <div>
                            <h1 className='title'>Welcome to "To Do"</h1>
                            <p className='subtitle'>One Stop to manage all your Tasks</p>
                        </div>
                        <div className='buttonContainer'>
                            <Link to='/login'>
                                <Button size='lg' className='landbutton'>
                                    Login
                                </Button>
                            </Link>
                            <Link to='/register'>
                                <Button size='lg' className='landbutton' variant='outline-primary'>
                                    Signup
                                </Button>
                            </Link>
                        </div>
                    </div>

                </Row>

            </Container>

        </div>
    )
}
