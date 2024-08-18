import { useEffect, useRef, useState } from "react";
import "./UpdatePopup.scss";
import { url } from "../../utils/utils";
import { ref, uploadBytes } from "firebase/storage";
import { bucket } from "../../firebase/firebase";
import { ProfileInfo } from "../../types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectPagination,
  setData,
} from "../../features/pagination/paginationSlice";
import { clientKeys, IKey } from "../create/keys";
import Label from "../label/Label";
import { uploadImg } from "../edit/helpers";

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
  const dispatch = useAppDispatch();
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
    const dataToPost = {
      ...item,
      accessToken: localStorage.getItem("accessToken"),
    };

    const response = await fetch(`${url}/${route}/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(dataToPost),
    });

    const resData = await response.json();
    const uploaded = await uploadImg(
      dataToPost,
      item.photo,
      "photo/change",
      "Services",
      "services/photo"
    );

    const temData = [...data];
    temData[index] = { ...item };
    temData[index].photo = uploaded.photo;

    dispatch(setData(temData));
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
