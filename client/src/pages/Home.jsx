import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Busca de Itens',
      description: 'Pesquise itens no banco de dados do Albion e encontre seus nomes únicos e localizados rapidamente.',
      path: '/items',
      icon: '🔍',
      color: 'var(--color-primary)'
    },
    {
      title: 'Preços de Mercado',
      description: 'Consulte os preços de venda e compra em todas as cidades de Albion Online em tempo real.',
      path: '/prices',
      icon: '💰',
      color: 'var(--color-accent)'
    },
    {
      title: 'Calculadora de Craft',
      description: 'Estime os custos e lucros de fabricação de itens usando taxas de devolução de recursos.',
      path: '/craft',
      icon: '🔨',
      color: '#e67e22'
    },
    {
      title: 'Histórico de Preços',
      description: 'Veja gráficos detalhados do histórico de preços recentes de qualquer item do jogo.',
      path: '/history',
      icon: '📈',
      color: '#9b59b6'
    },
    {
      title: 'Preço do Ouro',
      description: 'Acompanhe as flutuações e o valor atual do Ouro (Gold) em relação à Prata.',
      path: '/gold',
      icon: '🪙',
      color: '#f1c40f'
    }
  ];

  return (
    <div className="layout-content">
      <h1 style={{ marginBottom: '0.5rem', fontSize: '2.5rem' }}>Dashboard Global</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2.5rem', fontSize: '1.1rem' }}>
        Bem-vindo ao AlbionAPI. Utilize as ferramentas abaixo para otimizar sua economia in-game.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '2rem',
        marginTop: '1rem'
      }}>
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="card dashboard-card" 
            style={{ 
              cursor: 'pointer', 
              transition: 'all 0.3s ease',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              borderTop: `4px solid ${feature.color}`,
              position: 'relative',
              overflow: 'hidden'
            }}
            onClick={() => navigate(feature.path)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.4)';
              e.currentTarget.style.borderColor = feature.color;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.2rem' }}>
              <div style={{ 
                fontSize: '2.5rem', 
                marginRight: '1rem',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '50%',
                width: '60px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)'
              }}>{feature.icon}</div>
              <h3 style={{ margin: 0, color: 'var(--color-text-primary)' }}>{feature.title}</h3>
            </div>
            <p style={{ color: 'var(--color-text-secondary)', margin: 0, flexGrow: 1, lineHeight: '1.6', fontSize: '1.05rem' }}>
              {feature.description}
            </p>
            <div style={{ 
              marginTop: '1.5rem', 
              textAlign: 'right', 
              color: feature.color, 
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontSize: '0.9rem'
            }}>
              Acessar Módulo &rarr;
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
