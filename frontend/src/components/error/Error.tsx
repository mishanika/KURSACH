import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectError, setNotSeen } from "../../features/error/errorSlice";
import "./Error.scss";
import { useEffect } from "react";

const Error: React.FC = () => {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector(selectError);

  useEffect(() => {
    setTimeout(() => dispatch(setNotSeen()), 3000);
  }, []);

  return (
    <>
      <div className="error">{error}</div>
    </>
  );
};

export default Error;
