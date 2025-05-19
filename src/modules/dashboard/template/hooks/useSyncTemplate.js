import { useState, useRef, useCallback } from 'react';

export const useSyncTemplate = () => {
    const [syncResponse, setSyncResponse] = useState(null);
    const [isSyncLoading, setIsSyncLoading] = useState(false);
    const [syncError, setSyncError] = useState(null);

    const controllerRef = useRef(null);

    const handleSync = useCallback(async (query) => {
        if (controllerRef.current) {
            controllerRef.current.abort();
        }

        const controller = new AbortController();
        controllerRef.current = controller;

        setIsSyncLoading(true);
        setSyncError(null);
        setSyncResponse(null);

        try {
            const res = await fetch(
                `/api/templates/sync`,
                {
                    method: 'POST',
                    body: JSON.stringify({...query}),
                    signal: controller.signal
                }
            );

            if (!res.ok) {
                let errorMessage = 'Failed to Sync';
                try {
                    const errorData = await res.json();
                    errorMessage = errorData?.message || errorMessage;
                } catch {
                    const text = await res.text();
                    errorMessage = text || errorMessage;
                }
                throw new Error(errorMessage);
            }

            const result = await res.json();
            console.log(result)
            setSyncResponse(result);
        } catch (err) {
            if (err.name === 'AbortError') {
                console.log('Request was aborted.');
            } else {
                console.error('Sync Template error:', err);
                setSyncError(err);
            }
        } finally {
            setIsSyncLoading(false);
        }
    }, []);

    const cancelSync = () => {
        if (controllerRef.current) {
            controllerRef.current.abort();
        }
    };

    return { syncResponse, isSyncLoading, syncError, handleSync, cancelSync };
};
