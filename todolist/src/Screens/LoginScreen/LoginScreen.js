import React, { useEffect } from 'react'
import './LoginScreen.css'
import { useNavigate } from 'react-router-dom'
import LogComponent from './LogComponent'
import HomeScreen from '../HomeScreen/HomeScreen'

export default function LoginScreen() {


    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('isLoggedIn')) navigate('/home', <HomeScreen />)
    }, [])


    return (

        <>
            <LogComponent />
        </>
    )
}
