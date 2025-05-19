import { useState, useRef, useCallback } from 'react';

export const useFetchCampaigns = () => {
  const [allCampaigns, setAllCampaigns] = useState([]);
  const [totalCampaigns, setTotalCampaigns] = useState();
  const [loadingCampaigns, setLoadingCampaigns] = useState(false);
  const [campaignError, setCampaignError] = useState(null);

  // Create a ref to store controller so we can abort later
  const controllerRef = useRef(null);


  const fetchCampaigns = useCallback(async ({companyID, limit, index}) => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    setLoadingCampaigns(true);
    setCampaignError(null);
    try {
      const response = await fetch(`/api/campaigns/get-all?companyID=${companyID}&limit=${limit||10}&index=${index||0}`, {
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw errorData?.message || 'Failed to fetch Campaigns';
      }

      const result = await response.json();
      setAllCampaigns(result.Campaigns || []);
      setTotalCampaigns(result.totalCount || 0);
      return result;
    } catch (err) {
      if (err.name === 'AbortError') {
        console.log('Request was aborted.');
      } else {
        console.error('Campaigns fetch error:', err);
        setCampaignError(err instanceof Error ? err.message : 'Failed to fetch Campaigns');
        throw err;
      }
    } finally {
      setLoadingCampaigns(false);
    }
  }, []);

  const cancelCampaignsOperation = () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
  };

  return { allCampaigns, totalCampaigns, loadingCampaigns, campaignError, fetchCampaigns, cancelCampaignsOperation };
};
