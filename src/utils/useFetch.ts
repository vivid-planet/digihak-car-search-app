import * as React from 'react';

const loadFromUrl = async <T>(url: string): Promise<{ data: T | null; error: string | null }> => {
    return fetch(url)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(JSON.stringify(response));
            }
        })
        .then((data) => {
            return { data: data as T, error: null };
        })
        .catch((error) => {
            console.error('Fehler: ', error);
            return {
                data: null,
                error: 'Es ist ein Kommunikationsfehler aufgetreten.',
            };
        });
};

export const useFetch = <T>(url: string | null) => {
    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState<T | null>(null);
    const [error, setError] = React.useState<string | null>(null);

    const loadData = React.useCallback(async (url: string) => {
        setLoading(true);

        const loadedData = await loadFromUrl<T>(url);
        if (loadedData.error == null) {
            setData(loadedData.data);
        } else {
            setError(loadedData.error);
        }

        setLoading(false);
    }, []);

    React.useEffect(() => {
        if (url != null) loadData(url);
    }, [url]);

    return { data, error, loading };
};
