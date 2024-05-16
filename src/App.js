import Menu from './Components/Menu';
import {
  BrowserRouter as Router
} from "react-router-dom"
import Public from './Routes/Public';
import AuthProvider from './Context/AuthProvider';
import { Container } from 'react-bootstrap';


function App() {
    
  return (
        <Router>
          <AuthProvider>
            <Menu />
            <Container>
              <Public />
            </Container> 
          </AuthProvider>
        </Router>
  );

}

export default App;
