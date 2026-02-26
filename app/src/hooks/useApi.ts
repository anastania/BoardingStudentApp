import { useState, useEffect, useCallback } from 'react';
import type { AxiosError } from 'axios';
import type { ApiError } from '@/services/api';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
  refetch: () => void;
}

export function useApi<T>(
  apiCall: () => Promise<T>,
  dependencies: unknown[] = []
): UseApiState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiCall();
      setData(result);
    } catch (err) {
      const axiosError = err as AxiosError<ApiError>;
      setError(
        axiosError.response?.data || {
          message: axiosError.message || 'An error occurred',
          code: 'UNKNOWN_ERROR',
        }
      );
    } finally {
      setLoading(false);
    }
  }, [apiCall]);

  useEffect(() => {
    fetchData();
  }, dependencies);

  return { data, loading, error, refetch: fetchData };
}

// Hook for API mutations (POST, PATCH, DELETE)
interface UseMutationState<T, P = unknown> {
  mutate: (params: P) => Promise<T | null>;
  loading: boolean;
  error: ApiError | null;
  data: T | null;
  reset: () => void;
}

export function useMutation<T, P = unknown>(
  mutationFn: (params: P) => Promise<T>
): UseMutationState<T, P> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const mutate = useCallback(async (params: P): Promise<T | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await mutationFn(params);
      setData(result);
      return result;
    } catch (err) {
      const axiosError = err as AxiosError<ApiError>;
      const errorData =
        axiosError.response?.data || {
          message: axiosError.message || 'An error occurred',
          code: 'UNKNOWN_ERROR',
        };
      setError(errorData);
      return null;
    } finally {
      setLoading(false);
    }
  }, [mutationFn]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { mutate, loading, error, data, reset };
}

// Hook for paginated data
interface UsePaginatedState<T> extends UseApiState<T[]> {
  page: number;
  setPage: (page: number) => void;
  perPage: number;
  setPerPage: (perPage: number) => void;
  total: number;
  totalPages: number;
  hasMore: boolean;
  loadMore: () => void;
}

export function usePaginatedApi<T>(
  apiCall: (page: number, perPage: number) => Promise<{
    data: T[];
    pagination: {
      page: number;
      per_page: number;
      total: number;
      total_pages: number;
    };
  }>,
  initialPerPage: number = 20
): UsePaginatedState<T> {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(initialPerPage);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchData = useCallback(async (pageNum: number, append: boolean = false) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiCall(pageNum, perPage);
      setTotal(result.pagination.total);
      setTotalPages(result.pagination.total_pages);
      
      if (append) {
        setItems((prev) => [...prev, ...result.data]);
      } else {
        setItems(result.data);
      }
    } catch (err) {
      const axiosError = err as AxiosError<ApiError>;
      setError(
        axiosError.response?.data || {
          message: axiosError.message || 'An error occurred',
          code: 'UNKNOWN_ERROR',
        }
      );
    } finally {
      setLoading(false);
    }
  }, [apiCall, perPage]);

  useEffect(() => {
    fetchData(page, false);
  }, [page, perPage]);

  const loadMore = useCallback(() => {
    if (page < totalPages) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchData(nextPage, true);
    }
  }, [page, totalPages, fetchData]);

  const refetch = useCallback(() => {
    setPage(1);
    fetchData(1, false);
  }, [fetchData]);

  return {
    data: items,
    loading,
    error,
    refetch,
    page,
    setPage,
    perPage,
    setPerPage,
    total,
    totalPages,
    hasMore: page < totalPages,
    loadMore,
  };
}

// Hook for optimistic updates
interface UseOptimisticState<T> {
  data: T | null;
  update: (updater: (prev: T | null) => T | null) => void;
  revert: () => void;
  commit: () => void;
}

export function useOptimistic<T>(initialData: T | null): UseOptimisticState<T> {
  const [data, setData] = useState<T | null>(initialData);
  const [backup, setBackup] = useState<T | null>(initialData);

  const update = useCallback((updater: (prev: T | null) => T | null) => {
    setBackup(data);
    setData(updater(data));
  }, [data]);

  const revert = useCallback(() => {
    setData(backup);
  }, [backup]);

  const commit = useCallback(() => {
    setBackup(data);
  }, [data]);

  return { data, update, revert, commit };
}
