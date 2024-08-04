import { useAppDispatch } from "../../../app/hooks";
import { setError } from "../../../features/error/errorSlice";
import { url } from "../../../utils/utils";
import Label from "../../label/Label";
import { IKey, medScheduleKeys, roomsKeys } from "../keys";
import "./MedSchedule.scss";
import { useState } from "react";

export type MedSchedule = {
  date: string;
  start: string;
  end: string;
  procedure: string;
  doctor_id: string;
  procedure_id: string;
};

const MedSchedule: React.FC = () => {
  const dispatch = useAppDispatch();

  const [service, setService] = useState<MedSchedule>({
    date: "",
    start: "",
    end: "",
    procedure: "",
    doctor_id: "",
    procedure_id: "",
  });
  const [keys, setKeys] = useState<IKey[]>(medScheduleKeys);

  const createService = async () => {
    const accessToken = localStorage.getItem("accessToken");

    const dataToPost = {
      ...service,
      accessToken: accessToken,
    };

    const response = await fetch(`${url}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(dataToPost),
    });
    const data = await response.json();

    dispatch(setError(data.error ? data.error : "Everything is ok"));
  };

  const labelsRender = (item: IKey) => <Label {...item} setItem={setService} />;

  return (
    <>
      <div className="create service">
        {keys.map(labelsRender)}
        <div className="submit" onClick={() => createService()}>
          Створити
        </div>
      </div>
    </>
  );
};

export default MedSchedule;
