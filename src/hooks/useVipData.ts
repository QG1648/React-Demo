import { useCallback, useEffect, useState } from 'react';
import { mockVipData } from '../mocks/vipData';
import type { VipData } from '../types/vip';

interface UseVipDataResult {
  data: VipData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const fetchVipData = (): Promise<VipData> =>
  new Promise((resolve, reject) => {
    window.setTimeout(() => {
      const shouldFail = new URLSearchParams(window.location.search).get('error') === 'true';

      if (shouldFail) {
        reject(new Error('VIP data request failed. Please try again.'));
        return;
      }

      resolve(mockVipData);
    }, 700);
  });

export const useVipData = (): UseVipDataResult => {
  const [data, setData] = useState<VipData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(() => {
    setLoading(true);
    setError(null);

    fetchVipData()
      .then((vipData) => {
        setData(vipData);
      })
      .catch((requestError: Error) => {
        setError(requestError.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    data,
    loading,
    error,
    refetch: loadData,
  };
};
