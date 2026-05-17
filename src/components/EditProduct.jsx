import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: '', description: '', origin: '', price: '' });

  useEffect(() => {
    fetch(`https://coffee-api-qm89.onrender.com/coffee/${id}`)
      .then(res => res.json())
      .then(product => setFormData({
        name: product.name,
        description: product.description,
        origin: product.origin,
        price: product.price.toString()
      }));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`https://coffee-api-qm89.onrender.com/coffee/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, price: Number(formData.price) })
    });
    navigate('/admin');
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f9fafb', minHeight: '90vh', display: 'flex', justifyContent: 'center' }}>
      <form onSubmit={handleSubmit} style={{ border: '2px dashed #ea580c', borderRadius: '12px', padding: '2rem', maxWidth: '500px', width: '100%', backgroundColor: '#ffffff' }}>
        <h2 style={{ textAlign: 'center', color: '#111827' }}>Edit Product</h2>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="edit-name" style={{ color: '#111827' }}>Coffee Name</label>
          <input id="edit-name" type="text" name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={{ width: '100%', padding: '0.5rem' }} />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="edit-desc" style={{ color: '#111827' }}>Description</label>
          <textarea id="edit-desc" name="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows="3" style={{ width: '100%', padding: '0.5rem' }} />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="edit-origin" style={{ color: '#111827' }}>Origin</label>
          <input id="edit-origin" type="text" name="origin" value={formData.origin} onChange={(e) => setFormData({ ...formData, origin: e.target.value })} style={{ width: '100%', padding: '0.5rem' }} />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="edit-price" style={{ color: '#111827' }}>Price ($)</label>
          <input id="edit-price" type="number" step="0.01" name="price" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} style={{ width: '100%', padding: '0.5rem' }} />
        </div>

        <button type="submit" style={{ width: '100%', padding: '0.75rem', backgroundColor: '#ea580c', color: '#ffffff', border: 'none', cursor: 'pointer' }}>
          Update
        </button>
      </form>
    </div>
  );
}

export default EditProduct;