import { useEffect, useState } from "react";
import "./Label.scss";
import { url } from "../../utils/utils";

export type Props = {
  item: string;
  type: string;
  setItem: React.Dispatch<React.SetStateAction<any>>;
  optionsData: string[];
  route?: string;
  itemData?: { [key: string]: string };
  isUpdate?: boolean;
};

const Label: React.FC<Props> = ({
  item,
  type,
  setItem,
  optionsData,
  route,
  itemData,
  isUpdate,
}) => {
  const [options, setOptions] = useState<
    { id: number; name: string; surname?: string }[]
  >([]);

  const getOptions = async () => {
    const response = await fetch(`${url}/${route}`);
    const { data } = await response.json();
    setOptions(data);
  };

  useEffect(() => {
    if (type === "select" && !optionsData.length) {
      getOptions();
    }
  }, []);

  if (type === "input") {
    return (
      <div className={"input-wrapper" + (isUpdate ? " isUpdate" : "")}>
        <label htmlFor={`${item}`}>{item}</label>

        <input
          type="text"
          id={`${item}`}
          value={(itemData && itemData[item.toLowerCase()]) || ""}
          onChange={(e) =>
            setItem((prev: any) => ({
              ...prev,
              [item.toLowerCase()]: e.target.value,
            }))
          }
        />
      </div>
    );
  } else if (type === "textarea") {
    return (
      <div className={"input-wrapper" + (isUpdate ? " isUpdate" : "")}>
        <label htmlFor={`${item}`}>{item}</label>

        <textarea
          id={`${item}`}
          value={(itemData && itemData[item.toLowerCase()]) || ""}
          onChange={(e) =>
            setItem((prev: any) => ({
              ...prev,
              [item.toLowerCase()]: e.target.value,
            }))
          }
        />
      </div>
    );
  } else if (type === "select") {
    return (
      <div className={"input-wrapper" + (isUpdate ? " isUpdate" : "")}>
        <label htmlFor={`${item}`}>{item}</label>

        <select
          id={`${item}`}
          onChange={(e) =>
            setItem((prev: any) => ({
              ...prev,
              [item.toLowerCase()]: e.target.value,
            }))
          }
        >
          {options.length
            ? options.map(({ id, name, surname }) => (
                <option value={id}>
                  {name} {surname || ""}
                </option>
              ))
            : optionsData.map((item) => <option>{item}</option>)}
        </select>
      </div>
    );
  } else {
    return (
      <div className={"input-wrapper" + (isUpdate ? " isUpdate" : "")}>
        <label htmlFor={`${item}`}>{item}</label>

        <input
          type="file"
          id={`${item}`}
          onChange={(e) =>
            setItem((prev: any) => ({
              ...prev,
              [item.toLowerCase()]: e.target.value,
            }))
          }
        />
      </div>
    );
  }
};

export default Label;
