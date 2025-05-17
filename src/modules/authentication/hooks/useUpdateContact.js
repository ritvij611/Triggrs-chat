import { useState, useRef, useCallback } from 'react';

export const useUpdateContact = () => {
    const [updateResponse, setUpdateResponse] = useState(null);
    const [isUpdateLoading, setIsUpdateLoading] = useState(false);
    const [updateError, setUpdateError] = useState(null);

    // Create a ref to store controller so we can abort later
    const controllerRef = useRef(null);

    const handleUpdate = useCallback(async (query) => {
        // Abort previous request if still in progress
        if (controllerRef.current) {
        controllerRef.current.abort();
        }

        const controller = new AbortController();
        controllerRef.current = controller;

        setIsUpdateLoading(true);
        setUpdateError(null);
        setUpdateResponse(null);

        try {
            console.log({...query});
            
            const res = await fetch(`/api/contacts/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                signal: controller.signal,
                body: JSON.stringify({...query})
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                
                throw errorData?.details?.message || 'Failed to Update';
            }

            const result = await res.json();
            setUpdateResponse(result);
        } catch (err) {
            if (err.name === 'AbortError') {
                console.log('Request was aborted.');
            } else {
                console.error('Update Contact error:', err);
                setUpdateError(err);
            }
        } finally {
            setIsUpdateLoading(false);
        }
    }, []);

    const cancelUpdate = () => {
        if (controllerRef.current) {
            controllerRef.current.abort();
        }
    };

    return { updateResponse, isUpdateLoading, updateError, handleUpdate, cancelUpdate };
};