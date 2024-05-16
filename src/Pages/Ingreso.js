import {Form} from 'react-bootstrap'
import { useForm } from "react-hook-form";
import Input from "../Components/Input";
import firebase from '../Config/firebase'
import swal from 'sweetalert';
import { Link, useNavigate } from 'react-router-dom';
import {useState, useContext} from 'react'
import Buttons from '../Components/Buttons'
import {loginMessage} from '../Utils/errorMessage'
import AuthContext from '../Context/AuthContext';

function Ingreso(){    
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const [loading,setLoading]=useState(false)  
    const context = useContext(AuthContext)

    const login= async(data)=>{
        try{
            //chequea que usuario y password sean correctos
            setLoading(true)
            const responseUser = await firebase.auth.signInWithEmailAndPassword(data.email,data.contraseña)
            console.log("responseUser", responseUser)
            if(responseUser.user.uid && responseUser.user.emailVerified ){
                    const UserInfo= await firebase.db.collection("usuarios")
                    .where("userId","==",responseUser.user.uid)
                    .get()
                    if(UserInfo){
                        //const nombre = UserInfo.docs[0]?.data().name
                        //console.log("nombre", nombre)          
                        context.loginUser(UserInfo.docs[0]?.data())
                        navigate("/")
                    }
            } 
            else{
                swal ({
                    title:"Email No Verificado",
                    text: "Desea enviar nuevamente el email de validacion?",
                    icon: "error",
                    buttons: true
                })
                .then((willDelete) => {
                    if (willDelete) {
                      swal("Email enviado nuevamante a su casilla de correo, verifique por favor!", 
                      {
                        icon: "success",
                        button: "Aceptar"
                      });
                      responseUser.user.sendEmailVerification();                  
                    } 
                  });
                  
                setLoading(false)
            }
        }catch(e){
            
            swal ({
                title:"Login",
                text: loginMessage[e.code] || "Ha ocurrido un error",
                icon: "error",
                button: "Aceptar"
            })
            setLoading(false)
        }
    }
     
        return(
            <>
                <Form onSubmit={handleSubmit(login)}>
                    <div className="container">
                    <Input label="Email" placeholder="Email" register={{...register("email", {requerid:true})}}/>
                     {errors.usuario && <span>El campo usuario es obligatorio</span>}
                     <Input label="Contraseña" type="password" placeholder="Contraseña" register={{...register("contraseña", {requerid:true})}} />
                     {errors.contraseña && <span>El campo contraseña es obligatorio</span>}
                     <Buttons loading={loading}>
                         Ingresar
                     </Buttons>
                         
                     <h6> No esta registrado? <span><Link to="/registro">
                            Registrarse</Link>
                     </span></h6>
                     
                    </div>
                </Form>
            </>
        )    
}

export default Ingreso