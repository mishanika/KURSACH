import "./Admin.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { ProfileInfo } from "../../types";
import AdminCategories from "../../components/adminCategory/AdminCategories";
import Client from "../../components/create/client/Client";
import Error from "../../components/error/Error";
import { selectError } from "../../features/error/errorSlice";
import Service from "../../components/create/service/Service";
import Personal from "../../components/create/personal/Personal";
import Med from "../../components/create/med/Med";
import Room from "../../components/create/rooms/Room";
import MedSchedule from "../../components/create/medSchedule/MedSchedule";
import MealSchedule from "../../components/create/mealSchedule/MealSchedule";
import Logs from "../../components/logs/Logs";

type Response = {
  accessToken: string;
  error: string;
  data: ProfileInfo;
};
export type Categories = {
  clients: boolean;
  personnel: boolean;
  services: boolean;
  medServices: boolean;
  rooms: boolean;
  medSchedule: boolean;
  mealSchedule: boolean;
  logs: boolean;
};

const Admin: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isSeen } = useAppSelector(selectError);
  const navigate = useNavigate();

  const [popIsOpen, setPopupIsOpen] = useState({ friends: false, edit: false });
  const [categories, setCategories] = useState<Categories>({
    clients: true,
    personnel: false,
    services: false,
    medServices: false,
    rooms: false,
    medSchedule: false,
    mealSchedule: false,
    logs: false,
  });

  return (
    <>
      {popIsOpen.edit ? <></> : null}
      <div className="admin-wrapper">
        {isSeen ? <Error /> : null}
        <div className="content">
          <AdminCategories categories={categories} setCategories={setCategories} />
          <div className="overflow">
            {categories.clients ? <Client /> : null}
            {categories.services ? <Service /> : null}
            {categories.personnel ? <Personal /> : null}
            {categories.medServices ? <Med /> : null}
            {categories.rooms ? <Room /> : null}
            {categories.medSchedule ? <MedSchedule /> : null}
            {categories.mealSchedule ? <MealSchedule /> : null}
            {categories.logs ? <Logs itemsPerPage={5} /> : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
