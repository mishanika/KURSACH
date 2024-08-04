import { useRef, useState } from "react";
import Eye from "../../assets/svg/Eye";
import "./Login.scss";
import { LoginData } from "../../types";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { checkIsAdmin, loginUser, selectAuth } from "../../features/auth/authSlice";

const Login: React.FC = () => {
  const passRef = useRef<HTMLInputElement>(null);
  const passLabelRef = useRef<HTMLLabelElement>(null);
  const loginLabelRef = useRef<HTMLLabelElement>(null);
  const [data, setData] = useState<LoginData>({ login: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);

  const handleData = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    setData((prev) => ({ ...prev, [key as keyof typeof data]: e.target.value }));
  };

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dataToPost = {
      ...data,
    };

    if (!auth.isLoadingAuth) {
      dispatch(loginUser(dataToPost)).then((data) => data.payload && navigate("/"));
    }
  };

  return (
    <div className="login-wrapper">
      <form action="" className="login-form" onSubmit={(e) => login(e)}>
        <div className="login">
          <label htmlFor="login" ref={loginLabelRef}>
            Login
          </label>
          <input type="text" placeholder="email" id="login" onChange={(e) => handleData(e, "login")} />
        </div>
        <div className="password">
          <label htmlFor="password" ref={passLabelRef}>
            Password
          </label>
          <div className="pass-wrapper">
            <input
              type="password"
              placeholder="password"
              id="password"
              ref={passRef}
              onChange={(e) => handleData(e, "password")}
            />
            <Eye passRef={passRef} />
          </div>
        </div>

        <button type="submit" className="submit">
          Увійти
        </button>
      </form>
    </div>
  );
};

export default Login;
