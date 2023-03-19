import React, { useEffect, useState } from 'react'
import url_default from '../axios/axios'; //importando url padrao

import star from '../assets/star.png';
import book from '../assets/book.png';
import './Search.css';

const Search = ()  => {

    const [ qtd, setQtd ] = useState(0);

    const [ dados, setDatos ] = useState([]); //usestate recebe um array

    const [ repo, setRepo ] = useState(''); //nome do repositorio

    const [ pag, setPag ] = useState(1);

    const getdados = async () => { // funcao assincrona
        <p>Carregando...</p>
        try { 
            const resposta = await url_default.get(repo+`/page=${pag}`); //tentando fazer a requisição
            const dado = resposta.data.items;
            const quant =  resposta.data.total_count;

            setQtd(quant);
            setDatos(dado);
            console.log(quant)
            console.log(dado);
            console.log(repo);
        } catch(error) {
            console.log(error);

            if( repo != '') { 
                alert("Há algo de errado com a API. Recarregue a página. Se não funcionar tente outra hora, ou entre em contato com os desenvolvedores!"+error)
            };
        }
        

    };
    

    function paginas() {

        let pages = [];

        for (let i = 0; i < (qtd/30); i++){
            pages.push(i);
        }

        return pages
       
    };

    
    

  return (
    <div className='search'>
        <form onSubmit={(e) => {e.preventDefault()}}>
            <input type='text' id='repository' placeholder='Digite Aqui' onChange={(e) => setRepo(e.target.value)}/>
            <button type='submit' id='btn' value='buscar' onClick={getdados}>Buscar</button>
        </form>
        <div className='qtd'>
            <h2>Quantidade de repositórios: {qtd.toLocaleString()}</h2> {/* tolocalestring faz com que o número tenha pontos para diferenciar de dezena, centena e etc... */}
        </div>
        <div>
            {(dados.map((dados) => (
                
                <div key={dados.id} className='dados'>
                    <h2 className='repository_img'>
                        <a href={dados.svn_url} target='_blank'>
                            <img src={ book }></img>
                            {dados.name}
                        </a>
                    </h2>
                    <p className='description'>Descrição: {dados.description}</p>
                    <p className='language'>Linguagem: {dados.language}</p>
                    <div className='container_star'>
                        <img src={ star }></img>
                        <p className='star'>{dados.stargazers_count.toLocaleString()}</p>
                        <p>Última Atualização: {dados.updated_at.replace("-", "/").replace("-", "/").substring(0, 10).split('/').reverse().join('/')}</p>
                    </div>
                </div>
            )))}
        </div>
        <div>
            {paginas()}
        </div>
    </div>
  )
}

export default Search;