import { useAppDispatch } from "../../../app/hooks";
import { setError } from "../../../features/error/errorSlice";
import { url } from "../../../utils/utils";
import Label from "../../label/Label";
import { IKey, personalKeys, serviceKeys } from "../keys";
import "./Personal.scss";
import { useState } from "react";

export type Personal = {
  name: string;
  surname: string;
  position: string;
  schedule: string;
  salary: string;
  password: string;
  number: string;
  type: string;
};

const Personal: React.FC = () => {
  const dispatch = useAppDispatch();

  const [service, setService] = useState<Personal>({
    name: "",
    surname: "",
    position: "",
    schedule: "",
    salary: "",
    password: "",
    number: "",
    type: "",
  });
  const [keys, setKeys] = useState<IKey[]>(personalKeys);

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

export default Personal;
