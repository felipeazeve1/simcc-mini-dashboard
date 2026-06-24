import { useEffect, useState } from 'react'
import listaPesquisadores from './dados.json'

function App() {
  document.body.style.margin = "0";
  document.body.style.padding = "0";
  document.body.style.backgroundColor = "#121212d0";

  const [busca, setBusca] = useState('');
  const [departamento, setDepartamento] = useState('Todos');
  const [carregado, setCarregado] = useState(false);
  const[animarLista, setAnimarLista] = useState(true);

  useEffect(() => {
    setCarregado(true);
  }, []);

  useEffect(() => {
    setAnimarLista(false);
    const timer = setTimeout(() => setAnimarLista(true), 80);
    return () => clearTimeout(timer); 
  }, [departamento]);

 
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
  <div style={{ backgroundColor: '#12121224', minHeight: '100vh', width: '100vw', margin: 0, padding: 0, boxSizing: 'border-box' }}>
    <div style={{ 
      padding: '40px 15px', 
      fontFamily: 'system-ui, sans-serif', 
      maxWidth: '800px', 
      margin: '0 auto', 
      color: '#e0e0e0',
      opacity: carregado ? 1 : 0, 
      transition: 'opacity 0.8s ease-out'
    }}>
      <h1 style={{ color: '#ffffff', margin: '0 0 6px 0', fontSize: '35px', fontWeight: '600' }}>SIMCC - Mini Dashboard UESC</h1>
      <p style={{ color: '#a0a0a0', margin: '0 0 20px 0', fontSize: '18px' }}>Estudo de estado, filtros e renderização dinâmica no React.</p>
      <hr style={{ border: 'none', height: '1px', backgroundColor: '#2e2e2e', margin: '20px 0' }} />

      <div style={{ marginTop: '20px', marginBottom: '20px'}}>
        <input type='text'
          placeholder="Buscar pesquisador por nome..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          onFocus={(e) => e.target.style.borderColor = '#525252'}
          onBlur={(e) => e.target.style.borderColor = '#2e2e2e'}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '6px',
            border: '1px solid #2e2e2e',
            backgroundColor: '#1e1e1e',
            color: '#ffffff',
            fontSize: '16px',
            boxSizing: 'border-box',
            outline: 'none',
            transition: 'border-color 0.2s ease'
        }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <select
          value={departamento}
          onChange={(e) => setDepartamento(e.target.value)}
          onFocus={(e) => e.target.style.borderColor = '#525252'}
          onBlur={(e) => e.target.style.borderColor = '#2e2e2e'}
          style={{
              width: '100%',
              padding: '12px',
              borderRadius: '6px',
              border: '1px solid #2e2e2e',
              backgroundColor: '#1e1e1e',
              color: '#ffffff',
              fontSize: '16px',
              boxSizing: 'border-box',
              outline: 'none',
              cursor: 'pointer',
              transition: 'border-color 0.2s ease'
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
            <div style={{ flex: 1, padding: '16px', backgroundColor: '#1e1e1e', border: '1px solid #2e2e2e', borderRadius: '6px'}}>
              <strong>Pesquisadores:</strong> {totalPesquisadores}
            </div>
            <div style={{ flex: 1, padding: '16px', backgroundColor: '#1e1e1e', border: '1px solid #2e2e2e', borderRadius: '6px'}}>
              <strong>Total de Artigos:</strong> {totalArtigos}
            </div>
            <div style={{ flex: 1, padding: '16px', backgroundColor: '#1e1e1e', border: '1px solid #2e2e2e', borderRadius: '6px'}}>
              <strong>Média de Orientados:</strong> {mediaOrientados}
            </div>
          </div>

    {/* Lista de Pesquisadores */}
      <div style={{
        marginTop: '20px', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '12px',
        opacity: animarLista ? 1 : 0, 
        transition: 'opacity 0.15s ease-in-out' 
      }}>
      {pesquisadoresFiltrados.map((pesquisador) => (
        <div
        key={pesquisador.id}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.borderColor = '#404040';
          e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.borderColor = '#2e2e2e';
          e.currentTarget.style.boxShadow = 'none';
        }}
        style={{
          backgroundColor: '#1e1e1e',
          border: '1px solid #2e2e2e', 
          padding: '20px', 
          borderRadius: '6px',
          transition: 'all 0.2s ease-in-out'
        }}
        >
          <h3 style={{ margin: '0 0 8px 0', color: '#ffffff', fontSize: '18px', fontWeight: '500' }}>{pesquisador.nome}</h3>
          <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#a0a0a0' }}><strong>Área:</strong> {pesquisador.area} | <strong>Departamento: </strong>{pesquisador.departamento}</p>
          <p style={{ margin: 0, fontSize: '14px', color: '#e0e0e0', borderTop: '1px solid #2e2e2e', paddingTop: '8px' }}>{pesquisador.artigos} artigos publicados | {pesquisador.orientandos} orientados</p>
          </div>
      ))}
      </div>

    </div>
  </div>
);
}

export default App;