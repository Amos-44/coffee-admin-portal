import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { test, expect, beforeEach, vi } from 'vitest';
import Navbar from '../components/Navbar';

beforeEach(() => {
  vi.restoreAllMocks();
});

test('renders all navigation links', () => {
  render(<BrowserRouter><Navbar /></BrowserRouter>);

  expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /shop/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /admin portal/i })).toBeInTheDocument();
});

test('links have correct routes', () => {
  render(<BrowserRouter><Navbar /></BrowserRouter>);

  expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute('href', '/');
  expect(screen.getByRole('link', { name: /shop/i })).toHaveAttribute('href', '/shop');
  expect(screen.getByRole('link', { name: /admin portal/i })).toHaveAttribute('href', '/admin');
});