import "./MedScheduleUpdate.scss";

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

export const MedScheduleUpdate: React.FC<Props> = ({ data, setPopup }) => {
  //change type
  const renderMedSchedule = (
    {
      id,
      start,
      end,
      p_name,
      d_name,
      p_duration,
      p_price,
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
      <div className="start">{start}</div>
      <div className="end">{end}</div>
      <div className="p_name">{p_name}</div>
      <div className="p_duration">{p_duration}</div>
      <div className="p_price">{p_price}</div>
      <div className="d_name">{d_name}</div>
      <div className="d_surname">{d_surname}</div>
      <div className="delete">Delete</div>
    </div>
  );

  return (
    <>
      <div className="update logs medSchedule-update">
        {data.map(renderMedSchedule)}
      </div>
    </>
  );
};
