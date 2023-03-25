import React, { useEffect, useState, useRef } from 'react'
import url_default from '../axios/axios'; //importando url padrao

import star from '../assets/star.png';
import book from '../assets/book.png';
import './Search.css';


const Search = ()  => {

    const [ qtd, setQtd ] = useState(0);
    
    const [ dados, setDatos ] = useState([]); //usestate recebe um array

    const [ repo, setRepo ] = useState(''); //nome do repositorio

    const [ pag, setPag ] = useState(1);

    const [ pag_range_first, setPage_Range_First ] = useState(1);

    const [ pag_range_end, setPage_Range_End ] = useState(7);

    const getdados = async () => { // funcao assincrona
        try { 
            const resposta = await url_default.get(repo+`/page=${pag}`); //tentando fazer a requisição
            const dado = resposta.data.items;
            const quant =  resposta.data.total_count;

            if(qtd > quant) {
                setQtd(qtd);
            }
            else {
                setQtd(quant);
            };  
            setDatos(dado);
            console.log(dado);
        } catch(error) {
            console.log(error);

            if( repo != '') { 
                alert("Há algo de errado com a API. Recarregue a página. Se não funcionar tente outra hora, ou entre em contato com os desenvolvedores!"+error)
            };
        }
        
    };

    useEffect(() => {
        getdados();
    },[pag]);

    function paginas() {

        let pages = [];
        /* console.log(pages) */
        let a = 0;
        pages.unshift(
            <a href="#header" key={a.toString()}>
                <button onClick={ first_page }>First</button>
            </a>
        );
        for (let i = 1; i < (qtd/31); i++){
            pages.push(
            <a href="#header" key={i.toString()}>
                <button  id={i.toString()} onClick={any_page}>{i}</button>
            </a>
            );
            
            
        };
        pages.push(
            <a href="#header" key={last_page}>
                <button onClick={ last_page }>Last</button>
            </a>
        );
        return pages;
       
    };

    function first_page() {
        setPag(1);
        setPage_Range_First(1);
        setPage_Range_End(7);
    };
    
    function last_page() {
        var last = paginas().length - 1;
        setPag(last);
        setPage_Range_First(paginas().length - 10);
        setPage_Range_End(paginas().length - 2);
        return last;
    };

    console.log(paginas().length)

    function any_page() {
        
        document.querySelectorAll("button").forEach( function(button) {
            button.addEventListener("click", function(event) {
            const el = event.target;
            const id = el.id;
            setPag(id);
            if(id > 1){
                setPage_Range_First(id);
                if(id < paginas().length - 2){
                    setPage_Range_First(id);
                    setPage_Range_End(parseInt(id) + 7);
                }
                else {
                    setPage_Range_First(parseInt(id) - 7);
                    setPage_Range_End(paginas().length - 2)
                }
            }
            else {
                setPage_Range_First(1)
            }
            
          });
          
        });
    };

    while(dados <= 1) {
        <p>carregando</p>
    }

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
        <div id='paginate'>
            
            <ul href="#header">
                {paginas().slice(0, 1)}
                {paginas().slice( pag_range_first, pag_range_end )}
                {paginas().slice(paginas().length-1 , paginas().length)}
            </ul>
            
            
        </div>
    </div>
)
};

export default Search;