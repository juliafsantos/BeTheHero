import React, {useState,useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../../services/api';
import logoImg from '../../assets/logo.svg';
import {MdPower} from 'react-icons/md'
import {MdDelete} from 'react-icons/md'

import './styles.css';

export default function Profile()
{
    const history = useHistory();
    const [incident, setIncident] = useState([]);
    const ongName = localStorage.getItem('ongName');
    const ongID = localStorage.getItem('ongID');
    
    useEffect(() => {
    api.get('profile',{
            headers:
            {
                Authorization: ongID,
            }
        }).then(response =>{
            setIncident(response.data);
        } )
    }, [ongID]);

    async function handleDeleteIncident(id){
        try {
            await api.delete(`incident/${id}`, {
                headers:
                {
                    Authorization: ongID,
                }
            }
            
            );
            alert('Caso deletado com sucesso!');
            setIncident(incident.filter(incident => incident.id !== id));
        } catch (error) {
            alert('Erro ao deletar! Tente Novamente!');
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }
    return(
        <div className="profile-container">
            <header>
            <img src={logoImg} alt="Be The Hero"/>
            <span> Bem vinda, {ongName}</span>
            
            <Link className="button" to="/incident/new">Cadastrar novo caso</Link> 
            <button onClick={handleLogout}>
            <MdPower size={18} color="#E02041"/>
            </button>
            </header>
            
            <h1> Casos Registrados</h1>

            <ul>
            {incident.map(incident => (

                <li key={incident.id}>
                <strong>CASO: </strong>
                <p>{incident.title}</p>

                <strong>DESCRIÇÃO: </strong>
                <p>{incident.description}</p>

                <strong>VALOR:</strong>
                <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                <MdDelete size={20} color="#a8a8b3"/>
                </button>

                </li>

            ))}
            </ul>

        </div>
    );
}