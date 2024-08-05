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
};

export const MedScheduleUpdate: React.FC<Props> = ({ data }) => {
  //change type
  const renderMedSchedule = ({}, index: number) => <div key={index}></div>;

  return (
    <>
      <div className="update client">{data.map(renderMedSchedule)}</div>
    </>
  );
};
