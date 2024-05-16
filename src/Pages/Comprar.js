import Card from 'react-bootstrap/Card'
import {CardGroup} from 'react-bootstrap'
import logook from '../compraok.png'
import AuthContext from '../Context/AuthContext';

const styles = {
    img:{
        width:'200px',
        margin: 'auto',
        display:'block'
    }
}

function Comprar(){
        return(
            <>
                <AuthContext.Consumer>
                    {
                        context =>
                                <CardGroup className="container">
                                    <Card  border="Success" style={{ width: '80rem' }}>
                                    <Card.Body>
                                        <Card.Title style={{textAlign: "center"}}>¡¡Muchas gracias por su compra {context?.userInfo?.name}!!</Card.Title>
                                        <img src={logook} alt="logo" style={styles.img} ></img>
                                    </Card.Body>
                                    </Card>
                                </CardGroup>

                    }
                </AuthContext.Consumer>
            </>
        )    
    
}

export default Comprar