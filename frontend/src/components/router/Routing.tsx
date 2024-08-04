import { Routes, Route, useLocation } from "react-router-dom";
import { IRoute, unauthRoutes, privateRoutes, publicRoutes } from "./routes";
import PrivateRoute from "./PrivateRoute";
import { useEffect } from "react";

const Routing = () => {
  const location = useLocation();
  const renderRoute = ({ path, element }: IRoute) => {
    return <Route path={path} element={element} key={path} />;
  };

  const rememberRoute = () => {
    if (location.pathname === "/login" || location.pathname === "/register") {
      return;
    }
    localStorage.setItem("location", location.pathname);
  };

  useEffect(() => {
    rememberRoute();
  }, [location]);

  return (
    <Routes>
      {publicRoutes.map(renderRoute)}
      {unauthRoutes.map(renderRoute)}
      <Route path="" element={<PrivateRoute />}>
        {privateRoutes.map(renderRoute)}
      </Route>
    </Routes>
  );
};

export default Routing;
