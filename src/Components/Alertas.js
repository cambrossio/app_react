import Alert from 'react-bootstrap/Alert';

function Alertas(props){
    const {variant,text} = props
   
   return(
            <Alert variant={variant}>
                {text}
            </Alert>
        )
}

export default Alertas;