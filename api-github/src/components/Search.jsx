import React, { useEffect, useState } from 'react'
import url_default from '../axios/axios'; //importando url padrao



const Search = ()  => {

    const [ dados, setDatos ] = useState([]); //usestate recebe um array

    const [ repo, setRepo ] = useState(''); //nome do repositorio

    const getdados = async () => { // funcao assincrona
        
        try { 
            <p>Carregando</p>
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
    <div>Search
        <form onSubmit={(e) => {e.preventDefault()}}>
            <input type='text' placeholder='Digite Aqui' onChange={(e) => setRepo(e.target.value)}/>
            <button type='submit' value='buscar' onClick={getdados}>Buscar</button>
        </form>
        <div>
            {(dados.map((dados) => (
                <div key={dados.id}>
                    <h2><a href={dados.svn_url}>{dados.name}</a></h2>
                    <p>{dados.description}</p>
                </div>
            )))}
        </div>
    </div>
  )
}

export default Search;