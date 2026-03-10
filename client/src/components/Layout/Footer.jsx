const Footer = () => {
  return (
    <footer style={{
      backgroundColor: 'var(--color-bg-surface)',
      borderTop: '1px solid var(--color-bg-elevated)',
      padding: '1.5rem',
      textAlign: 'center',
      fontSize: '0.875rem',
      color: 'var(--color-text-muted)'
    }}>
      <p style={{ marginBottom: '0.5rem' }}>
        Dados providenciados por <a href="https://www.albion-online-data.com/" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 500 }}>Albion Online Data Project</a>.
      </p>
      <p style={{ fontSize: '0.75rem' }}>
        Disclaimer: Este projeto não é afiliado a Albion Online, Sandbox Interactive GmbH, ou Albion Online Data Project.
      </p>
    </footer>
  );
};

export default Footer;
