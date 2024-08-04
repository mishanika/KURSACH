import { Link } from "react-router-dom";
import "./Header.scss";
import { text } from "./text";
import { useAppSelector } from "../../app/hooks";
import { selectAuth } from "../../features/auth/authSlice";

type HeaderPart = {
  text: string;
  path: string;
  route: string;
};

const Header: React.FC = () => {
  const auth = useAppSelector(selectAuth);
  const id = localStorage.getItem("id");

  const headerRender = ({ text, path, route }: HeaderPart) => (
    <>
      {route === "private" && auth.isAuth && (
        <Link to={path === "/profile" ? `${path}/${id}` : path}>
          <div className={text}>{text}</div>
        </Link>
      )}
      {route === "public" && (
        <Link to={path}>
          <div className={text}>{text}</div>
        </Link>
      )}
      {route === "unauth" && !auth.isAuth && (
        <Link to={path}>
          <div className={text}>{text}</div>
        </Link>
      )}
    </>
  );

  return <header className="header">{text.map(headerRender)}</header>;
};

export default Header;
