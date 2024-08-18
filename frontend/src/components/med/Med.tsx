import { useAppDispatch } from "../../app/hooks";
import { setError } from "../../features/error/errorSlice";
import { url } from "../../utils/utils";
import "./Med.scss";
import { MedGet } from "../../pages/medServices/MedServices";

const Med: React.FC<MedGet> = ({
  id,
  name,
  duration,
  price,
  photo,
  description,
}) => {
  const dispatch = useAppDispatch();

  const order = async () => {
    const accessToken = localStorage.getItem("accessToken");

    const dataToPost = {
      medId: id,
      accessToken: accessToken,
    };

    const response = await fetch(`${url}/med-services/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(dataToPost),
    });
    const data = await response.json();

    dispatch(setError(data.error ? data.error : "Everything is ok"));
  };

  return (
    <div className="item med">
      <div className="photo">
        <img src={`${photo}`} alt="" />
      </div>
      <div className="info">
        <div className="number">Service name: {name}</div>
        <div className="type">Duration: {duration} mins</div>

        <div className="description">Description: {description}</div>
      </div>
      <div className="price">
        <span>{price}uah</span>
        <div className="rent" onClick={() => order()}>
          Order
        </div>
      </div>
    </div>
  );
};

export default Med;
