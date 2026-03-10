import { useState, useEffect, useRef } from 'react';
import { Search, Loader2, Package } from 'lucide-react';
import api from '../../api/client';

const SearchBar = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const wrapperRef = useRef(null);
  
  // Fechar dropdown de sugestões ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);
  
  // Debounce para a busca na API
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.length >= 2) {
        fetchSuggestions(query);
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 300); // 300ms de "atraso" após o user parar de digitar

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const fetchSuggestions = async (searchTerm) => {
    setLoading(true);
    try {
      const response = await api.get(`/items/search?q=${encodeURIComponent(searchTerm)}`);
      setResults(response.data);
      setIsOpen(true);
    } catch (err) {
      console.error(err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectItem = (item) => {
    setQuery(item.LocalizedNames["PT-BR"] || item.UniqueName);
    setIsOpen(false);
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <div ref={wrapperRef} style={{ position: 'relative', width: '100%' }}>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', left: '12px', color: 'var(--color-text-muted)' }}>
          {loading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
        </div>
        <input
          type="text"
          className="input-base"
          style={{ width: '100%', paddingLeft: '2.5rem', paddingRight: '1rem', height: '44px', fontSize: '1rem' }}
          placeholder="Pesquise por nome (Ex: Espada, Bolsa, Minério...)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => { if (results.length > 0) setIsOpen(true) }}
        />
      </div>

      {isOpen && results.length > 0 && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          marginTop: '0.25rem',
          backgroundColor: 'var(--color-bg-surface)',
          border: '1px solid var(--color-bg-elevated)',
          borderRadius: 'var(--radius-md)',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
          zIndex: 50,
          maxHeight: '300px',
          overflowY: 'auto'
        }}>
          <ul style={{ listStyle: 'none', margin: 0, padding: '0.5rem 0' }}>
            {results.map((item, i) => (
              <li 
                key={`${item.UniqueName}-${i}`}
                style={{
                  padding: '0.75rem 1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  borderBottom: i < results.length - 1 ? '1px solid var(--color-bg-elevated)' : 'none',
                  transition: 'background-color 0.1s'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--color-bg-elevated)'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                onClick={() => handleSelectItem(item)}
              >
                <div style={{ 
                  backgroundColor: 'var(--color-bg-base)', 
                  padding: '0.25rem', 
                  borderRadius: 'var(--radius-sm)',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <img 
                    src={item.imageUrl} 
                    alt={item.UniqueName} 
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                    onError={(e) => { e.target.style.display = 'none'; }} // Fallback rudimentar
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontWeight: 500, color: 'var(--color-text-primary)' }}>
                    {item.LocalizedNames["PT-BR"] || item.LocalizedNames["EN-US"] || item.UniqueName}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontFamily: 'monospace' }}>
                    {item.UniqueName} {item.hasQuality ? '' : '• Sem Qualidade'}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
