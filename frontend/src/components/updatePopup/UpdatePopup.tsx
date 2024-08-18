import { useEffect, useRef, useState } from "react";
import "./UpdatePopup.scss";
import { url } from "../../utils/utils";
import { ref, uploadBytes } from "firebase/storage";
import { bucket } from "../../firebase/firebase";
import { ProfileInfo } from "../../types";
import { useAppSelector } from "../../app/hooks";
import { selectPagination } from "../../features/pagination/paginationSlice";
import { clientKeys, IKey } from "../create/keys";
import Label from "../label/Label";

type Props = {
  keys: IKey[];
  index: number;
  setPopup: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      index: number;
    }>
  >;
};

export const UpdatePopup: React.FC<Props> = ({ keys, index, setPopup }) => {
  const { route, data } = useAppSelector(selectPagination);
  const [item, setItem] = useState(data[index]);
  const popupRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const close = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === popupRef.current) {
      setPopup((prev) => ({ ...prev, isOpen: false }));
    }
  };

  const edit = async () => {
    const data = {
      accessToken: localStorage.getItem("accessToken"),
    };

    const response = await fetch(`${url}/user/edit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    });

    const resData = await response.json();
  };

  const labelsRender = (key: IKey) => (
    <Label {...key} setItem={setItem} itemData={item} isUpdate={true} />
  );

  return (
    <div
      className="admin-update-popup-wrapper"
      onClick={(e) => close(e)}
      ref={popupRef}
    >
      <form className="info" ref={formRef}>
        {keys.map(labelsRender)}
        <div className="edit" onClick={() => edit()}>
          Update
        </div>
      </form>
    </div>
  );
};
