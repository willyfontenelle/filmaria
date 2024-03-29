
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import './favoritos.css';
import {toast} from 'react-toastify';

export default function Favoritos(){
    const [filmes, setFilmes] = useState([]);

    useEffect(()=>{
        const minhaLista = localStorage.getItem('filmes');
        setFilmes(JSON.parse(minhaLista) || []);
        
    }, []);

    function handleDelete(id){
        let filtroFilmes = filmes.filter((item)=>{
            return (item.id !== id)
        })

        setFilmes(filtroFilmes);
        localStorage.setItem('filmes', JSON.stringify(filtroFilmes))
        toast.success('Filme excluído com sucesso!');
    }

    return(
        <div id="meus-filmes">
            <h1>Meus Discos</h1>

            {filmes.length === 0 &&  <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center'}}><span>Você não possui nenhum disco salvo :(</span></div>}

            <ul>
                {filmes.map((item)=>{
                    return(
                        <li key={item.id}>
                            <span>{item.nome}</span>
                            <div>
                                <Link to={`/filme/${item.id}`}>Ver mais</Link>
                                <button onClick={() => handleDelete(item.id) }>Excluir</button>

                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}