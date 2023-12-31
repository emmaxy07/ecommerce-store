import { useEffect } from "react";

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

const AppLogout = ({ children }) => {
  // const [isWarningModalOpen, setWarningModalOpen] = useState(false);
    let timer;

    const handleLogoutTimer = () => {
        timer = setTimeout(() => {
          // clears any pending timer.
          resetTimer();
          // Listener clean up. Removes the existing event listener from the window
          Object.values(events).forEach((item) => {
            window.removeEventListener(item, resetTimer);
          });
          // logs out user
          logoutAction();
        }, 20000); // 200000ms = 20secs. You can change the time.
      }; 
      
      // this resets the timer if it exists.
      const resetTimer = () => {
        if (timer) clearTimeout(timer);
      };

      useEffect(() => {
        Object.values(events).forEach((item) => {
          window.addEventListener(item, () => {
            resetTimer();
            handleLogoutTimer();
          });
        });
      });

      const logoutAction = () => {
        localStorage.clear();
        window.location.pathname = "/";
      };

    return (
      <div>
        {children}
      </div>
    );
  };

  export default AppLogout;