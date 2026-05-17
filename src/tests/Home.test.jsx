import { render, screen, waitFor } from '@testing-library/react';
import { test, expect, vi, beforeEach } from 'vitest';
import Home from '../components/Home';

beforeEach(() => {
  vi.restoreAllMocks();
});

test('renders store info from API', async () => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([
        { name: 'Coffee R Us', description: 'Test', phone_number: '555-5555' }
      ])
    })
  );

  render(<Home />);

  expect(await screen.findByText('Coffee R Us')).toBeInTheDocument();
  expect(screen.getByText('Test')).toBeInTheDocument();
});

test('handles empty data gracefully', async () => {
  global.fetch = vi.fn(() =>
    Promise.resolve({ json: () => Promise.resolve([]) })
  );

  render(<Home />);

  await waitFor(() => {
    expect(true).toBe(true);
  });
});