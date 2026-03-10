import { NavLink } from 'react-router-dom';
import { Search, LineChart, Hammer, TrendingUp, Coins, Home } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { path: '/', label: 'Home', icon: <Home size={20} /> },
    { path: '/items', label: 'Pesquisa de Itens', icon: <Search size={20} /> },
    { path: '/prices', label: 'Preços de Mercado', icon: <LineChart size={20} /> },
    { path: '/craft', label: 'Calculadora de Craft', icon: <Hammer size={20} /> },
    { path: '/history', label: 'Histórico de Preços', icon: <TrendingUp size={20} /> },
    { path: '/gold', label: 'Cotação do Gold', icon: <Coins size={20} /> },
  ];

  const getLinkStyle = ({ isActive }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem 1rem',
    borderRadius: 'var(--radius-md)',
    color: isActive ? 'var(--color-bg-base)' : 'var(--color-text-primary)',
    backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
    fontWeight: isActive ? 600 : 400,
    transition: 'all 0.2s',
    marginBottom: '0.25rem'
  });

  return (
    <aside style={{
      width: '260px',
      backgroundColor: 'var(--color-bg-surface)',
      borderRight: '1px solid var(--color-bg-elevated)',
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      height: 'calc(100vh - 73px)', // Header height subtracted
      overflowY: 'auto'
    }} className="sidebar-container">
      <div style={{
        fontSize: '0.75rem',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        color: 'var(--color-text-muted)',
        marginBottom: '0.5rem',
        fontWeight: 600
      }}>Menu Principal</div>
      
      <nav style={{ display: 'flex', flexDirection: 'column' }}>
        {navItems.map((item) => (
          <NavLink 
            key={item.path} 
            to={item.path} 
            style={getLinkStyle}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      
      <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--color-bg-elevated)' }}>
        <div style={{ 
          fontSize: '0.75rem', 
          color: 'var(--color-text-muted)',
          textAlign: 'center'
        }}>
          Status da API: <span style={{ color: 'var(--color-success)' }}>Online</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
