import {useParams} from "react-router-dom"
import React, {useEffect, useState} from "react";
import {getIdProductos} from "../Service/ProductoService"
import Table from 'react-bootstrap/Table'
import {Button} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card'
import {CardGroup} from 'react-bootstrap'
import Loading from "../Components/Loading";
import AuthContext from '../Context/AuthContext';

const styles = {
    img:{
        width:'100px',
        margin: 'auto',
        
    }
}

function Detalle(){
    const {id}= useParams()
    const [producto, setProducto] = useState({})
    const [loading, setLoading] = useState(true)
        

    useEffect(
        ()=>{
            const request = async ()=>{
                try{
                    setLoading(true)
                    const data = await getIdProductos(id)
                    setProducto(data.data())
                    setLoading(false)
                  
                }catch(error){
                    console.log(error)
                    setLoading(false)
                }
            }
         request()
        },
        [id]
    )

        return(
                <Loading loading={loading}>
                    <div>
                    <AuthContext.Consumer>
                        {
                            context=>
                                    <CardGroup className="container">
                                        <Table>
                                            <Card  border="Success" style={{ width: 'auto' }}>
                                                <Card.Body>
                                                        <Card.Title style={{textAlign: "center"}}>{producto?.nombre}</Card.Title>
                                                        <p>Precio: $ {producto?.precio}</p>
                                                        <p>Descripcion: {producto?.descripcion}</p>
                                                        <p>Stock: {producto?.stock}</p>
                                                        <p>Codigo: {producto?.codigo}</p>
                                                        {false && producto.pictures.map(picture=><img src={picture.url} style={styles.img} alt="" />)}
                                                </Card.Body>
                                                {
                                                    context.userLogin &&
                                                    <Button variant="warning" as={Link} to="/comprar"> Comprar </Button>
                                                }
                                            </Card>
                                        </Table>
                                    </CardGroup>

                        }
                    </AuthContext.Consumer>
                        </div>
                </Loading>
        )

}

export default Detalle