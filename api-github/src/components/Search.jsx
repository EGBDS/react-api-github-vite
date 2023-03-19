import React, { useEffect, useState } from 'react'
import url_default from '../axios/axios'; //importando url padrao

import star from '../assets/star.png';
import book from '../assets/book.png';
import './Search.css';


const Search = ()  => {

    function first_page() {
        setPag(0);
    };
    
    function last_page() {
        var last = paginas[paginas.length - 1];
        setPag(last);
    };

    function any_page() {
        var page = document.querySelectorAll('button').forEach ( function(button) {
            button.addEventListener('click', function(event) {
                const el = event.target;
                const id = el.id;
                console.log(id);
                return id;
            });
        })
        console.log(page)
        /* setPag(page); */
    }

    const [ qtd, setQtd ] = useState(0);

    const [ dados, setDatos ] = useState([]); //usestate recebe um array

    const [ repo, setRepo ] = useState(''); //nome do repositorio

    const [ pag, setPag ] = useState(0);

    const getdados = async () => { // funcao assincrona
        try { 
            const resposta = await url_default.get(repo+`/page=${pag}`); //tentando fazer a requisição
            const dado = resposta.data.items;
            const quant =  resposta.data.total_count;

            setQtd(quant);
            setDatos(dado);
            console.log(quant)
            console.log(dado);
            console.log(repo);
            console.log(pag)
        } catch(error) {
            console.log(error);

            if( repo != '') { 
                alert("Há algo de errado com a API. Recarregue a página. Se não funcionar tente outra hora, ou entre em contato com os desenvolvedores!"+error)
            };
        }
        
    };


    function paginas() {

        let pages = [];
        /* console.log(pages) */
        for (let i = 0; i < (qtd/30); i++){
            pages.push(
            <button key={i.toString()} id={i.toString()} onClick={any_page}>{i}</button>
            );
        }

        return pages;
       
    };

    useEffect(() => {
        getdados();
    },[pag])

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
            <a href="#header">
                <button onClick={ first_page }>First</button>
            </a>
            {paginas().slice(5, 10)}
            <a href="#header">
                <button onClick={ last_page }>Last</button>
            </a>
        </div>
    </div>
  )
}

export default Search;