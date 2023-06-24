import React, { useEffect } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import './LoginScreen.css'
import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import LogComponent from './LogComponent'
import HomeScreen from '../HomeScreen/HomeScreen'

export default function LoginScreen() {


    const navigate = useNavigate()

    useEffect(() => {
        if(localStorage.getItem('isLoggedIn')) navigate('/home' , <HomeScreen/>)
    },[])
    

    return (

        <>
               <LogComponent/>
           
            {/* <div>
                <h1 className='heading'> LOGIN </h1>
            </div>
            <div className='mt-3'>
                <Container>
                    <Form onSubmit={loginHandler}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                    <Row>
                        <Col>
                            New Customer? <Link to='/register'><span style={{ color: 'blue' }}>Register Here</span></Link></Col>
                    </Row>
                </Container>
            </div> */}

        </>
    )
}
