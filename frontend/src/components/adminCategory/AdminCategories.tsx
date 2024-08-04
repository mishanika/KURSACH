import { useRef } from "react";
import { Categories } from "../../pages/admin/Admin";
import { url } from "../../utils/utils";
import "./AdminCategories.scss";
import { Category, text } from "./text";
import { setError } from "../../features/error/errorSlice";
import { useAppDispatch } from "../../app/hooks";

type Props = {
  categories: Categories;
  setCategories: React.Dispatch<React.SetStateAction<Categories>>;
};

const AdminCategories: React.FC<Props> = ({ categories, setCategories }) => {
  const dispatch = useAppDispatch();
  const aRef = useRef<HTMLAnchorElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const changeCategory = (prop: string) => {
    const data = { ...categories };
    for (const key in data) {
      if (key === prop) {
        data[key as keyof typeof data] = true;
      } else {
        data[key as keyof typeof data] = false;
      }
    }
    setCategories(data);
  };

  const categoryRender = ({ text, prop }: Category) => (
    <div
      className={`category${categories[prop as keyof typeof categories] ? " active" : ""}`}
      onClick={() => changeCategory(prop)}
    >
      {text}
    </div>
  );

  const backup = async () => {
    const response = await fetch(`${url}/db/backup`);
    const data = await response.blob();

    const blobUrl = URL.createObjectURL(data);

    if (aRef.current) {
      aRef.current.href = blobUrl;
      aRef.current.download = "backup.bacpac";

      aRef.current.dispatchEvent(
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          view: window,
        })
      );
    }
  };

  const restore = async () => {
    const form = new FormData();
    if (inputRef.current && inputRef.current.files) {
      form.append("file", inputRef.current.files[0]);
      // inputRef.current.files = null;
    }
    console.log(form.getAll("file"));
    const response = await fetch(`${url}/db/restore`, {
      method: "POST",
      body: form,
    });

    dispatch(setError(response.ok ? "Backup restored" : "Something bad happened"));
  };

  return (
    <div className="categories-wrapper">
      <div className="categories">{text.map(categoryRender)}</div>

      <div className="db">
        <a ref={aRef}></a>
        <div className="backup" onClick={() => backup()}>
          <span>Backup</span>
        </div>
        <div className="restore">
          <input type="file" onChange={() => restore()} ref={inputRef} />
          <span>Restore</span>
        </div>
      </div>
    </div>
  );
};

export default AdminCategories;
