import {Form} from 'react-bootstrap'

function Input(props){
    const {label,type,placeholder,name,register, id} = props
   
    return(
            <>
                <Form.Group>
                    <label>{label}</label>
                    <Form.Control id={id || ''} type={type || "text"} name={name || ''} placeholder={placeholder} {...register} style={{width: '30%', marginBottom:'10px'}} />
                </Form.Group>
            </>
        )
}
export default Input