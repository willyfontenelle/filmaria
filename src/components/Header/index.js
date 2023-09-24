import './header.css';
import { Link } from 'react-router-dom';

export default function Header(){
    return(
        <header>
            <Link className="logo" to="/" >Meus discos favoritos</Link>
            <Link className="favoritos" to="/favoritos" >Ver salvos</Link>
        </header>
    )
}