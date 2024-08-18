import "./ClientUpdate.scss";

export type Client = {
  id: number;
  name: string;
  surname: string;
  email: string;
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

export const ClientUpdate: React.FC<Props> = ({ data, setPopup }) => {
  //change type
  const renderClient = (
    { id, name, surname, email, number, type }: { [key: string]: string },
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
      <div className="email">{email}</div>
      <div className="number">{number}</div>
      <div className="type">{type}</div>
      <div className="delete">Delete</div>
    </div>
  );

  return (
    <>
      <div className="update logs clients-update">{data.map(renderClient)}</div>
    </>
  );
};
