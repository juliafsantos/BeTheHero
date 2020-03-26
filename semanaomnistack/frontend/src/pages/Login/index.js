import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {MdInput} from 'react-icons/md'
import './styles.css';
import api from '../../services/api';
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default function Login()
{
    const [id, setID] = useState('');
    const history = useHistory();
    async function handleLogin(e){
        e.preventDefault();
        try {
            const response = await api.post('session', {id});
            localStorage.setItem('ongID', id);
            localStorage.setItem('ongName', response.data.name);
            history.push('/profile');
        } catch (error) {
            alert('Falha no login! Tente novamente!');
        }
    }
    return(
        <div className="login-container">
            <section className="form">
            <img src={logoImg} alt="Be The Hero"/>
                <form onSubmit={handleLogin}>
                   <h1>Faça seu login ;)</h1>
                   <input placeholder="Digite sua ID" value={id} onChange={e => setID(e.target.value)} />
                   <button className="button" type="submit">Entrar</button>

                   <Link className="back-link" to="/register">
                        <MdInput size={16} color="#E02041"/>
                        Não tenho cadastro :(
                    </Link> 
                </form>
            </section>
            <img src={heroesImg} alt="Heroes"/>
        </div>
    );
}