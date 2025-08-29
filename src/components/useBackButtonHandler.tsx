import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const useBackButtonHandler = (homePath: string = "/") => {
  const navigate = useNavigate();
  const location = useLocation();
  const backPressRef = useRef(0);

  useEffect(() => {
    const handlePopState = () => {
      // Only trigger double-back on Home
      if (location.pathname === homePath) {
        if (backPressRef.current === 0) {
          backPressRef.current++;
          alert("Press back again to exit");
          window.history.pushState(null, "", window.location.href);
          setTimeout(() => (backPressRef.current = 0), 2000);
        } else {
          window.history.go(-2); // actually exit
        }
      } else {
        // For other pages, just go back in history
        navigate(-1);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [location, navigate, homePath]);
};
