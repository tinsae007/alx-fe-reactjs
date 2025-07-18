import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px',
        backgroundColor: '#f0f0f0',
        gap: '20px'
      }}
    >
      <Link to="/" style={{ textDecoration: 'none', color: '#333' }}>Home</Link>
      <Link to="/about" style={{ textDecoration: 'none', color: '#333' }}>About</Link>
      <Link to="/services" style={{ textDecoration: 'none', color: '#333' }}>Services</Link>
      <Link to="/contact" style={{ textDecoration: 'none', color: '#333' }}>Contact</Link>
    </nav>
  );
}

export default Navbar;
