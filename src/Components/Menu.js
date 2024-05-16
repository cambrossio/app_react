
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown,Badge } from 'react-bootstrap'
import AuthContext from '../Context/AuthContext';

function Menu(){

    return(
            <div className='container'>
                <AuthContext.Consumer>
                    {
                        context=>
                            <Navbar bg="light" collapseOnSelect expand='lg'>
                    
                                <Navbar.Brand href="/home" >
                                    <img src="logo.png" style={{width:50, marginTop: -5, marginLeft:'20px'}} alt="" />
                                </Navbar.Brand>
                                <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                                <Navbar.Collapse>
                                    <Nav className="me-auto">
                                    <Nav.Link as={Link} to="/">Home </Nav.Link>       
                                    {!context.userLogin &&
                                        <>
                                        <Nav.Link as={Link} to="/ingreso">Ingreso </Nav.Link>
                                        <Nav.Link as={Link} to="/registro"> Registro </Nav.Link>
                                        </>
                                    }
                                    {context.userLogin &&
                                        <>
                                            <NavDropdown title="Productos" id="basic-nav-dropdown">
                                                <NavDropdown.Item as={Link} to="/productos/alta">Alta</NavDropdown.Item>
                                            </NavDropdown>
                                            <Nav.Link onClick={context.logoutUser}> Salir </Nav.Link>
                                        </>
                                    }

                                    </Nav>
                                    
                                    {
                                        context.userLogin &&
                                        <> 
                                            <h4>
                                                <Badge bg="warning" text="dark" style={{width: 'auto', marginRight:'30px'}}>
                                                ¡ Hola {context?.userInfo?.name} ! 
                                                </Badge>                                            
                                            </h4>
                                        </>
                                    }
                                    
                                  
                                </Navbar.Collapse>
                            </Navbar>

                    }
                    
                </AuthContext.Consumer>
            </div>
    )

}

export default Menu