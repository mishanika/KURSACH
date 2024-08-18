import "./RoomUpdate.scss";

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

export const RoomUpdate: React.FC<Props> = ({ data, setPopup }) => {
  //change type
  const renderRoom = (
    { id, number, type, price, photo, description }: { [key: string]: string },
    index: number
  ) => (
    <div
      key={index}
      className="log"
      onClick={() => setPopup((prev) => ({ isOpen: true, index }))}
    >
      <div className="id">{id}</div>
      <div className="name">{number}</div>
      <div className="description">{description}</div>
      <div className="price">{price}</div>
      <div className="type">{type}</div>
      <div className="photo">{photo}</div>
      <div className="delete">Delete</div>
    </div>
  );

  return (
    <>
      <div className="update logs rooms-update">{data.map(renderRoom)}</div>
    </>
  );
};
