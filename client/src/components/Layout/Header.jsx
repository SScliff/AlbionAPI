import { Link } from 'react-router-dom';
import { Database, Shield, Globe } from 'lucide-react';

const Header = () => {
  return (
    <header className="header-container" style={{
      backgroundColor: 'var(--color-bg-surface)',
      borderBottom: '1px solid var(--color-bg-elevated)',
      padding: '1rem 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 10
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <Shield size={28} color="var(--color-primary)" />
        <Link 
          to="/" 
          style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: '1.5rem', 
            fontWeight: 700,
            color: 'var(--color-text-primary)'
          }}
        >
          Albion<span style={{ color: 'var(--color-primary)' }}>API</span>
        </Link>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          backgroundColor: 'var(--color-bg-base)',
          padding: '0.5rem 1rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-bg-elevated)',
          fontSize: '0.875rem'
        }}>
          <Globe size={16} color="var(--color-text-secondary)" />
          <select 
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: 'var(--color-text-primary)',
              outline: 'none',
              cursor: 'pointer'
            }}
            defaultValue="west"
          >
            <option value="west">Americas (West)</option>
            <option value="east">Asia (East)</option>
            <option value="europe">Europe</option>
          </select>
        </div>
      </div>
    </header>
  );
};

export default Header;
