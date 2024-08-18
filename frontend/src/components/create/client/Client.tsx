import { useAppDispatch } from "../../../app/hooks";
import { setError } from "../../../features/error/errorSlice";
import { url } from "../../../utils/utils";
import Label from "../../label/Label";
import { IKey, clientKeys } from "../keys";
import "./Client.scss";
import { useState } from "react";

export type Client = {
  name: string;
  surname: string;
  email: string;
  password: string;
  number: string;
  type: string;
};

const Client: React.FC = () => {
  const dispatch = useAppDispatch();

  const [client, setClient] = useState<Client>({
    name: "",
    surname: "",
    email: "",
    password: "",
    number: "",
    type: "",
  });
  const [keys, setKeys] = useState<IKey[]>(clientKeys);

  const createClient = async () => {
    const accessToken = localStorage.getItem("accessToken");

    const dataToPost = {
      ...client,
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

  const labelsRender = (item: IKey) => <Label {...item} setItem={setClient} />;

  return (
    <>
      <div className="create client">
        {keys.map(labelsRender)}
        <div className="submit" onClick={() => createClient()}>
          Створити
        </div>
      </div>
    </>
  );
};

export default Client;
