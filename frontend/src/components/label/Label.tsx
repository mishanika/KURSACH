import { useEffect, useState } from "react";
import "./Label.scss";
import { url } from "../../utils/utils";

export type Props = {
  item: string;
  type: string;
  setItem: React.Dispatch<React.SetStateAction<any>>;
  data: string[];
  route?: string;
};

const Label: React.FC<Props> = ({ item, type, setItem, data, route }) => {
  const [options, setOptions] = useState<{ id: number; name: string }[]>([]);

  const getOptions = async () => {
    const response = await fetch(`${url}/${route}`);
    const { data } = await response.json();
    setOptions(data);
  };

  useEffect(() => {
    if (type === "select" && !data.length) {
      getOptions();
    }
  }, []);

  if (type === "input") {
    return (
      <div className="input-wrapper">
        <label htmlFor={`${item}`}>{item}</label>

        <input
          type="text"
          id={`${item}`}
          onChange={(e) => setItem((prev: any) => ({ ...prev, [item.toLowerCase()]: e.target.value }))}
        />
      </div>
    );
  } else if (type === "textarea") {
    return (
      <div className="input-wrapper">
        <label htmlFor={`${item}`}>{item}</label>

        <textarea
          id={`${item}`}
          onChange={(e) => setItem((prev: any) => ({ ...prev, [item.toLowerCase()]: e.target.value }))}
        />
      </div>
    );
  } else if (type === "select") {
    return (
      <div className="input-wrapper">
        <label htmlFor={`${item}`}>{item}</label>

        <select
          id={`${item}`}
          onChange={(e) => setItem((prev: any) => ({ ...prev, [item.toLowerCase()]: e.target.value }))}
        >
          {options.length
            ? options.map(({ id, name }) => <option value={id}>{name}</option>)
            : data.map((item) => <option>{item}</option>)}
        </select>
      </div>
    );
  } else {
    return (
      <div className="input-wrapper">
        <label htmlFor={`${item}`}>{item}</label>

        <input
          type="file"
          id={`${item}`}
          onChange={(e) => setItem((prev: any) => ({ ...prev, [item.toLowerCase()]: e.target.value }))}
        />
      </div>
    );
  }
};

export default Label;
