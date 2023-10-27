import { useState, useEffect } from "react";
import "./LogoutWarningModal.css";

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
      inactivityTimer = setTimeout(openModal, 2000); // 4 seconds of inactivity
    };

    const handleActivity = () => {
      resetInactivityTimer();
      if (showModal) {
        setShowModal(false);
      }
    };

    // Add event listeners to reset the inactivity timer
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);

    // Cleanup event listeners when the component unmounts
    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
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
