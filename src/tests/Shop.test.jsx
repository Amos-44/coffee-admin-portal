import { render, screen, fireEvent } from '@testing-library/react';
import { test, expect, vi, beforeEach } from 'vitest';
import Shop from '../components/Shop';

beforeEach(() => {
  vi.restoreAllMocks();
});

const mockProducts = [
  { id: 1, name: 'Vanilla Bean', description: 'Medium', origin: 'Columbia', price: 10 },
  { id: 2, name: 'House Blend', description: 'Dark', origin: 'Vietnam', price: 12 }
];

test('renders products and filters by search', async () => {
  global.fetch = vi.fn(() =>
    Promise.resolve({ json: () => Promise.resolve(mockProducts) })
  );

  render(<Shop />);

  const input = await screen.findByPlaceholderText('Search coffee...');

  fireEvent.change(input, { target: { value: 'Vanilla' } });

  expect(screen.getByText('Vanilla Bean')).toBeInTheDocument();
  expect(screen.queryByText('House Blend')).not.toBeInTheDocument();
});

test('filters by origin', async () => {
  global.fetch = vi.fn(() =>
    Promise.resolve({ json: () => Promise.resolve(mockProducts) })
  );

  render(<Shop />);

  const select = await screen.findByRole('combobox');

  fireEvent.change(select, { target: { value: 'Vietnam' } });

  expect(screen.getByText('House Blend')).toBeInTheDocument();
  expect(screen.queryByText('Vanilla Bean')).not.toBeInTheDocument();
});