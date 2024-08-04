import Login from "../../pages/login/Login";
import Registration from "../../pages/registration/Registration";
import Profile from "../../pages/profile/Profile";
import Admin from "../../pages/admin/Admin";
import Rooms from "../../pages/rooms/Rooms";

export type IRoute = {
  path: string;
  element: JSX.Element;
};

export const unauthRoutes: IRoute[] = [
  {
    path: "/register",
    element: <Registration />,
  },
  {
    path: "/login",
    element: <Login />,
  },
];

export const publicRoutes: IRoute[] = [
  {
    path: "/",
    element: <></>,
  },
];

export const privateRoutes: IRoute[] = [
  {
    path: "/profile/:id",
    element: <Profile />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/rooms",
    element: <Rooms itemsPerPage={10} />,
  },
  {
    path: "/med",
    element: <Rooms itemsPerPage={10} />,
  },
  {
    path: "/services",
    element: <Rooms itemsPerPage={10} />,
  },
];
