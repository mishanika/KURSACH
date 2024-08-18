import { useAppDispatch } from "../../../app/hooks";
import { setError } from "../../../features/error/errorSlice";
import { url } from "../../../utils/utils";
import { uploadImg } from "../../edit/helpers";
import Label from "../../label/Label";
import { IKey, roomsKeys } from "../keys";
import "./Room.scss";
import { useState } from "react";

export type Room = {
  number: string;
  type: string;
  price: string;
  photo: FileList | null;
  description: string;
};

const Room: React.FC = () => {
  const dispatch = useAppDispatch();

  const [service, setService] = useState<Room>({
    number: "",
    type: "",
    price: "",
    photo: null,
    description: "",
  });
  const [keys, setKeys] = useState<IKey[]>(roomsKeys);

  const createService = async () => {
    const accessToken = localStorage.getItem("accessToken");

    const dataToPost = {
      ...service,
      accessToken: accessToken,
    };

    const response = await fetch(`${url}/room/create`, {
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
      "Rooms",
      "rooms/photo"
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

export default Room;
