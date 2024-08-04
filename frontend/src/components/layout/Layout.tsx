import "./Layout.scss";
import Routing from "../router/Routing";
import Header from "../header/Header";
import { useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();

  // console.log(location);
  return (
    <div className="layout">
      {!location.pathname.includes("/table") ? <Header /> : null}

      <Routing />
    </div>
  );
};

export default Layout;
