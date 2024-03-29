import { useEffect, useState } from 'react';
import './filme-info.css';
import { useParams, useHistory } from 'react-router-dom';
import api from '../../services/api';
import { toast } from 'react-toastify';

export default function Filme(){
    const { id } = useParams();
    const history = useHistory();

    const [filme, setFilme] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{

        async function loadFilme(){
            const response = await api.get(`albums/${id}`);
            
            if(response.data.length === 0){
                //Tentou acessar com um ID que não existe, navego ele para home
                history.replace('/');
                return;
            }

            setFilme(response.data);
            setLoading(false);
        
        }
        loadFilme();

        return () => {
            console.log('COMPONENTE DESMONTADO')
        }

    }, [history, id]);

    function salvaFilme(){
        const minhaLista = localStorage.getItem('filmes');

        let filmesSalvos = JSON.parse(minhaLista) || [];

        //Se tiver algum filme salvo com esse mesmo id precisa irgnorar
        const hasFilme = filmesSalvos.some( (filmeSalvo) => filmeSalvo.id === filme.id )
        
        if(hasFilme){
            toast.error('Você já possui esse disco salvo.');
            return;
            //Para a execução do código aqui
        }

        filmesSalvos.push(filme);
        localStorage.setItem('filmes', JSON.stringify(filmesSalvos));
        toast.success('Disco salvo com sucesso!');
    }

    if(loading){
        return(
            <div className="filme-info">
            <h3>Carregando seu disco...</h3>
            </div>
        )
    }

    return(
        <div className="filme-info">
            <h1> {filme.nome} </h1>
            <img src={filme.foto} alt={filme.nome} />
            Released: {filme.description}
            <div>
                <button onClick={ salvaFilme }>Salvar</button>
                <button>
                    <a target="blank" href={`${filme.link}`}>
                        Listen on Spotify
                    </a>
                </button>
            </div>

        </div>
    )
}