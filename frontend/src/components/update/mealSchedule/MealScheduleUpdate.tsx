import "./MealScheduleUpdate.scss";

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

export const MealScheduleUpdate: React.FC<Props> = ({ data, setPopup }) => {
  //change type
  const renderMealSchedule = (
    { id, breakfast, dinner, supper, day }: { [key: string]: string },
    index: number
  ) => (
    <div
      key={index}
      className="log"
      onClick={() => setPopup((prev) => ({ isOpen: true, index }))}
    >
      <div className="id">{id}</div>
      <div className="day">{day}</div>
      <div className="breakfast">{breakfast}</div>
      <div className="dinner">{dinner}</div>
      <div className="supper">{supper}</div>
      <div className="delete">Delete</div>
    </div>
  );

  return (
    <>
      <div className="update logs schedule-update">
        {data.map(renderMealSchedule)}
      </div>
    </>
  );
};
