import { useAppDispatch } from "../../../app/hooks";
import { setError } from "../../../features/error/errorSlice";
import { url } from "../../../utils/utils";
import Label from "../../label/Label";
import { IKey, medKeys } from "../keys";
import "./Med.scss";
import { useState } from "react";

export type Med = {
  name: string;
  description: string;
  duration: string;
  price: string;
  photo: string;
  doctor_id: string;
};

const Med: React.FC = () => {
  const dispatch = useAppDispatch();

  const [service, setService] = useState<Med>({
    name: "",
    description: "",
    duration: "",
    price: "",
    photo: "",
    doctor_id: "",
  });
  const [keys, setKeys] = useState<IKey[]>(medKeys);

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

export default Med;
