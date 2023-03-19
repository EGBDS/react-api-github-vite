import './App.css';
import Search from './components/Search';

function App() {
 

  return (
    <div className="App">
      <header>
        <h1>Pesquise Repositórios no GitHub</h1>
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

export default App
