import { useState, useRef, useCallback } from 'react';

export const useDeleteContact = () => {
    const [deleteResponse, setDeleteResponse] = useState(null);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);
    const [deleteError, setDeleteError] = useState(null);

    const controllerRef = useRef(null);

    const handleDelete = useCallback(async ({ companyID, phoneNumber }) => {
        if (controllerRef.current) {
            controllerRef.current.abort();
        }

        const controller = new AbortController();
        controllerRef.current = controller;

        setIsDeleteLoading(true);
        setDeleteError(null);
        setDeleteResponse(null);

        try {
            const res = await fetch(
                `/api/Contacts/delete?companyID=${companyID}&phoneNumber=${phoneNumber}`,
                {
                    method: 'DELETE',
                    signal: controller.signal
                }
            );

            if (!res.ok) {
                let errorMessage = 'Failed to Delete';
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
            setDeleteResponse(result);
        } catch (err) {
            if (err.name === 'AbortError') {
                console.log('Request was aborted.');
            } else {
                console.error('Delete Contact error:', err);
                setDeleteError(err);
            }
        } finally {
            setIsDeleteLoading(false);
        }
    }, []);

    const cancelDelete = () => {
        if (controllerRef.current) {
            controllerRef.current.abort();
        }
    };

    return { deleteResponse, isDeleteLoading, deleteError, handleDelete, cancelDelete };
};
