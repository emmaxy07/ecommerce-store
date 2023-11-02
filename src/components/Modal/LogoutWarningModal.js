import { useState, useEffect } from "react";
import "./LogoutWarningModal.css";

const events = [
    "load",
    "mousemove",
    "mousedown",
    "click",
    "scroll",
    "keypress",
    "pointermove",
    "touchmove"
];

function LogoutWarningModal() {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        let inactivityTimer;

        const openModal = () => {
            setShowModal(true);
        };

        const resetInactivityTimer = () => {
            if (inactivityTimer) {
                clearTimeout(inactivityTimer);
            }
            console.log("here")
            inactivityTimer = setTimeout(openModal, 7000); // 7 seconds of inactivity
        };

        const handleActivity = () => {
            resetInactivityTimer();
            if (showModal) {
                setShowModal(false);
            }
        };

        // Add event listeners to reset the inactivity timer
        events.forEach((event) => {
            window.addEventListener(event, handleActivity);
        });

        // Cleanup event listeners when the component unmounts
        return () => {
            events.forEach((event) => {
                window.removeEventListener(event, handleActivity);
            });
        };
    }, [showModal]);

    return (
        <div>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>You've been inactive</h2>
                        <p>We'll log you out for security reasons.</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LogoutWarningModal;
