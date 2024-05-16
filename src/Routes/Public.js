import Home from '../Pages/Home'
import Ingreso from '../Pages/Ingreso'
import Registro from '../Pages/Registro'
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom"
import Detalle from '../Pages/Detalle';
import NotFound from '../Pages/NotFound';
import Comprar from '../Pages/Comprar'
import ProductosAlta from '../Pages/ProductosAlta';
import ProductosModificar from '../Pages/ProductosModificar';
import Productos from '../Components/Productos';
import AuthContext from '../Context/AuthContext';

function Public() {
  return (
      <AuthContext.Consumer>
        {
          
            context=>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/home' element={<Navigate to="/" />} />
                        {
                          !context.userLogin &&
                          <>
                            <Route path='/ingreso' element={<Ingreso />} />
                            <Route path='/registro' element={<Registro />} />
                          </>
                        }
                        {
                          context.userLogin &&
                          <>
                            <Route path='/productos/alta' element={<ProductosAlta />} />
                            <Route path='/productos/modificar/:id' element={<ProductosModificar />} />
                            <Route path='/comprar' element={<Comprar />} />
                           
                          </>
                        }
                          <Route path='/productos' element={<Productos />} />
                          <Route path='/producto/:id' element={<Detalle />} />
                          <Route path='*' element={<NotFound />} />
                        
                    </Routes>

        }
     
      </AuthContext.Consumer>
  );
}

export default Public;
