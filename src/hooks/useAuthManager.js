import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser, getProfile } from "../slices/authSlice";
import { getTimeUntilExpiration } from "../utils/tokenUtils";
import { toastEvents } from "../utils/toastEventEmitter";

export const useAuthManager = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { accessToken, refreshToken, isAuthenticated } = useSelector((state) => state.auth);

    const accessTimerRef = useRef(null);
    const refreshTimerRef = useRef(null);

    const clearTimers = () => {
        if (accessTimerRef.current) {
            clearTimeout(accessTimerRef.current);
            accessTimerRef.current = null;
        }
        if (refreshTimerRef.current) {
            clearTimeout(refreshTimerRef.current);
            refreshTimerRef.current = null;
        }
    };

    useEffect(() => {
        if (!isAuthenticated) {
            clearTimers();
            return;
        }

        clearTimers();

        const handleLogout = (tokenType) => {
            console.warn(`Token expired: ${tokenType}. Logging out...`);
            toastEvents.error(`Session expired (${tokenType}). Please login again.`, { title: "Session Expired" });
            dispatch(logoutUser());
            navigate("/login");
        };

        if (accessToken && accessToken !== "undefined" && accessToken !== "null") {
            const accessTimeLeft = getTimeUntilExpiration(accessToken);

            if (accessTimeLeft !== null) {
                if (accessTimeLeft <= 5000) {
                    handleLogout("access token");
                } else {
                    accessTimerRef.current = setTimeout(() => {
                        handleLogout("access token");
                    }, accessTimeLeft - 5000);
                }
            }
        }

        if (refreshToken && refreshToken !== "undefined" && refreshToken !== "null") {
            const refreshTimeLeft = getTimeUntilExpiration(refreshToken);

            if (refreshTimeLeft !== null) {
                if (refreshTimeLeft <= 5000) {
                    handleLogout("refresh token");
                } else {
                    refreshTimerRef.current = setTimeout(() => {
                        handleLogout("refresh token");
                    }, refreshTimeLeft - 5000);
                }
            }
        }

        return () => clearTimers();
    }, [accessToken, refreshToken, isAuthenticated, dispatch]);

    // Heartbeat check to monitor account status (deactivation by admin)
    // useEffect(() => {
    //     if (!isAuthenticated) return;

    //     // Initial check
    //     dispatch(getProfile());

    //     const heartbeatInterval = setInterval(() => {
    //         dispatch(getProfile());
    //     }, 60000); // Check every 60 seconds

    //     return () => clearInterval(heartbeatInterval);
    // }, [isAuthenticated, dispatch]);

    return null;
};
