import { useEffect, useState } from "react";

export const useUser = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setLoading(false);
            return;
        }

        fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(async (res) => {
                if (res.ok) {
                    const data = await res.json();
                    setUser(data);
                }
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    return { user, loading };
};
