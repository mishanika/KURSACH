import { useAppDispatch } from "../../app/hooks";
import { setError } from "../../features/error/errorSlice";
import { url } from "../../utils/utils";
import "./Service.scss";
import { ServiceGet } from "../../pages/services/Services";

const Service: React.FC<ServiceGet> = ({
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
      serviceId: id,
      accessToken: accessToken,
    };

    const response = await fetch(`${url}/services/order`, {
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
        <img src={photo} alt="" />
      </div>
      <div className="info">
        <div className="number">Service name: {name}</div>
        <div className="type">Duration: {duration} mins</div>

        <div className="description">Description: {description}</div>
      </div>
      <div className="price">
        <span>{price}uah/per night</span>
        <div className="rent" onClick={() => order()}>
          Order
        </div>
      </div>
    </div>
  );
};

export default Service;
