import "./MedUpdate.scss";

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

export const MedUpdate: React.FC<Props> = ({ data, setPopup }) => {
  //change type
  const renderMed = (
    {
      id,
      name,
      description,
      duration,
      price,
      photo,
      doctor_id,
      d_name,
      d_surname,
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
      <div className="description">{description}</div>
      <div className="duration">{duration}</div>
      <div className="price">{price}</div>
      <div className="photo">{photo}</div>
      <div className="d_name">{d_name}</div>
      <div className="d_surname">{d_surname}</div>
      <div className="delete">Delete</div>
    </div>
  );

  return (
    <>
      <div className="update logs med-update">{data.map(renderMed)}</div>
    </>
  );
};
