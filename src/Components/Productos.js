import React, {useEffect, useState} from "react";
import Producto from '../Components/Producto';
import {getAllProductos} from '../Service/ProductoService'
import Card from 'react-bootstrap/Card'
import { CardGroup, Row,Form } from 'react-bootstrap'
import Loading from "./Loading";
import logook from '../busca.jpg'

const styles = {
    img:{
        width:'auto',
        margin: '1%'
    }
}

function Productos(){
    const [listadoProductos, setListadoProductos]=useState([])
    const [titulo]=useState('Listado de Productos')
    const [loading, setLoading]=useState(true)
    const [buscar, setBuscar]=useState('')
   
    useEffect(
        ()=>{
             const request = async ()=>{
                    try{
                        setLoading(true)
                        const data = await getAllProductos(buscar)
                        setListadoProductos(data)
                        setLoading(false)
                 
                    }catch(error){
                        console.log(error)
                        setLoading(false)
                    }
                }
            request()
        },
        [buscar]
    
    )

    const HandleBuscar=(event)=>{
        const resul = event.target.value
        setBuscar(resul)
    }
  
    return(
           <>    
           <CardGroup className="container">
           <img src={logook} alt="logo" style={styles.img} ></img>
                    <Card.Body>   
                        <Form.Control
                                type="text"                 
                                value={buscar}
                                onChange={HandleBuscar}
                                placeholder="Buscar"
                                style={{width:'auto', margin:'1%'}}
                        />    
            
                    </Card.Body>    
            </CardGroup>  

            <Loading loading={loading}>
                 <div>
                      <CardGroup className="container">
                        <Card  border="Success" style={{ width: '18rem', marginBottom:'10px' }}>
                            <Card.Body> 
                                <Card.Header as="h5" style={{textAlign: "center"}}>{titulo}</Card.Header > 
                                <Row>
                                    {listadoProductos.map(listadoProducto=><Producto key={listadoProducto.id} nombre={listadoProducto.data().nombre} precio={listadoProducto.data().precio} stock={listadoProducto.data().stock} codigo={listadoProducto.data().codigo} foto={listadoProducto.data().foto} id={listadoProducto.id}/>)}
                                </Row>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                    </div>
            </Loading>
        </>
    )  
}

export default Productos