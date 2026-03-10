import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar/SearchBar';

const ItemSearch = () => {
  const navigate = useNavigate();

  const handleSelect = (item) => {
    navigate(`/prices/${item.UniqueName}`);
  };

  return (
    <div className="layout-content">
      <h1 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        Pesquisa de Itens
      </h1>
      <div className="card" style={{ marginBottom: '1.5rem', overflow: 'visible' }}>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
          Encontre qualquer item do Albion Online pelo nome e veja seus preços de mercado instantaneamente no servidor selecionado.
        </p>
        <SearchBar onSelect={handleSelect} />
      </div>
    </div>
  );
};

export default ItemSearch;
