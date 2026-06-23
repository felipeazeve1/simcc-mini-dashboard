import { useState } from 'react'
import listaPesquisadores from './dados.json'

function App() {
  //Estados que vão controlar a busca e os filtros
  const [busca, setBusca] = useState('');
  const [departamento, setDepartamento] = useState('Todos');
  const pesquisadoresFiltrados = listaPesquisadores.filter((pesquisador) =>{
    return pesquisador.nome.toLowerCase().includes(busca.toLowerCase());
  });

  return (
    <div style={{ padding: '15px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto'}}>
      <h1>SIMCC - Mini Dashboard UESC</h1>
      <p>Estudo de estado, filtros e renderização dinâmica no React.</p>
      <hr />

      <div style={{ marginTop: '20px', marginBottom: '20px'}}>
        <input type='text'
        placeholder="Buscar pesquisador por nome..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          fontSize: '16px',
          boxSizing: 'border-box'
        }}
        />
      </div>

    {/* Lista de Pesquisadores */}
      <div style={{marginTop: '20px'}}>
      {pesquisadoresFiltrados.map((pesquisador) => (
        <div
        key={pesquisador.id}
        style={{
          border: '2px groove #ccc', 
          padding: '15px', 
          borderRadius: '8px', 
          marginBottom: '10px'
        }}
        >
          <h3>{pesquisador.nome}</h3>
          <p><strong>Área:</strong> {pesquisador.area} | <strong>Departamento: </strong>{pesquisador.departamento}</p>
          <p>{pesquisador.artigos} artigos publicados | {pesquisador.orientandos} orientados</p>
          </div>
      ))}
      </div>

    </div>

  );
}

export default App;