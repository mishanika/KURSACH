import { useRef } from "react";
import "./Edit.scss";
import { url } from "../../utils/utils";
import { ref, uploadBytes } from "firebase/storage";
import { bucket } from "../../firebase/firebase";
import { ProfileInfo } from "../../types";

type Props = {
  photo: string;
  name: string;
  surname: string;
  setPopupIsOpen: React.Dispatch<
    React.SetStateAction<{
      friends: boolean;
      edit: boolean;
    }>
  >;
  setProfileInfo: React.Dispatch<React.SetStateAction<ProfileInfo>>;
};

const Edit: React.FC<Props> = ({ name, surname, photo, setPopupIsOpen, setProfileInfo }) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const photoRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const surnameRef = useRef<HTMLInputElement>(null);

  const close = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === popupRef.current) {
      setPopupIsOpen((prev) => ({ ...prev, edit: false }));
    }
  };

  const edit = async () => {
    const data = {
      type: "withPhoto",
      name: nameRef.current?.value ? nameRef.current?.value : name,
      surname: surnameRef.current?.value ? surnameRef.current?.value : surname,
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

    if (photoRef.current && photoRef.current.files?.length) {
      const name = `${resData.data.id}.${photoRef.current.files[0].type.split("/")[1]}`;
      const firebaseRef = ref(bucket, `userPhoto/${name}`);
      const metadata = {
        contentType: photoRef.current.files[0].type,
      };

      await uploadBytes(firebaseRef, photoRef.current.files[0], metadata);

      const data = {
        photoName: name,
        accessToken: localStorage.getItem("accessToken"),
      };

      fetch(`${url}/user/edit/photo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(data),
      })
        .then((data) => data.json())
        .then((data) => {
          setProfileInfo(data.data);
        });
      console.log(name);
      return;
    }

    // delete resData.id;
    // delete resData.type;
    setProfileInfo(resData.data);
  };

  return (
    <div className="popup-wrapper" onClick={(e) => close(e)} ref={popupRef}>
      <form className="info" ref={formRef}>
        <div className="photo-wrapper">
          <span>Click to choose a photo or drag and drop it</span>
          <input type="file" ref={photoRef} />
        </div>
        <div className="text-wrapper">
          Name:
          <input type="text" placeholder={name} ref={nameRef} />
        </div>
        <div className="text-wrapper">
          Surname:
          <input type="text" placeholder={surname} ref={surnameRef} />
        </div>
        <div className="edit" onClick={() => edit()}>
          Edit
        </div>
      </form>
    </div>
  );
};

export default Edit;
