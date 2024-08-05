import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

type Props = {
  isCreate: boolean;
  setIsCreate: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ArrowRight: React.FC<Props> = ({ isCreate, setIsCreate }) => {
  return (
    <div
      onClick={() => setIsCreate(false)}
      style={{ opacity: isCreate ? "1" : "0" }}
    >
      <ArrowForwardIosIcon />
    </div>
  );
};
