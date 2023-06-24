import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'

export default function Header() {

    const navigate = useNavigate()

    const logoutHandler = () => {
        localStorage.removeItem('name')
        localStorage.removeItem('isLoggedIn')
        navigate('/')
    }


    return (

        <>
            <Navbar expand="lg" className="bg-body-tertiary" bg='primary'>
                <Container >
                    <Nav.Link >
                        <Link to='/mynotes' className='headName'>  Urgent Tasks</Link>
                    </Nav.Link>
                    {localStorage.getItem('isLoggedIn') !== null ? (
                        <NavDropdown title={localStorage.getItem('name')} id="navbarScrollingDropdown" className='headName'>
                            <NavDropdown.Item >My Profile</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={logoutHandler}>
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    ) :
                        (<></>)
                    }
                </Container>
            </Navbar>
        </>
    )
}
