import React from "react"
import {Button,Spinner} from 'react-bootstrap'

function Buttons(props){
    const {variant,type,loading} = props    
    return(
        <Button 
            type={type || "submit"} 
            variant={variant || "primary"} 
            disabled={loading} 
        >
            {
                loading &&
                <Spinner animation="border" size="sm" />
                
            }
            {props.children}
           
        </Button>
     
    )
    
}
export default Buttons;
