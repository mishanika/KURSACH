import "./ClientUpdate.scss";

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

export const ClientUpdate: React.FC<Props> = ({ data }) => {
  //change type
  const renderClient = ({}, index: number) => <div key={index}></div>;

  return (
    <>
      <div className="update client">{data.map(renderClient)}</div>
    </>
  );
};
