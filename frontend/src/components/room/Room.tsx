import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { setError } from "../../features/error/errorSlice";
import { RoomGet } from "../../pages/rooms/Rooms";
import { url } from "../../utils/utils";
import "./Room.scss";

const Room: React.FC<RoomGet> = ({ id, number, type, price, photo, description }) => {
  const dispatch = useAppDispatch();

  const rent = async () => {
    const accessToken = localStorage.getItem("accessToken");

    const dataToPost = {
      roomId: id,
      accessToken: accessToken,
    };

    const response = await fetch(`${url}/room/rent`, {
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
    <div className="room">
      <div className="photo">
        <img src={photo} alt="" />
      </div>
      <div className="info">
        <div className="number">Room number: {number}</div>
        <div className="type">Type: {type}</div>

        <div className="description">Description: {description}</div>
      </div>
      <div className="price">
        <span>{price}uah/per night</span>
        <div className="rent" onClick={() => rent()}>
          Rent
        </div>
      </div>
    </div>
  );
};

export default Room;
