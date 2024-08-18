import "./PersonalUpdate.scss";

export type Client = {
  name: string;
  surname: string;
  email: string;
  password: string;
  number: string;
  type: string;
};

type Props = {
  data: { [key: string]: string }[];
  setPopup: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      index: number;
    }>
  >;
};

export const PersonalUpdate: React.FC<Props> = ({ data, setPopup }) => {
  //change type
  const renderPersonal = (
    {
      id,
      name,
      surname,
      salary,
      client_id,
      c_name,
      c_surname,
      c_email,
      c_number,
    }: { [key: string]: string },
    index: number
  ) => (
    <div
      key={index}
      className="log"
      onClick={() => setPopup((prev) => ({ isOpen: true, index }))}
    >
      <div className="id">{id}</div>
      <div className="name">{name}</div>
      <div className="surname">{surname}</div>
      <div className="salary">{salary}</div>
      <div className="c_email">{c_email}</div>
      <div className="c_number">{c_number}</div>
      <div className="c_name">{c_name}</div>
      <div className="c_surname">{c_surname}</div>
      <div className="delete">Delete</div>
    </div>
  );

  return (
    <>
      <div className="update logs personal-update">
        {data.map(renderPersonal)}
      </div>
    </>
  );
};
