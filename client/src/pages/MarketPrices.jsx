import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import api from '../api/client';
import SearchBar from '../components/SearchBar/SearchBar';

const LOCATIONS = ['Black Market', 'Brecilien', 'Bridgewatch', 'Caerleon', 'Fort Sterling', 'Lymhurst', 'Martlock', 'Thetford'];
const QUALITIES = [
  { value: '1', label: 'Normal' },
  { value: '2', label: 'Bom' },
  { value: '3', label: 'Excepcional' },
  { value: '4', label: 'Excelente' },
  { value: '5', label: 'Obra-Prima' }
];

const MarketPrices = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialLoc = queryParams.get('locations') || '';
  const initialQual = queryParams.get('qualities') || '';

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasQuality, setHasQuality] = useState(true);
  const [currentItem, setCurrentItem] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(initialLoc);
  const [selectedQuality, setSelectedQuality] = useState(initialQual);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (itemId) {
      fetchPrices(itemId);
      // Fazer uma checagem rápida no metadata pra saber se tem qualidade e pegar a imagem/nome
      checkItemQuality(itemId);
    }
  }, [itemId, selectedLocation, selectedQuality]);

  const checkItemQuality = async (id) => {
    try {
      const response = await api.get(`/items/search?q=${id}`);
      // Se acharmos o item exato, usamos a flag e imagem dele
      const itemMatch = response.data.find(item => item.UniqueName === id.toUpperCase());
      if (itemMatch) {
         setHasQuality(itemMatch.hasQuality);
         setCurrentItem(itemMatch);
      } else {
         setCurrentItem(null); // fallback se ID direto não bater
      }
    } catch (e) {
      console.error("Falha ao checar qualidade do item", e);
    }
  };

  const fetchPrices = async (id) => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    try {
      let url = `/prices/${id}`;
      const params = new URLSearchParams();
      if (selectedLocation) params.append('locations', selectedLocation);
      if (selectedQuality) params.append('qualities', selectedQuality);
      
      const queryString = params.toString();
      if (queryString) url += `?${queryString}`;

      const response = await api.get(url);
      setData(response.data);
    } catch (err) {
      console.error(err);
      setError('Erro ao buscar preços. Verifique se o ID do item é válido.');
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectItem = (item) => {
    setHasQuality(item.hasQuality);
    setCurrentItem(item);
    navigate(`/prices/${item.UniqueName}`);
  };

  const formatSilver = (value) => {
    if (!value) return '-';
    return new Intl.NumberFormat('pt-BR').format(value);
  };

  const formatDate = (dateString) => {
    if (!dateString || dateString.startsWith('0001')) return 'Nunca';
    const date = new Date(dateString + 'Z'); // AODB retorna UTC
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
    }).format(date);
  };

  const getItemTierAndEnchantment = (id) => {
    if (!id) return '';
    let part = id.toUpperCase();
    
    const tierMatch = part.match(/^T(\d)/);
    const tier = tierMatch ? tierMatch[1] : '?';
    
    const enchantMatch = part.match(/@(\d)/);
    const enchantment = enchantMatch ? enchantMatch[1] : '0';
    
    if (tier === '?') return '';
    return `T${tier}.${enchantment}`;
  };

  const formatQuality = (qualityCode) => {
    const qualities = {
      1: 'Normal',
      2: 'Bom',
      3: 'Excepcional',
      4: 'Excelente',
      5: 'Obra-Prima'
    };
    return qualities[qualityCode] || `Desconhecido (${qualityCode})`;
  };

  return (
    <div className="layout-content">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        {currentItem?.imageUrl ? (
          <div style={{ backgroundColor: 'var(--color-bg-surface)', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-bg-elevated)', width: '64px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={currentItem.imageUrl} alt={currentItem.UniqueName} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
          </div>
        ) : null}
        <div>
          <h1 style={{ margin: 0, color: 'var(--color-primary)' }}>
            {currentItem ? (currentItem.LocalizedNames["PT-BR"] || currentItem.LocalizedNames["EN-US"]) : 'Preços de Mercado'}
          </h1>
          {currentItem && (
            <span style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', fontFamily: 'monospace' }}>
              {currentItem.UniqueName}
            </span>
          )}
        </div>
      </div>

      <div className="card" style={{ marginBottom: '1.5rem', overflow: 'visible' }}>
         <SearchBar onSelect={handleSelectItem} />
         
         {itemId && (
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

             {hasQuality && (
               <select 
                 className="input-base" 
                 style={{ flex: 1, minWidth: '200px' }}
                 value={selectedQuality}
                 onChange={(e) => setSelectedQuality(e.target.value)}
               >
                 <option value="">Todas as Qualidades</option>
                 {QUALITIES.map(q => <option key={q.value} value={q.value}>{q.label}</option>)}
               </select>
             )}
           </div>
         )}
      </div>

      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem', color: 'var(--color-primary)' }}>
          <Loader2 size={32} className="animate-spin" />
          <span style={{ marginLeft: '0.5rem' }}>Buscando dados na API...</span>
        </div>
      )}

      {error && (
        <div className="card" style={{ borderLeft: '4px solid var(--color-danger)', backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
          <p style={{ color: 'var(--color-danger)' }}>{error}</p>
        </div>
      )}

      {!loading && !error && data.length > 0 && (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead style={{ backgroundColor: 'var(--color-bg-base)', borderBottom: '1px solid var(--color-bg-elevated)' }}>
                <tr>
                  <th style={{ padding: '1rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>Cidade</th>
                  <th style={{ padding: '1rem', color: 'var(--color-accent)', fontWeight: 500 }}>Tier/Enc.</th>
                  {hasQuality && <th style={{ padding: '1rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>Qualidade</th>}
                  <th style={{ padding: '1rem', color: 'var(--color-warning)', fontWeight: 600 }}>Menor Venda (Sell)</th>
                  <th style={{ padding: '1rem', color: 'var(--color-text-muted)', fontWeight: 400, fontSize: '0.875rem' }}>Atualizado em</th>
                  <th style={{ padding: '1rem', color: 'var(--color-success)', fontWeight: 600 }}>Maior Compra (Buy)</th>
                  <th style={{ padding: '1rem', color: 'var(--color-text-muted)', fontWeight: 400, fontSize: '0.875rem' }}>Atualizado em</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={`${row.city}-${row.quality}-${index}`} style={{ borderBottom: '1px solid var(--color-bg-elevated)' }}>
                    <td style={{ padding: '1rem', fontWeight: 500 }}>{row.city}</td>
                    <td style={{ padding: '1rem', color: 'var(--color-accent)', fontWeight: 500 }}>{getItemTierAndEnchantment(itemId)}</td>
                    {hasQuality && <td style={{ padding: '1rem', color: 'var(--color-text-secondary)' }}>{formatQuality(row.quality)}</td>}
                    <td style={{ padding: '1rem', color: 'var(--color-text-primary)' }}>{formatSilver(row.sell_price_min)}</td>
                    <td style={{ padding: '1rem', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>{formatDate(row.sell_price_min_date)}</td>
                    <td style={{ padding: '1rem', color: 'var(--color-text-primary)' }}>{formatSilver(row.buy_price_max)}</td>
                    <td style={{ padding: '1rem', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>{formatDate(row.buy_price_max_date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!loading && !error && data.length === 0 && itemId && (
        <div className="card">
          <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center' }}>Nenhum dado encontrado para o item {itemId}.</p>
        </div>
      )}
    </div>
  );
};

export default MarketPrices;
