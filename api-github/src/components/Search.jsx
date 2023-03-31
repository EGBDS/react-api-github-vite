import React, { useEffect, useRef, useState} from 'react'
import url_default from '../axios/axios'; //importando url padrao

import star from '../assets/star.png';
import book from '../assets/book.png';
import './Search.css';


const Search = ()  => {

    const sleep = ms => new Promise(res => setTimeout(res, ms)); //configuração padrão para o sleep

    /* const [ qtdp, setQtdp ] = useState(0); */
    
    const [ qtd, setQtd ] = useState(0);
    console.log(qtd);
    
    const [ dados, setDatos ] = useState([]); //usestate recebe um array
    console.log(dados);
    /* const [ repo, setRepo ] = useState(''); //nome do repositorio */

    const [ pag, setPag ] = useState(1);
    console.log(pag);
    const [ pag_range_first, setPage_Range_First ] = useState(1);

    const [ pag_range_end, setPage_Range_End ] = useState(7);

    const [ marq, setMarq ] = useState(0);

    const repos = useRef('');
    console.log(repos.current)

    const getdados = async () => { // funcao assincrona
        try { 
            const resposta = await url_default.get(repos.current+`&per_page=10&page=${pag}`); //tentando fazer a requisição.
            const dado = resposta.data.items;
            const quant =  resposta.data.total_count;
            
            setQtd(quant);

            if(repos.current != '') {
                if(dado.length < 1){
                    let dad = document.getElementById('dad');
                    dad.innerHTML = `<p>Carregando...</p>`;

                    let dados = document.getElementById('dados');
                    dados.style.display = "none";

                    let paginate = document.getElementById('paginate');
                    paginate.style.display = "none";

                    let qtd = document.getElementById('qtd');
                    qtd.style.display = "none";

                    await sleep(4000);
                    dad.innerHTML = `<p>Repositório não encontrado! Tente novamente.</p>`;
                    }
                else {
                    let dados = document.getElementById('dados');
                    dados.style.display = "none";

                    let paginate = document.getElementById('paginate');
                    paginate.style.display = "none";

                    let qtd = document.getElementById('qtd');
                    qtd.style.display = "none";

                    setDatos(dado);
                    let dad = document.getElementById('dad');
                    dad.innerHTML = `<p>Carregando...</p>`;
                    await sleep(4000);
                    dad.innerHTML = ``;

                    dados.style.display = "block";

                    paginate.style.display = "block";

                    qtd.style.display = "block";
                };
            };
            
            console.log(dado);
        } catch(error) {
            console.log(error);

            if( repos != '') { 
                alert("Há algo de errado com a API. Recarregue a página. Se não funcionar tente em alguns minutos ou entre em contato com os desenvolvedores @erick_gbs ! Tente novamente em alguns minutos. "+error);
            };
        }
        
    };

    useEffect(() => {
        getdados();
    },[addEventListener]);

    var last = paginas().length - 1

    function paginas() {

        let pages = [];
        
        let a = 0;
        pages.unshift(
            <a href="#header" key={a.toString()} >
                <button onClick={ first_page } id='0'>First</button>
            </a>
        );
        for (let i = 1; i < (qtd/10); i++){
            pages.push(
            <a href="#header" key={i.toString()}>
                <button  id={i.toString()} onClick={any_page}>{i}</button>
            </a>
            );
            
            
        };
        pages.push(
            <a href="#header" key={last_page}>
                <button onClick={ last_page } id={last}>Last</button>
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
        
        setPag(last);
        setPage_Range_First(paginas().length - 10);
        setPage_Range_End(paginas().length - 2);
        return last;
    };

    function any_page() {
        document.querySelectorAll("button").forEach( function(button) {
            button.addEventListener("click", function(event) {
            const el = event.target;
            const id = el.id;
            
            let reset = document.getElementById(marq);
            let foco = document.getElementById(id);

            reset.style.background = "#fff";
            reset.style.color = "black";
            reset.style.border = "1px solid black";
            
            foco.style.background = "black";
            foco.style.color = "white";

            setMarq(id);
            
            if(id == "btn"){
                setPag(1) //Quando clicar em "buscar" a pagina vai para a primeira.)
            }
            else {
                setPag(id);
                //só para não dar possiveis erro, foi a melhor forma que achei de conseguir voltar a pagina para 1.
            }
            if(id > 1){
                setPage_Range_First(id);

                if(id < paginas().length - 2){
                    if(id >= 6) {
                        setPage_Range_First(id - 3);
                        setPage_Range_End(parseInt(id) + 3);
                    }
                    else {
                        setPage_Range_First(1);
                        setPage_Range_End(7);
                    }
                }
                else {
                    setPage_Range_First(parseInt(id) - 7);
                    setPage_Range_End(paginas().length - 2);
                }
            }
            else {
                setPage_Range_First(1);
            }
            
          });
          
        });
    };
    

return (
    <div className='search'>
        <form onSubmit={(e) => {e.preventDefault()}}>
            <input type='text' id='repository' placeholder='Digite Aqui' onChange={(e) => repos.current = e.target.value}/>
            <button type='submit' id='btn' value='buscar' onClick={getdados}>Buscar</button>
        </form>
        <div id='qtd'>
            <h2>Quantidade de repositórios: {qtd.toLocaleString()}</h2> {/* tolocalestring faz com que o número tenha pontos para diferenciar de dezena, centena e etc... */}
        </div>
        
        <div id='dad'>
        </div>
        <div id='dados'>
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