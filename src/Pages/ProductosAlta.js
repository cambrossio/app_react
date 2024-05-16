import {Button, Form, ProgressBar} from 'react-bootstrap';
import { useForm } from "react-hook-form";
import Input from "../Components/Input";
import firebase from '../Config/firebase';
import swal from 'sweetalert';
import React, {useState} from "react";

function ProductosAlta(){    
    const { register, setValue, handleSubmit,formState: { errors } } = useForm();
    const [url, setUrl]= useState("")
    const [disable, setDisable] = useState(false)
    const [disablen, setDisablen] = useState(true)
    const [uploadValue, setUploadValue] = useState(0)

    //da de alta un producto en firebase   
    const alta= async(data)=>{
        try{
            const documento = await firebase.db.collection("productos")
            .add({
                nombre:data.nombre,
                precio:data.precio,
                descripcion:data.descripcion,
                stock:data.stock,
                codigo:data.codigo,
                foto:url
            })
            swal ({
                title:"Producto",
                text: "Se cargo con exito!",
                icon: "success",
                button: "Aceptar"
            })
            
            //console.log("documento", documento)
            setDisable(true)
            setDisablen(false)
            setUploadValue(0)
            setValue("nombre", "")
            setValue("precio", "")
            setValue("descripcion", "")
            setValue("stock", "")
            setValue("codigo", "")
            document.querySelector('[data-label="image1"] img').src=""
        }catch(e){
            swal ({
                title:"Producto",
                text: "Ocurrio un error al cargar producto: "+ e,
                icon: "error",
                button: "Aceptar"
            })
            console.log("Error Carga Prod", e)
        }
    }

    //Sube imagen a firestorage y la muestra
    const handleUpload = async (e)=>{
        const archivo = e.target.files[0];
        const storageRef = firebase.storage().ref();
        const archivoPath = storageRef.child(archivo.name);
        await archivoPath.put(archivo);
        const enlaceUrl = await archivoPath.getDownloadURL();
        //console.log("enlace:", enlaceUrl);
        document.querySelector('[data-label="image1"] img').src = enlaceUrl
        setUrl(enlaceUrl)
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
                <div className="container">
                    <Form onSubmit={handleSubmit(alta)}> 
                        <Input label="Nombre" placeholder="Nombre" register={{...register("nombre",{requerid:true})}}/>
                        {errors.nombre && <span>El campo usuario es obligatorio</span>}
                        <Input label="Precio" type="number" placeholder="Precio" register={{...register("precio", {requerid:true})}} />
                        {errors.precio && <span>El campo contraseña es obligatorio</span>}
                        <Input label="Descripcion" placeholder="Descripcion" register={{...register("descripcion", {requerid:true})}} />
                        {errors.descripcion && <span>El campo contraseña es obligatorio</span>}
                        <Input label="Stock" type="number" placeholder="Stock" register={{...register("stock", {requerid:true})}} />
                        {errors.stock && <span>El campo stock es obligatorio</span>}
                        <Input label="Codigo" placeholder="Codigo" register={{...register("codigo", {requerid:true})}} />
                        {errors.codigo && <span>El campo codigo es obligatorio</span>}
                        <label>Imagen: </label>
                        <span> </span>
                        <input type="file" onChange={handleUpload} style={{width: '30%', marginBottom:'10px'}}/>
                        <div id="1" data-label="image1">
                        <ProgressBar now={uploadValue} max="100" label={`${uploadValue}%`} style={{width: '30%', marginBottom:'10px'}}/>
                        <span> </span>
                        <img id="photo" height="125" width="125" style={{ marginBottom:'10px'}} alt=""/>
                        </div>
                        <Button type="submit" disabled={disable} onClick={() => setDisable(false) || setDisablen(true)}>Guardar</Button>   
                        <span> </span>
                        <Button disabled={disablen} onClick={() => setDisablen(true) || setDisable(false)} variant="warning">Nuevo</Button>   
                    </Form>
                </div>
        )       
    }

export default ProductosAlta