import { useState } from 'react';
import useFetch from '../hooks/useFetch.js';

function Shop() {
  const { data: products } = useFetch('https://coffee-api-qm89.onrender.com/coffee');
  const origins = products
    ? [...new Set(products.map(p => p.origin))].sort()
    : [];

  const [searchTerm, setSearchTerm] = useState('');
  const [originFilter, setOriginFilter] = useState('All');

  const filtered = products?.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesOrigin =
      originFilter === 'All' || p.origin === originFilter;

    return matchesSearch && matchesOrigin;
  });

  return (
    <>
      <div style={{ display: 'flex', minHeight: '90vh' ,backgroundColor: '#2E1F1A'}}>
        
        <aside style={{ width: '250px', padding: '2rem', backgroundColor: '#f3f4f6' }}>
          <h3>Search</h3>
          <input
            type="text"
            placeholder="Search coffee..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', borderRadius: '20px', border: '1px solid #ccc' }}
          />

          <h3 style={{ marginTop: '1.5rem' }}>Origin</h3>
          <select
            value={originFilter}
            onChange={(e) => setOriginFilter(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', borderRadius: '20px', border: '1px solid #ccc' }}
          >
            <option value="All">All</option>
            {origins.map(origin => (
              <option key={origin} value={origin}>
                {origin}
              </option>
            ))}
          </select>
        </aside>

        <main style={{ flex: 1, padding: '2rem' ,textAlign: 'left', color: '#ffffff'}}>
          <h2>Our Coffee Collection</h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '1.5rem',
              marginTop: '1rem'
            }}
          >
            {Array.isArray(filtered) &&
              filtered.map(product => (
                <div
                  key={product.id}
                  style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    backgroundColor: '#fff'
                  }}
                >
                  <h3 style={{ color: '#ea580c' }}>{product.name}</h3>
                  <p style={{ color: '#6b7280' }}>{product.description}</p>
                  <p style={{ color: '#9ca3af' }}>Origin: {product.origin}</p>
                  <p style={{ color: '#111827', fontWeight: 'bold' }}>
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              ))}
          </div>
        </main>
      </div>  
    </>
  );
}

export default Shop;