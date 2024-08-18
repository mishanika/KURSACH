import "./Admin.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
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
import { ClientUpdate } from "../../components/update/client/ClientUpdate";
import { ServiceUpdate } from "../../components/update/service/ServiceUpdate";
import { PersonalUpdate } from "../../components/update/personal/PersonalUpdate";
import { MedUpdate } from "../../components/update/med/MedUpdate";
import { RoomUpdate } from "../../components/update/rooms/RoomUpdate";
import { MedScheduleUpdate } from "../../components/update/medSchedule/MedScheduleUpdate";
import { MealScheduleUpdate } from "../../components/update/mealSchedule/MealScheduleUpdate";
import { url } from "../../utils/utils";
import { PaginationWrapper } from "../../components/paginationWrapper/PaginationWrapper";
import {
  selectPagination,
  setData,
  setRoute,
} from "../../features/pagination/paginationSlice";
import { UpdatePopup } from "../../components/updatePopup/UpdatePopup";
import {
  clientKeys,
  mealKeys,
  medKeys,
  medScheduleKeys,
  personalKeys,
  roomsKeys,
  serviceKeys,
} from "../../components/create/keys";

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
  const { route } = useAppSelector(selectPagination);
  const { isSeen } = useAppSelector(selectError);
  const navigate = useNavigate();

  const [popup, setPopup] = useState({ isOpen: false, index: 0 });
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
  const [keys, setKeys] = useState(clientKeys);

  useEffect(() => {
    if (!isCreate && !categories.logs) {
      fetch(`${url}/${route}`)
        .then((data) => data.json())
        .then((data) => dispatch(setData(data.data)));
    }
  }, [isCreate, route]);

  useEffect(() => {
    // let route = "";
    if (categories.clients) {
      setKeys(clientKeys);
      dispatch(setRoute("user"));
    } else if (categories.personnel) {
      setKeys(personalKeys);
      dispatch(setRoute("personnel"));
    } else if (categories.services) {
      setKeys(serviceKeys);
      dispatch(setRoute("services"));
    } else if (categories.medServices) {
      setKeys(medKeys);
      dispatch(setRoute("med-services"));
    } else if (categories.rooms) {
      setKeys(roomsKeys);
      dispatch(setRoute("room"));
    } else if (categories.medSchedule) {
      setKeys(medScheduleKeys);
      dispatch(setRoute("med-schedule"));
    } else if (categories.mealSchedule) {
      setKeys(mealKeys);
      dispatch(setRoute("meal-schedule"));
    }
    // setRoute(route);
  }, [categories]);

  return (
    <>
      {isSeen && <Error />}
      {popup.isOpen && (
        <UpdatePopup setPopup={setPopup} keys={keys} index={popup.index} />
      )}

      <div className="admin-wrapper">
        <div className="content">
          <div className="withArrows">
            <ArrowLeft isCreate={isCreate} setIsCreate={setIsCreate} />
            <AdminCategories
              categories={categories}
              setCategories={setCategories}
            />
            <ArrowRight isCreate={isCreate} setIsCreate={setIsCreate} />
          </div>

          <div className="overflow">
            {categories.clients &&
              (isCreate ? (
                <Client />
              ) : (
                <PaginationWrapper>
                  <ClientUpdate data={[]} setPopup={setPopup} />
                </PaginationWrapper>
              ))}
            {categories.services &&
              (isCreate ? (
                <Service />
              ) : (
                <PaginationWrapper>
                  <ServiceUpdate data={[]} setPopup={setPopup} />
                </PaginationWrapper>
              ))}
            {categories.personnel &&
              (isCreate ? (
                <Personal />
              ) : (
                <PaginationWrapper>
                  <PersonalUpdate data={[]} setPopup={setPopup} />
                </PaginationWrapper>
              ))}
            {categories.medServices &&
              (isCreate ? (
                <Med />
              ) : (
                <PaginationWrapper>
                  <MedUpdate data={[]} setPopup={setPopup} />
                </PaginationWrapper>
              ))}
            {categories.rooms &&
              (isCreate ? (
                <Room />
              ) : (
                <PaginationWrapper>
                  <RoomUpdate data={[]} setPopup={setPopup} />
                </PaginationWrapper>
              ))}
            {categories.medSchedule &&
              (isCreate ? (
                <MedSchedule />
              ) : (
                <PaginationWrapper>
                  <MedScheduleUpdate data={[]} setPopup={setPopup} />
                </PaginationWrapper>
              ))}
            {categories.mealSchedule &&
              (isCreate ? (
                <MealSchedule />
              ) : (
                <PaginationWrapper>
                  <MealScheduleUpdate data={[]} setPopup={setPopup} />
                </PaginationWrapper>
              ))}
            {categories.logs && <Logs itemsPerPage={5} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
