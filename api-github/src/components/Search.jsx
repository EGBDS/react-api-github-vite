import React, { useEffect, useState } from 'react'
import url_default from '../axios/axios'; //importando url padrao

import './Search.css';

const Search = ()  => {

    const [ dados, setDatos ] = useState([]); //usestate recebe um array

    const [ repo, setRepo ] = useState(''); //nome do repositorio

    const getdados = async () => { // funcao assincrona
        <p>Carregando...</p>
        try { 
            const resposta = await url_default.get(repo); //tentando fazer a requisição
            const dado = resposta.data.items;
            setDatos(dado);
            console.log(dado);
            console.log(repo);
        } catch(error) {
            console.log(error);
            if( repo != '') { 
                alert("Há algo de errado com a API. Recarregue a página. Se não funcionar tente outra hora, ou entre em contato com os desenvolvedores!"+error)
            };
        }
    };


  return (
    <div className='search'>
        <form onSubmit={(e) => {e.preventDefault()}}>
            <input type='text' id='repository' placeholder='Digite Aqui' onChange={(e) => setRepo(e.target.value)}/>
            <button type='submit' id='btn' value='buscar' onClick={getdados}>Buscar</button>
        </form>
        <div>
            {(dados.map((dados) => (
                <div key={dados.id} className='dados'>
                    <h2 className='title'>
                        <a href={dados.svn_url}>{dados.name}</a>
                    </h2>
                    <p className='description'>{dados.description}</p>
                    <p className='language'>{dados.language}</p>
                    <p className='star'>{dados.stargazers_count}</p>
                    <p className='topics'>{dados.topics}</p>
                </div>
            )))}
        </div>
    </div>
  )
}

export default Search;