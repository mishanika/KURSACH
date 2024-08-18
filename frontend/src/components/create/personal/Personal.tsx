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
  salary: string;
  clientId: string;
};

const Personal: React.FC = () => {
  const dispatch = useAppDispatch();

  const [service, setService] = useState<Personal>({
    name: "",
    surname: "",
    salary: "",
    clientId: "",
  });
  const [keys, setKeys] = useState<IKey[]>(personalKeys);

  const createService = async () => {
    const accessToken = localStorage.getItem("accessToken");

    const dataToPost = {
      ...service,
      accessToken: accessToken,
    };

    const response = await fetch(`${url}/personnel/create`, {
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
