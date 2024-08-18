import { useEffect, useRef, useState } from "react";
import "./Basket.scss";
import { url } from "../../utils/utils";

type Props = {
  setPopupIsOpen: React.Dispatch<
    React.SetStateAction<{
      basket: boolean;
      edit: boolean;
    }>
  >;
};

const Basket: React.FC<Props> = ({ setPopupIsOpen }) => {
  const [basket, setBasket] = useState<{
    services: any[];
    meds: any[];
    rooms: any[];
  }>({
    services: [],
    meds: [],
    rooms: [],
  });
  const popupRef = useRef<HTMLDivElement>(null);

  const close = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === popupRef.current) {
      setPopupIsOpen((prev) => ({ ...prev, basket: false }));
    }
  };

  const deleteDeal = (id: number, route: string) => {
    const data = {
      id: id,
    };
    fetch(`${url}/${route}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    }).then(() => {
      if (route.includes("room")) {
        setBasket((prev) => ({
          ...prev,
          rooms: prev.rooms.filter((room) => room.id !== id),
        }));
      } else if (route.includes("med")) {
        setBasket((prev) => ({
          ...prev,
          rooms: prev.meds.filter((med) => med.id !== id),
        }));
      } else {
        setBasket((prev) => ({
          ...prev,
          rooms: prev.services.filter((service) => service.id !== id),
        }));
      }
    });
  };

  const renderRooms = ({ id, client_id, room_id, r_number, r_photo }) => (
    <div className="room">
      <div className="photo">
        <img src={r_photo} alt="" />
      </div>
      <div className="deal-info">
        <div className="number">Room number: {r_number}</div>
        <div
          className="edit btn"
          onClick={() => deleteDeal(id, "room/delete-rent")}
        >
          Unrent
        </div>
      </div>
    </div>
  );

  const renderMeds = ({
    id,
    client_id,
    med_id,
    doctor_id,
    m_name,
    m_photo,
    d_name,
    d_surname,
  }) => (
    <div className="med">
      <div className="photo">
        <img src={m_photo} alt="" />
      </div>
      <div className="deal-info">
        <div className="name">Procedure name: {m_name}</div>
        <div className="d-name">
          {d_name} {d_surname}
        </div>

        <div
          className="edit btn"
          onClick={() => deleteDeal(id, "med-services/delete-order")}
        >
          Unorder
        </div>
      </div>
    </div>
  );

  const renderServices = ({ id, client_id, service_id, s_name, s_photo }) => (
    <div className="service">
      <div className="photo">
        <img src={s_photo} alt="" />
      </div>
      <div className="deal-info">
        <div className="name">Procedure name: {s_name}</div>

        <div
          className="edit btn"
          onClick={() => deleteDeal(id, "services/delete-order")}
        >
          Unorder
        </div>
      </div>
    </div>
  );

  const getOrders = async () => {
    const roomsResponse = await fetch(`${url}/room/rents`);
    const roomsData = await roomsResponse.json();

    const medsResponse = await fetch(`${url}/med-services/orders`);
    const medsData = await medsResponse.json();

    const servicesResponse = await fetch(`${url}/services/orders`);
    const servicesData = await servicesResponse.json();

    setBasket({
      services: servicesData,
      meds: medsData,
      rooms: roomsData,
    });
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="popup-wrapper" onClick={(e) => close(e)} ref={popupRef}>
      <div className="info basket">
        <div className="with-label">
          <span> Rooms:</span>
          <div className="basket-rooms">{basket.rooms.map(renderRooms)}</div>
        </div>
        <div className="with-label">
          <span> Services:</span>
          <div className="basket-services">
            {basket.services.map(renderServices)}
          </div>
        </div>
        <div className="with-label">
          <span> Med services:</span>
          <div className="basket-meds">{basket.meds.map(renderMeds)}</div>
        </div>
      </div>
    </div>
  );
};

export default Basket;
