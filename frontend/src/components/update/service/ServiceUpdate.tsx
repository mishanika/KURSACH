import "./ServiceUpdate.scss";

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

export const ServiceUpdate: React.FC<Props> = ({ data, setPopup }) => {
  const renderService = (
    {
      id,
      name,
      description,
      price,
      category,
      photo,
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
      <div className="price">{price}</div>
      <div className="category">{category}</div>
      <div className="photo">{photo}</div>
      <div className="delete">Delete</div>
    </div>
  );

  return (
    <>
      <div className="update logs services-update">
        {data.map(renderService)}
      </div>
    </>
  );
};
