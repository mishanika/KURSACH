import { useEffect } from "react";
import "./App.css";
import Layout from "./components/layout/Layout";
import { checkAuth, selectAuth } from "./features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { useNavigate } from "react-router-dom";

const App = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useAppSelector(selectAuth);

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    dispatch(checkAuth()).then((data) => {
      if (!data.payload) {
        navigate("/login");
      } else {
        const route = localStorage.getItem("location");
        navigate(route || "/");
      }
    });
  }, []);

  return (
    <div className="App">
      <Layout />
    </div>
  );
};

export default App;
