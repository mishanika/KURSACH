import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

type Props = {
  isCreate: boolean;
  setIsCreate: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ArrowLeft: React.FC<Props> = ({ isCreate, setIsCreate }) => {
  return (
    <div
      onClick={() => setIsCreate(true)}
      style={{ opacity: isCreate ? "0" : "1" }}
    >
      <ArrowBackIosNewIcon />
    </div>
  );
};
