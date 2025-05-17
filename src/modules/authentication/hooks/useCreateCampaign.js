import { useState, useRef, useCallback } from 'react';

export const useCreateCampaign = () => {
    const [createResponse, setCreateResponse] = useState(null);
    const [isCreateLoading, setIsCreateLoading] = useState(false);
    const [createError, setCreateError] = useState(null);

    // Create a ref to store controller so we can abort later
    const controllerRef = useRef(null);

    const handleCreate = useCallback(async (query) => {
        // Abort previous request if still in progress
        if (controllerRef.current) {
        controllerRef.current.abort();
        }

        const controller = new AbortController();
        controllerRef.current = controller;

        setIsCreateLoading(true);
        setCreateError(null);
        setCreateResponse(null);

        try {
            console.log({...query});
            
            const res = await fetch(`/api/camapigns/create-new`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                signal: controller.signal,
                body: JSON.stringify({...query})
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                
                throw errorData?.details?.message || 'Failed to Create';
            }

            const result = await res.json();
            setCreateResponse(result);
        } catch (err) {
            if (err.name === 'AbortError') {
                console.log('Request was aborted.');
            } else {
                console.error('Create Campaign error:', err);
                setCreateError(err);
            }
        } finally {
            setIsCreateLoading(false);
        }
    }, []);

    const cancelCreate = () => {
        if (controllerRef.current) {
            controllerRef.current.abort();
        }
    };

    return { createResponse, isCreateLoading, createError, handleCreate, cancelCreate };
};