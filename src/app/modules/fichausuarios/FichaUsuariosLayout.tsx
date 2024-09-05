import { Nav, Navbar } from 'react-bootstrap';
import {Outlet, Link} from 'react-router-dom'
import { toAbsoluteUrl } from '../../../_zeus/helpers';
const FichaUsuarioLayout = () => {
    return(
        
        <div className=''>
            <div>
                <h1>Ficha usuario layoutsds</h1>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    );
}

export {FichaUsuarioLayout}