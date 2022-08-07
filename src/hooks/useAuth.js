import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const useAuth = (token) => {
  const history = useHistory();

  const [auth, setAuth] = useState(null);

  useEffect(() => {
    if (!token) {
      history.push("/");
      setAuth(false);
    }
    setAuth(true);
  }, []);

  return { auth };
};

export default useAuth;
