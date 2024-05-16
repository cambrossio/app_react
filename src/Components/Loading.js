import {Button, CardGroup, Spinner, Card} from 'react-bootstrap'

function Loading(props){
    const {loading,children} = props
   
    if(loading){
                return(
                        <>
                            <CardGroup className="container">
                                <Card  border="Success" style={{ width: '80rem' }}>
                                <Card.Body>
                                    <Card.Header as="h3" style={{textAlign: "center"}}>Tienda - eCommerce!</Card.Header>                   
                                    <Button variant="secondary" disabled>
                                        <Spinner   
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        />
                                        Cargando...
                                    </Button>
                                    </Card.Body>
                                </Card>
                            </CardGroup>
                        </>
                )
    }else{
            return(
                    <>
                    {children}
                    </>
                  )
    }
}
export default Loading