import {Button, Form, Card, ProgressBar} from 'react-bootstrap'
import { useForm } from "react-hook-form";
import Input from "../Components/Input";
import {useParams} from 'react-router-dom'
import {del, getIdProductos, update} from '../Service/ProductoService'
import React,{ useEffect, useState } from 'react';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import firebase from '../Config/firebase';

const styles = {
    img:{
        width:'100px',
        margin: 'auto'
    }
}

function ProductosModificar(){    
    const { register, setValue ,handleSubmit, formState: { errors } } = useForm();
    const {id}= useParams()
    const [disable, setDisable] = useState(false)
    const [fotos, setFotos]=useState('')
    const navigate = useNavigate()
    //const [url, setUrl]= useState("")
    const [uploadValue, setUploadValue] = useState(0)

    useEffect(
        ()=>{
            const request = async ()=>{
                try{
                    const response = await getIdProductos(id)
                    setValue("nombre", response.data().nombre)
                    setValue("precio", response.data().precio)
                    setValue("descripcion", response.data().descripcion)
                    setValue("stock", response.data().stock)
                    setValue("codigo", response.data().codigo)
                    setValue("foto", response.data().foto)
                    setFotos(response.data().foto)
           
                }catch(e){
                    console.log("Error Modifica",e)
                }

            }
            request()
        },
        [id, setValue]
    )

    const eliminar = async()=>{
        const document = await del(id)
        swal ({
            title:"Producto",
            text: "Se Elimino el producto",
            icon: "warning",
            button: "Aceptar"
        })
        setValue("nombre", "")
        setValue("precio", "")
        setValue("descripcion", "")
        setValue("stock", "")
        setValue("codigo", "")
        setValue("foto", "")
        document.getElementById("photo").src=""
        setDisable(true)
    }
    
    const modifica= async(data)=>{
        try{
            
            const document = await update(id,data)
            swal ({
                title:"Producto",
                text: "Se Actualizo el producto",
                icon: "success",
                button: false,
                timer: 1500
            })
            navigate("/")
        }catch(e){
            console.log("Error Login", e)
        }
    }
     

    const handleUpload = async (e)=>{
        const archivo = e.target.files[0];
        const storageRef = firebase.storage().ref();
        const archivoPath = storageRef.child(archivo.name);
        await archivoPath.put(archivo);
        const enlaceUrl = await archivoPath.getDownloadURL();
        //console.log("enlace:", enlaceUrl);
        document.querySelector('[data-label="imagenew"] img').src = enlaceUrl
        document.getElementById('foto').value= enlaceUrl
        //setUrl(enlaceUrl)
        const task = archivoPath.put(archivo);
        task.on('state_changed', (snapshot) => {
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            setUploadValue(percentage)
          }, (error) => {
            console.error(error.message)
          }
        )
    }

    return(
            <>
                <div className="container">
                      
                    <Form onSubmit={handleSubmit(modifica)}>
                        
                        <Input label="Nombre" placeholder="Nombre" register={{...register("nombre", {requerid:true})}} />
                        {errors.usuario && <span>El campo usuario es obligatorio</span>}
                        <Input label="Precio" type="number" placeholder="Precio" register={{...register("precio", {requerid:true})}} />
                        {errors.contraseña && <span>El campo contraseña es obligatorio</span>}
                        <Input label="Descripcion" placeholder="Descripcion" register={{...register("descripcion", {requerid:true})}} />
                        {errors.contraseña && <span>El campo contraseña es obligatorio</span>}
                        <Input label="Stock" type="number" placeholder="Stock" register={{...register("stock", {requerid:true})}} />
                        {errors.stock && <span>El campo stock es obligatorio</span>}
                        <Input label="Codigo" placeholder="Codigo" register={{...register("codigo", {requerid:true})}} />
                        {errors.codigo && <span>El campo codigo es obligatorio</span>}
                        <Input id="foto" label="Foto actual"  register={{...register("foto", {requerid:true})}} />
                        <Card.Img id="photo" src={fotos} style={styles.img} />
                        
                        <div id="1" data-label="imagenew">
                            <input type="file" onChange={handleUpload} style={{width: '30%', marginBottom:'10px'}}/>
                            <ProgressBar now={uploadValue} max="100" label={`${uploadValue}%`} style={{width: '30%', marginBottom:'10px'}}/>
                            <label>Foto Nueva </label>
                            <span> </span>
                            <img id="photonew" height="125" width="125" style={{ marginBottom:'10px'}} alt=""/>
                        </div>

                        <div> 
                            <Button disabled={disable} type="submit" variant="warning">Guardar</Button>  
                            <span>          </span>
                            <Button disabled={disable} variant="danger" onClick={eliminar}>Eliminar</Button> 
                        </div>
                        
                    </Form>
                        
                </div>
            </>
        )    
}

export default ProductosModificar