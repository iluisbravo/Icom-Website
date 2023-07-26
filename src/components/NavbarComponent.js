
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Account from './AccountContext';
import { useHistory } from 'react-router-dom';

import {
    NavLink
} from "react-router-dom";

import styled from 'styled-components';
import AdministracionAdministracionUsuariosPage from '../pages/AdministracionUsuariosPage';
const Styles = styled.div`  
    .shNavbar{
        box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
    }

`;

const NavbarComponent = (props) => {
    const auth = props.auth;
    const user = auth.user;
    const history = useHistory();

    const logOut = () => {
        Account.logOut();
        auth.setUser(null);
        auth.setIsAuthenticated(false);
        history.push("/");
    }

    return (
        <>
            <Styles>
                <Navbar bg="light shNavbar" expand="lg">
                    <Container>
                        <Navbar.Brand as={NavLink} to="/Home">
                            <img
                                src="https://www.industrialcom.com.mx/wp-content/uploads/2020/04/icono-icom-e1586222698941.png"
                                alt="logo.img"
                                height="45"
                            />
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">

                                {
                                    (
                                        user.attributes.idTipoUsuario === "1" ||
                                        user.attributes.idTipoUsuario === "6ac08b11-215c-11ec-bc9f-0639eebd1841" ||
                                        user.attributes.idTipoUsuario === "2" ||
                                        user.attributes.idTipoUsuario === "6abb943c-215c-11ec-bc9f-0639eebd1841" ||
                                        user.attributes.idTipoUsuario === "3" ||
                                        user.attributes.idTipoUsuario === "6ab6120f-215c-11ec-bc9f-0639eebd1841"
                                    ) &&
                                    <Nav.Link as={NavLink} to="/Cotizaciones">Cotizaciones</Nav.Link>
                                }

                                {/* {
                                    (
                                        //user.attributes.idTipoUsuario === "2" ||
                                        //user.attributes.idTipoUsuario === "6abb943c-215c-11ec-bc9f-0639eebd1841" ||
                                        user.attributes.idTipoUsuario === "3" ||
                                        user.attributes.idTipoUsuario === "6ab6120f-215c-11ec-bc9f-0639eebd1841"
                                    ) &&
                                    <Nav.Link as={NavLink} to="/Autorizaciones" >Autorizaciones</Nav.Link>
                                } */}

                                {
                                    (
                                        user.attributes.idTipoUsuario === "3" ||
                                        user.attributes.idTipoUsuario === "6ab6120f-215c-11ec-bc9f-0639eebd1841"
                                    ) &&
                                    <>
                                        {/* <Nav.Link as={NavLink} to="/Seguimiento" >Seguimiento</Nav.Link> */}
                                        <Nav.Link as={NavLink} to="/Configuración" >Configuración</Nav.Link>
                                    </>
                                }


                            </Nav>
                            <Nav>
                                {/* <Nav.Link as={NavLink} to="/LogIn">LogIn</Nav.Link>
                                <Nav.Link as={NavLink} to="/Registro">Registro</Nav.Link>
                                <Nav.Link as={NavLink} to="/RecuperarContraseña">Recuperar Contraseña</Nav.Link> */}
                                <NavDropdown title={user.attributes.nombre} id="basic-nav-dropdown">
                                    {
                                        (
                                            user.attributes.idTipoUsuario === "1" ||
                                            user.attributes.idTipoUsuario === "6ac08b11-215c-11ec-bc9f-0639eebd1841" ||
                                            user.attributes.idTipoUsuario === "2" ||
                                            user.attributes.idTipoUsuario === "6abb943c-215c-11ec-bc9f-0639eebd1841" ||
                                            user.attributes.idTipoUsuario === "3" ||
                                            user.attributes.idTipoUsuario === "6ab6120f-215c-11ec-bc9f-0639eebd1841"
                                        ) &&
                                        <NavDropdown.Item as={NavLink} to="/Cotizaciones">Cotizaciones</NavDropdown.Item>
                                    }

                                    {/* {
                                        (
                                            //user.attributes.idTipoUsuario === "2" ||
                                            //user.attributes.idTipoUsuario === "6abb943c-215c-11ec-bc9f-0639eebd1841" ||
                                            user.attributes.idTipoUsuario === "3" ||
                                            user.attributes.idTipoUsuario === "6ab6120f-215c-11ec-bc9f-0639eebd1841"
                                        ) &&
                                        <NavDropdown.Item as={NavLink} to="/Autorizaciones">Autorizaciones</NavDropdown.Item>
                                    } */}

                                    {
                                        (
                                            user.attributes.idTipoUsuario === "3" ||
                                            user.attributes.idTipoUsuario === "6ab6120f-215c-11ec-bc9f-0639eebd1841"
                                        ) &&
                                        <>
                                            {/* <NavDropdown.Item as={NavLink} to="/Seguimiento">Seguimiento</NavDropdown.Item> */}
                                            <NavDropdown.Item as={NavLink} to="/Configuración">Configuración</NavDropdown.Item>
                                        </>

                                    }



                                    <NavDropdown.Divider />
                                    <NavDropdown.Item as={NavLink} to="/MiPerfil">Mi perfil</NavDropdown.Item>

                                    {
                                        (
                                            user.attributes.idTipoUsuario === "3" ||
                                            user.attributes.idTipoUsuario === "6ab6120f-215c-11ec-bc9f-0639eebd1841"
                                        ) &&
                                        <>
                                            <NavDropdown.Item as={NavLink} to="/AdministraciónUsuarios">Usuarios</NavDropdown.Item>
                                        </>
                                    }


                                    <NavDropdown.Item href="#" onClick={logOut}>Cerrar sesión</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>

                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </Styles>
        </>
    )
}

export default NavbarComponent;