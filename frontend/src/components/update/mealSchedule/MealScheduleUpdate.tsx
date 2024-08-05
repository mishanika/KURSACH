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
};

export const MealScheduleUpdate: React.FC<Props> = ({ data }) => {
  //change type
  const renderMealSchedule = ({}, index: number) => <div key={index}></div>;

  return (
    <>
      <div className="update schedule">{data.map(renderMealSchedule)}</div>
    </>
  );
};
