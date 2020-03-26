import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import {MdArrowBack} from 'react-icons/md'
import api from '../../services/api';

import './styles.css';

export default function NewIncident()
{
    const history = useHistory();
    const ongID = localStorage.getItem('ongID');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    async function handleNewIncident(e){ 
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        };

        try {
            await api.post('incident', data, {
                headers: {
                    Authorization: ongID,
                }
            })

            history.push('/profile');
        } catch (error) {
            alert('Erro ao cadastrar o novo caso, tente novamente!')
        }
    }
    return(

        <div className="new-incident-container">

          <div className="content">
               <section>
               <img src={logoImg} alt="Be The Hero"/>
               <h1>Cadastrar Novo Caso</h1>
               <p>Descreva o caso detalhadamento para encontrar um "heroe" para resolver isso.</p>
               
               <Link className="back-link" to="/profile">
                        <MdArrowBack size={16} color="#E02041"/>
                        Voltar para o perfil
                    </Link> 
               </section>

               <form action="">
                <input 
                value= {title} onChange={e => setTitle(e.target.value)} placeholder="Título do Caso"/>
                <textarea 
                value= {description} onChange={e => setDescription(e.target.value)} placeholder="Descrição"/>
                <input 
                value= {value} onChange={e => setValue(e.target.value)} placeholder="Valor (R$)"/>

                <button onClick={handleNewIncident} className="button" type="submit">Cadastrar</button>

               </form>
           </div>
        </div>
    );
}