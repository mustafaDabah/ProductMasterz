'use client'

import { BASIC_URL } from '@/utils/basicURL';
import { useState, useEffect, useRef, useCallback } from 'react';

const useFetchData = (endpoint) => {
    // Data, loading, and error states.
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const isMounted = useRef(true);

    // The function to fetch data.
    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(`${BASIC_URL}/${endpoint}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            if (isMounted.current) {
                setData(result);
                setLoading(false);
            }
        } catch (error) {
            if (isMounted.current) {
                setError(error);
                setLoading(false);
            }
        }
    }, [endpoint]);

    // Initial fetch when the component mounts.
    useEffect(() => {
        fetchData();

        return () => {
            // Mark the component as unmounted.
            isMounted.current = false;
        };
    }, [fetchData]);  // Fetch again if the URL changes.

    // Return the fetched data, loading and error states, and a refetch function.
    return { data, loading, error, refetch: fetchData };
};

export default useFetchData;
