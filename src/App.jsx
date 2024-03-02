import Router from "./router";
import Navbar from "./components/Navbar";
import { useAuth } from "./context/auth";
import { useEffect } from "react";

function App() {
  const { setLogin } = useAuth();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLogin(localStorage.getItem("token"));
    }
  }, []);
  return (
    <>
      <Navbar />
      <Router />
    </>
  );
}

export default App;
