import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { checkAuth, checkIsAdmin, selectAuth } from "../../features/auth/authSlice";
import { useEffect } from "react";

const PrivateRoute: React.FC = () => {
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isInitial) {
      dispatch(checkAuth()).then((data) => {
        if (!data.payload) {
          navigate("/login");
        }
      });
      dispatch(checkIsAdmin()).then((data) => !data.payload && navigate("/"));
    }
  }, []);

  if (auth.isLoadingAuth) {
    return <div>Checking auth...</div>;
  }
  if (auth.isAuth) {
    return <Outlet />;
  } else {
    // return <Navigate to="/login" />;
    return <></>;
  }
};

export default PrivateRoute;
