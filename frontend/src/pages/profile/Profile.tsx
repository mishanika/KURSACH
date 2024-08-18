import "./Profile.scss";
import { useAppDispatch } from "../../app/hooks";
import { logout } from "../../features/auth/authSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { url } from "../../utils/utils";
import { ProfileInfo } from "../../types";
import Edit from "../../components/edit/Edit";
import Basket from "../../components/basket/Basket";

type Response = {
  accessToken: string;
  error: string;
  data: ProfileInfo;
};

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  // const { username } = useParams();
  const { id } = useParams();
  const navigate = useNavigate();
  const [profileInfo, setProfileInfo] = useState<ProfileInfo>({
    name: "",
    surname: "",
    photo: "",
    isEditable: false,
  });
  const [popIsOpen, setPopupIsOpen] = useState({ edit: false, basket: false });

  const accessToken = localStorage.getItem("accessToken");

  const logoutHandler = () => {
    dispatch(logout()).then(() => navigate("/"));
  };

  useEffect(() => {
    fetch(`${url}/user/profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ id: id, accessToken: accessToken }),
    })
      .then((data) => data.json())
      .then((data: Response) => {
        localStorage.setItem("accessToken", data.accessToken);
        setProfileInfo(data.data);
        setPopupIsOpen({ basket: false, edit: false });
      });
  }, [id]);

  return (
    <>
      {popIsOpen.edit ? (
        <Edit
          photo={profileInfo.photo}
          name={profileInfo.name}
          surname={profileInfo.surname}
          setProfileInfo={setProfileInfo}
          setPopupIsOpen={setPopupIsOpen}
        />
      ) : null}
      {popIsOpen.basket ? <Basket setPopupIsOpen={setPopupIsOpen} /> : null}
      <div className="profile-wrapper">
        <div className="profile">
          <div className="info">
            {" "}
            <div className="profile-photo">
              {profileInfo.photo.length ? (
                <img src={profileInfo.photo} alt="" />
              ) : null}
            </div>
            <div className="username">
              {profileInfo.name} {profileInfo.surname}
            </div>
            {profileInfo.isEditable ? (
              <div
                className="edit"
                onClick={() =>
                  setPopupIsOpen((prev) => ({ ...prev, edit: true }))
                }
              >
                Edit
              </div>
            ) : null}
          </div>
          <div
            className="basket"
            onClick={() =>
              setPopupIsOpen((prev) => ({ ...prev, basket: true }))
            }
          >
            Basket
          </div>

          <div className="logout" onClick={() => logoutHandler()}>
            Log out
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
