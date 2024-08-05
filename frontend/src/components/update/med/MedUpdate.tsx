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
};

export const MedUpdate: React.FC<Props> = ({ data }) => {
  //change type
  const renderMed = ({}, index: number) => <div key={index}></div>;

  return (
    <>
      <div className="update med">{data.map(renderMed)}</div>
    </>
  );
};
