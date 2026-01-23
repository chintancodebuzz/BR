import { jwtDecode } from "jwt-decode";

export const getTokenExpiration = (token) => {
    if (!token) return null;
    try {
        const decoded = jwtDecode(token);
        if (!decoded.exp) return null;
        return decoded.exp * 1000;
    } catch (error) {
        return null;
    }
};

export const getTimeUntilExpiration = (token) => {
    const expiration = getTokenExpiration(token);
    if (!expiration) return null;
    return expiration - Date.now();
};

export const isTokenExpired = (token) => {
    const timeLeft = getTimeUntilExpiration(token);
    return timeLeft <= 0;
};
