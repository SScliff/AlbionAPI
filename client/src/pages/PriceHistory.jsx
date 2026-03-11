import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import api from '../api/client';
import SearchBar from '../components/SearchBar/SearchBar';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LOCATIONS = ['Black Market', 'Brecilien', 'Bridgewatch', 'Caerleon', 'Fort Sterling', 'Lymhurst', 'Martlock', 'Thetford'];
const QUALITIES = [
  { value: '1', label: 'Normal' },
  { value: '2', label: 'Bom' },
  { value: '3', label: 'Excepcional' },
  { value: '4', label: 'Excelente' },
  { value: '5', label: 'Obra-Prima' }
];

const CITY_COLORS = {
  'Black Market': '#4b4b4b',
  'Brecilien': '#8e44ad',
  'Bridgewatch': '#e67e22',
  'Caerleon': '#c0392b',
  'Fort Sterling': '#ecf0f1',
  'Lymhurst': '#27ae60',
  'Martlock': '#3498db',
  'Thetford': '#9b59b6'
};

const PriceHistory = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialLoc = queryParams.get('locations') || '';
  const initialQual = queryParams.get('qualities') || '';

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [selectedLocation, setSelectedLocation] = useState(initialLoc);
  const [selectedQuality, setSelectedQuality] = useState(initialQual);
  
  const [hasQuality, setHasQuality] = useState(true);
  const [currentItem, setCurrentItem] = useState(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (itemId) {
      checkItemInfo(itemId);
      fetchHistory(itemId);
    }
  }, [itemId, selectedLocation, selectedQuality]);

  const checkItemInfo = async (id) => {
    try {
      const response = await api.get(`/items/search?q=${id}`);
      const itemMatch = response.data.find(item => item.UniqueName === id.toUpperCase());
      if (itemMatch) {
         setHasQuality(itemMatch.hasQuality);
         setCurrentItem(itemMatch);
         if (!itemMatch.hasQuality) {
           setSelectedQuality('');
         }
      } else {
         setCurrentItem(null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchHistory = async (id) => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      let url = `/history/${id}?time-scale=24`;
      if (selectedLocation) url += `&locations=${selectedLocation}`;
      if (selectedQuality) url += `&qualities=${selectedQuality}`;
      
      const response = await api.get(url);
      setData(response.data);
    } catch (err) {
      console.error(err);
      setError('Erro ao buscar histórico. Tente novamente mais tarde.');
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectItem = (item) => {
    setHasQuality(item.hasQuality);
    setCurrentItem(item);
    navigate(`/history/${item.UniqueName}`);
  };

  const buildChartData = () => {
    if (!data || data.length === 0) return null;
    
    // We need to collect all unique timestamps for labels and sort them
    const allTimestamps = new Set();
    data.forEach(entry => {
      if (entry.data) {
        entry.data.forEach(point => allTimestamps.add(point.timestamp));
      }
    });
    
    const sortedTimestamps = Array.from(allTimestamps).sort((a, b) => new Date(a) - new Date(b));
    
    const datasets = data.map((entry, index) => {
      const dataMap = {};
      if (entry.data) {
        entry.data.forEach(point => {
          dataMap[point.timestamp] = point.avg_price;
        });
      }
      
      const chartPoints = sortedTimestamps.map(ts => dataMap[ts] || null);
      
      const color = CITY_COLORS[entry.location] || `hsl(${index * 45}, 70%, 50%)`;
      const labelStr = `${entry.location}${entry.quality ? ` (Q${entry.quality})` : ''}`;
      
      return {
        label: labelStr,
        data: chartPoints,
        borderColor: color,
        backgroundColor: color,
        borderWidth: 2,
        pointRadius: 2,
        spanGaps: true
      };
    });

    return {
      labels: sortedTimestamps.map(ts => {
        const d = new Date(ts);
        return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth()+1).toString().padStart(2, '0')}`;
      }),
      datasets
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
        labels: { color: '#e5e7eb' }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) label += ': ';
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('pt-BR').format(context.parsed.y) + ' Pratas';
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: { grid: { color: '#24292f' }, ticks: { color: '#9ca3af' } },
      y: { grid: { color: '#24292f' }, ticks: { color: '#9ca3af' } }
    }
  };

  const chartData = buildChartData();

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
            {currentItem ? `Histórico: ${currentItem.LocalizedNames["PT-BR"] || currentItem.LocalizedNames["EN-US"]}` : 'Histórico de Preços'}
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
          <span style={{ marginLeft: '0.5rem' }}>Buscando dados históricos...</span>
        </div>
      )}

      {error && (
        <div className="card" style={{ borderLeft: '4px solid var(--color-danger)', backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
          <p style={{ color: 'var(--color-danger)' }}>{error}</p>
        </div>
      )}

      {!loading && !error && chartData && chartData.datasets.length > 0 && (
        <div className="card" style={{ height: '500px', display: 'flex', flexDirection: 'column' }}>
          <Line data={chartData} options={chartOptions} />
        </div>
      )}

      {!loading && !error && data.length === 0 && itemId && (
        <div className="card">
          <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center' }}>Nenhum histórico encontrado para o item selecionado e filtros aplicados.</p>
        </div>
      )}
    </div>
  );
};

export default PriceHistory;
