import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import API from '../../services/connection';
import './styles.css';

export default function LandingPage(){
    const [nome, setNome] = useState("");
    const [content, setContent] = useState("");

    async function sendData(e){
        e.preventDefault();

        const response = await API.get(`/criar?conteudo=${content}&filename=${nome}`);
        console.log(response);
    }

    return (
        <div className="wrapDiv">
            <div></div>
            <section className="timelineSection">
                <div className="timeline">

                </div>
            </section>
        </div>
    );
}