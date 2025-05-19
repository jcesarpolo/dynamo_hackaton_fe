import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuthCheck = (redirectIfLoggedIn = null, redirectIfNotLoggedIn = null) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:3000/auth/check", {
          credentials: "include", // Incluye cookies
        });

        const data = await response.json();

        if (data.loggedIn && redirectIfLoggedIn) {
          navigate(redirectIfLoggedIn); // Redirige si está logeado
        } else if (!data.loggedIn && redirectIfNotLoggedIn) {
          navigate(redirectIfNotLoggedIn); // Redirige si no está logeado
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };

    checkAuth();
  }, [navigate, redirectIfLoggedIn, redirectIfNotLoggedIn]);
};

export default useAuthCheck;
