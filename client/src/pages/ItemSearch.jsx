import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar/SearchBar';

const LOCATIONS = ['Black Market', 'Brecilien', 'Bridgewatch', 'Caerleon', 'Fort Sterling', 'Lymhurst', 'Martlock', 'Thetford'];
const QUALITIES = [
  { value: '1', label: 'Normal' },
  { value: '2', label: 'Bom' },
  { value: '3', label: 'Excepcional' },
  { value: '4', label: 'Excelente' },
  { value: '5', label: 'Obra-Prima' }
];

const ItemSearch = () => {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedQuality, setSelectedQuality] = useState('');

  const handleSelect = (item) => {
    let url = `/prices/${item.UniqueName}`;
    const params = new URLSearchParams();
    if (selectedLocation) params.append('locations', selectedLocation);
    if (item.hasQuality && selectedQuality) {
      params.append('qualities', selectedQuality);
    }
    const qs = params.toString();
    if (qs) url += `?${qs}`;
    
    navigate(url);
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

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          <select 
            className="input-base" 
            style={{ flex: 1, minWidth: '200px' }}
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="">Todas as Cidades</option>
            {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
          </select>

          <select 
            className="input-base" 
            style={{ flex: 1, minWidth: '200px' }}
            value={selectedQuality}
            onChange={(e) => setSelectedQuality(e.target.value)}
          >
            <option value="">Todas as Qualidades</option>
            {QUALITIES.map(q => <option key={q.value} value={q.value}>{q.label}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ItemSearch;
