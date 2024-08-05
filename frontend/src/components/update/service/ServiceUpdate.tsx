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
};

export const ServiceUpdate: React.FC<Props> = ({ data }) => {
  //change type
  const renderService = ({}, index: number) => <div key={index}></div>;

  return (
    <>
      <div className="update client">{data.map(renderService)}</div>
    </>
  );
};
