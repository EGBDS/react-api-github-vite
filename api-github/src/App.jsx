import './App.css';
import Search from './components/Search/Search';

import dark from './assets/dark.png';
import light from './assets/light.png';
import { useState } from 'react';

function App() {
 
  const [ mode, setModo ] = useState('white');
  const [ img, setImg ] = useState(light);
  const [ txtmodo, setTxtModo ] = useState('Light Mode');
  const [ txtcor, setTxtCor ] = useState('black');

  console.log(mode)
  function modos(){
    if(img == light){

    }
  }

  return (
    <div className="App" >
      <header id='header' >
        <h1>Pesquise Repositórios no GitHub</h1>
        <button style={{background: mode, color: txtcor}} onClick={modos}><img src={img}></img>{txtmodo}</button>
      </header>
      <main>
        <Search />
      </main>
      <footer>
        <p>Desenvolvido por <a href='https://github.com/EGBDS' target='_blank'>EGBDS</a></p>
      </footer>
    </div>
  )
}

export default App;
