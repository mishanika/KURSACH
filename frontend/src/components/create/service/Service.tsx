import { useAppDispatch } from "../../../app/hooks";
import { setError } from "../../../features/error/errorSlice";
import { url } from "../../../utils/utils";
import { uploadImg } from "../../edit/helpers";
import Label from "../../label/Label";
import { IKey, serviceKeys } from "../keys";
import "./Service.scss";
import { useEffect, useState } from "react";

export type Service = {
  name: string;
  description: string;
  price: string;
  duration: string;
  category: string;
  photo: FileList | null;
};

const Service: React.FC = () => {
  const dispatch = useAppDispatch();

  const [service, setService] = useState<Service>({
    name: "",
    description: "",
    price: "",
    duration: "",
    category: "",
    photo: null,
  });
  const [keys, setKeys] = useState<IKey[]>(serviceKeys);

  const createService = async () => {
    const accessToken = localStorage.getItem("accessToken");

    const dataToPost = {
      ...service,
      accessToken: accessToken,
    };

    const response = await fetch(`${url}/services/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(dataToPost),
    });
    const data = await response.json();

    await uploadImg(
      data,
      service.photo,
      "photo/change",
      "Services",
      "services/photo"
    );

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

export default Service;
