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
import { ArrowLeft } from "../../assets/svg/ArrowLeft";
import { ArrowRight } from "../../assets/svg/ArrowRight";

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
  const [isCreate, setIsCreate] = useState(true);
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
      {isSeen && <Error />}
      {popIsOpen.edit ? <></> : null}
      <div className="admin-wrapper">
        <ArrowLeft isCreate={isCreate} setIsCreate={setIsCreate} />

        <div className="content">
          <AdminCategories
            categories={categories}
            setCategories={setCategories}
          />
          <div className="overflow">
            {categories.clients && (isCreate ? <Client /> : null)}
            {categories.services && (isCreate ? <Service /> : null)}
            {categories.personnel && (isCreate ? <Personal /> : null)}
            {categories.medServices && (isCreate ? <Med /> : null)}
            {categories.rooms && (isCreate ? <Room /> : null)}
            {categories.medSchedule && (isCreate ? <MedSchedule /> : null)}
            {categories.mealSchedule && (isCreate ? <MealSchedule /> : null)}
            {categories.logs && <Logs itemsPerPage={5} />}
          </div>
        </div>

        <ArrowRight isCreate={isCreate} setIsCreate={setIsCreate} />
      </div>
    </>
  );
};

export default Admin;
