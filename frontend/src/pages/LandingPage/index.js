import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import API from '../../services/connection';

export default function LandingPage(){
    const [nome, setNome] = useState("");
    const [content, setContent] = useState("");

    async function sendData(e){
        e.preventDefault();

        window.open(`localhost:3333/criar?conteudo=${content}&filename=${nome}`);
    }

    return (
        <div>
            <form onSubmit={sendData}>
                <input value={nome} onInput={e => {setNome(e.target.value)}} placeholder="Nome"/>
                <input value={content} onInput={e => {setContent(e.target.value)}} placeholder="Conteúdo"/>
                <button type="submit">Baixar</button>
            </form>
        </div>
    );
}