import { useState, useId } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch.js';

function AdminPortal() {
  const { data: products, refetch } = useFetch('https://coffee-api-qm89.onrender.com/coffee');
  const navigate = useNavigate();

  const nameId = useId();
  const descId = useId();
  const originId = useId();
  const priceId = useId();

  const [formData, setFormData] = useState({ name: '', description: '', origin: '', price: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Coffee name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.origin.trim()) newErrors.origin = 'Origin is required';
    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0) {
      newErrors.price = 'Valid price is required';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    await fetch('https://coffee-api-qm89.onrender.com/coffee', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, price: Number(formData.price) })
    });

    setFormData({ name: '', description: '', origin: '', price: '' });
    setErrors({});
    refetch();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete?')) return;
    await fetch(`https://coffee-api-qm89.onrender.com/coffee/${id}`, { method: 'DELETE' });
    refetch();
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f9fafb', minHeight: '90vh' }}>
      <form onSubmit={handleSubmit} style={{ 
        border: '2px solid #3d2620', borderRadius: '12px', padding: '2rem', 
        maxWidth: '500px', margin: '0 auto 3rem', backgroundColor: '#ffffff' 
      }}>
        <h2 style={{ textAlign: 'center', color: '#111827' }}>Add New Product</h2>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor={nameId} style={{ color: '#111827' }}>Coffee Name</label>
          <input id={nameId} type="text" name="name" value={formData.name} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', border: `1px solid ${errors.name ? '#ea580c' : '#ccc'}` }} />
          {errors.name && <span style={{ color: '#ea580c' }}>{errors.name}</span>}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor={descId} style={{ color: '#111827' }}>Description</label>
          <textarea id={descId} name="description" value={formData.description} onChange={handleChange} rows="3" style={{ width: '100%', padding: '0.5rem', border: `1px solid ${errors.description ? '#ea580c' : '#ccc'}` }} />
          {errors.description && <span style={{ color: '#ea580c' }}>{errors.description}</span>}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor={originId} style={{ color: '#111827' }}>Origin</label>
          <input id={originId} type="text" name="origin" value={formData.origin} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', border: `1px solid ${errors.origin ? '#ea580c' : '#ccc'}` }} />
          {errors.origin && <span style={{ color: '#ea580c' }}>{errors.origin}</span>}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor={priceId} style={{ color: '#111827' }}>Price ($)</label>
          <input id={priceId} type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', border: `1px solid ${errors.price ? '#ea580c' : '#ccc'}` }} />
          {errors.price && <span style={{ color: '#ea580c' }}>{errors.price}</span>}
        </div>

        <button type="submit" style={{ width: '100%', padding: '0.75rem', backgroundColor: '#ea580c', color: '#ffffff', border: 'none', cursor: 'pointer' }}>
          ADD
        </button>
      </form>

      <h2 style={{ textAlign: 'center',fontSize: '2.25rem', color: '#111827' }}>Manage Products</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem', maxWidth: '1200px', margin: '0 auto' }}>
        {Array.isArray(products) && products.map(product => (
          <div key={product.id} style={{ border: '1px solid #e5e7eb', padding: '1rem', backgroundColor: '#ffffff' }}>
            <h3 style={{ color: '#ea580c' }}>{product.name}</h3>
            <p style={{ color: '#6b7280' }}>{product.description}</p>
            <p style={{ color: '#9ca3af' }}>Origin: {product.origin}</p>
            <p style={{ color: '#111827', fontWeight: 'bold' }}>${product.price.toFixed(2)}</p>
            <button onClick={() => navigate(`/edit/${product.id}`)} style={{ marginRight: '0.5rem', padding: '0.5rem', backgroundColor: '#fbbf24', border: 'none', cursor: 'pointer' }}>Edit</button>
            <button onClick={() => handleDelete(product.id)} style={{ padding: '0.5rem', backgroundColor: '#ea580c', color: '#ffffff', border: 'none', cursor: 'pointer' }}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPortal;