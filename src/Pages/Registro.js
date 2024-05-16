import React,{useState} from "react"
import {Form} from 'react-bootstrap'
import { useForm} from "react-hook-form";
import Input from "../Components/Input";
import firebase from '../Config/firebase'
import swal from 'sweetalert';
import Buttons from '../Components/Buttons'
import { useNavigate } from 'react-router-dom';

function Registro (){
   const { register,setValue, handleSubmit, formState: { errors } } = useForm();
   const [loading,setLoading]=useState(false)
   const navigate = useNavigate()
    
   const registrame= async (data)=>{   
     if (data.contraseña===data.rcontraseña){
        try{
           //registra usuario con email y contraseña
           const responseUser = await firebase.auth.createUserWithEmailAndPassword(data.email,data.contraseña)
           //envia email de verificacion de cuenta
           responseUser.user.sendEmailVerification();                  
           //guarda resto de datos del usuario en BD
           if(responseUser.user.uid){
               const document = await firebase.db.collection("usuarios")
               .add({
                     name:data.nombre,
                     lastname:data.apellido, 
                     userId:responseUser.user.uid
               })
               //console.log("document", document)
               setLoading(true)
               swal ({
                  title:"Usuario",
                  text: "Se registro a " + data.nombre + " con exito " +
                  "verifique su casilla de correo, se envio email de validacion!",
                  icon: "success",
                  button: "Aceptar"
              })
              firebase.auth.signOut();
              setValue("nombre", "")
              setValue("apellido", "")
              setValue("email", "")
              setValue("contraseña", "")
              setValue("rcontraseña", "")
              navigate("/")
           }
        }catch(e){
               swal ({
                  title:"Usuario",
                  text: "Ocurrio un error al querer registrar su usuario: " + e,
                  icon: "error",
                  button: "Aceptar"
            })
           
           setLoading(false)
        }
      }else{
         swal ({
            title:"Usuario",
            text: "Las contraseña no coinciden",
            icon: "error",
            button: "Aceptar"
      })
      }
   }

     return(
            <>  
               <Form onSubmit={handleSubmit(registrame)}>
                  <div className="container"> 
                  
                     <Input label="Nombre" placeholder="Nombre" register={{...register("nombre", {requerid:true})}} />
                     {errors.nombre && <span>El campo nombre es obligatorio</span>}
                     <Input label="Apellido" placeholder="Apellido" register={{...register("apellido", {requerid:true})}} />
                     {errors.apellido && <span>El campo apellido es obligatorio</span>}
                     <Input label="Email" placeholder="Email" register={{...register("email", {requerid:true})}} />
                     {errors.usuario && <span>El campo usuario es obligatorio</span>}
                     <Input label="Contraseña" type="password" placeholder="Contraseña" register={{...register("contraseña", {requerid:true})}} />
                     {errors.contraseña && <span>El campo contraseña es obligatorio</span>}
                     <Input label="Repita Contraseña" type="password" placeholder="Repita contraseña" register={{...register("rcontraseña", {requerid:true})}} />
                     {errors.rcontraseña && <span>El campo contraseña es obligatorio</span>}
                     <Form.Group>
                     <div>
                     <Buttons loading={loading}>
                         Registrar
                     </Buttons>   
                     </div>
                     </Form.Group>
                  </div>
                  
                </Form>         
            </>
        )    
    
}

export default Registro