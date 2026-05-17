import { renderHook, waitFor } from '@testing-library/react';
import { test, expect, vi, beforeEach } from 'vitest';
import useFetch from '../hooks/useFetch';

beforeEach(() => {
  vi.restoreAllMocks();
});

test('fetches data', async () => {
  const mockFetch = vi.fn(() =>
    Promise.resolve({ json: () => Promise.resolve([{ id: 1 }]) })
  );

  global.fetch = mockFetch;

  const { result } = renderHook(() => useFetch('http://test.com'));

  await waitFor(() => {
    expect(result.current.data).toEqual([{ id: 1 }]);
  });
});

test('refetch calls fetch again', async () => {
  const mockFetch = vi.fn(() =>
    Promise.resolve({ json: () => Promise.resolve([{ id: 2 }]) })
  );

  global.fetch = mockFetch;

  const { result } = renderHook(() => useFetch('http://test.com'));

  await waitFor(() => expect(result.current.data).toBeDefined());

  result.current.refetch();

  expect(mockFetch).toHaveBeenCalledTimes(2);
});