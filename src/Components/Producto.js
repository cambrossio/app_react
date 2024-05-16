import { Link } from 'react-router-dom';
import { Button, Col } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import AuthContext from '../Context/AuthContext';

const styles = {
    img:{
        width:'100px',
        margin: 'auto',
        display:'block'
    }
}


function Producto(props){
    const{nombre,precio,foto,id}=props
    return(
        <AuthContext.Consumer>
            {
                context=>
                    <Col>
                    
                        <Card  border="warning" style={{ width: '18rem', minHeight: '250px', marginBottom:'10px'}}>  
                            <Card.Img src={foto} style={styles.img} />
                            <Card.Body>
                                    <Card.Title>{nombre}</Card.Title>
                                    <Card.Title>$ {precio}</Card.Title>          
                                    <Button variant="warning" as={Link} to={'/producto/'+id}> Detalles </Button>
                                    <span> </span>  
                                    {
                                        context.userLogin &&
                                        <Button variant="warning" as={Link} to={'productos/modificar/'+id}> Modificar </Button>
                                    }
                            </Card.Body>              
                        </Card>
                    
                    </Col>
            }              
        </AuthContext.Consumer>
    )

}

export default Producto