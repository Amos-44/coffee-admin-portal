import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { test, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import EditProduct from '../components/EditProduct';

beforeEach(() => {
  vi.restoreAllMocks();
});

const mockProduct = {
  name: 'Vanilla Bean',
  description: 'Medium Roast',
  origin: 'Columbia',
  price: 10
};

global.fetch = vi.fn((url, options) => {
  if (!options) return Promise.resolve({ json: () => Promise.resolve(mockProduct) });
  return Promise.resolve({ ok: true });
});

test('loads product into form', async () => {
  render(
    <MemoryRouter initialEntries={['/edit/1']}>
      <Routes>
        <Route path="/edit/:id" element={<EditProduct />} />
      </Routes>
    </MemoryRouter>
  );

  expect(await screen.findByDisplayValue('Vanilla Bean')).toBeInTheDocument();
});

test('updates product', async () => {
  render(
    <MemoryRouter initialEntries={['/edit/1']}>
      <Routes>
        <Route path="/edit/:id" element={<EditProduct />} />
      </Routes>
    </MemoryRouter>
  );

  await screen.findByDisplayValue('Vanilla Bean');

  fireEvent.click(screen.getByText('Update'));

  await waitFor(() => {
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/coffee/1'),
      expect.objectContaining({ method: 'PATCH' })
    );
  });
});