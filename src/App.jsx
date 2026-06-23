import { useState } from 'react'
import listaPesquisadores from './dados.json'

function App() {
  const [busca, setBusca] = useState('');
  const [departamento, setDepartamento] = useState('Todos');
  const pesquisadoresFiltrados = listaPesquisadores.filter((pesquisador) => {
    
    const bateComONome = pesquisador.nome.toLowerCase().includes(busca.toLowerCase());
    const bateComODepartamento = departamento === 'Todos' || pesquisador.departamento === departamento;
    
    return bateComONome && bateComODepartamento;
  });

    const totalPesquisadores = pesquisadoresFiltrados.length;

    const totalArtigos = pesquisadoresFiltrados.reduce((acumulador, p) => acumulador + p.artigos, 0);
    const totalOrientados = pesquisadoresFiltrados.reduce((acumulador, p) => acumulador + p.orientandos, 0);
    const mediaOrientados = totalPesquisadores > 0 ? (totalOrientados / totalPesquisadores).toFixed(1) : 0;

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

      <div style={{ marginBottom: '20px' }}>
        <select
        value={departamento}
        onChange={(e) => setDepartamento(e.target.value)}
        style={{
            width: '100%',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            fontSize: '16px',
            boxSizing: 'border-box'
        }}
        >
          <option value="Todos">Todos os Departamentos</option>
          <option value="DCET">DCET</option>
          <option value="DCIS">DCIS</option>
          <option value="DCEX">DCEX</option>

        </select>
      </div>

      {/*Bloco de Métricas Reativas */}
          <div style={{ display: 'flex', gap: '15px', marginBottom: '20px'}}>
            <div style={{ flex: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '5px'}}>
              <strong>Pesquisadores:</strong> {totalPesquisadores}
            </div>
            <div style={{ flex: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '5px'}}>
              <strong>Total de Artigos:</strong> {totalArtigos}
            </div>
            <div style={{ flex: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '5px'}}>
              <strong>Média de Orientados:</strong> {mediaOrientados}
            </div>
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