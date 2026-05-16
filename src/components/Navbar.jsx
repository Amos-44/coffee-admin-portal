import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ 
      backgroundColor: '#111827', 
      padding: '1.5rem 5rem',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      alignItems: 'center'
    }}>
      
      <div style={{ textAlign: 'left' }}>
        <Link to="/" style={{ color: '#ffffff', textDecoration: 'none' , fontSize: '1.5rem',
            fontWeight: '600'}}>
          Home
        </Link>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link to="/shop" style={{ color: '#ffffff', textDecoration: 'none' , fontSize: '1.5rem',
            fontWeight: '600'}}>
          Shop
        </Link>
      </div>

      <div style={{ textAlign: 'right' }}>
        <Link to="/admin" style={{ color: '#ffffff', textDecoration: 'none' , fontSize: '1.5rem',
            fontWeight: '600'}}>
          Admin Portal
        </Link>
      </div>

    </nav>
  );
}

export default Navbar;