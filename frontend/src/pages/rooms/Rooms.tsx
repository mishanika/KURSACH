import ReactPaginate from "react-paginate";
import { filter, handlePageClick, url } from "../../utils/utils";
import "./Rooms.scss";
import { useEffect, useState } from "react";
import { Room as RoomType } from "../../components/create/rooms/Room";
import Room from "../../components/room/Room";
import { useAppSelector } from "../../app/hooks";
import { selectError } from "../../features/error/errorSlice";
import Error from "../../components/error/Error";

export type RoomGet = {
  id: number;
} & RoomType;

type Props = {
  itemsPerPage: number;
};

const Rooms: React.FC<Props> = ({ itemsPerPage }) => {
  const { isSeen } = useAppSelector(selectError);
  const [rooms, setRooms] = useState<RoomGet[]>([]);
  const [filtered, setFiltered] = useState<RoomGet[]>([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [filters, setFilters] = useState({ name: "", email: "", number: "" });

  const endOffset = itemOffset + itemsPerPage;

  const currentItems = filtered.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filtered.length / itemsPerPage);

  const renderRooms = (item: RoomGet) => <Room {...item} />;

  useEffect(() => {
    setFiltered(rooms);
  }, [rooms]);

  useEffect(() => {
    fetch(`${url}/room`)
      .then((data) => data.json())
      .then((data) => setRooms(data.data));
  }, []);

  return (
    <div className="items-wrapper">
      {isSeen ? <Error /> : null}
      <div className="content">
        <div className="filters">
          <div
            className="find"
            onClick={() => filter(rooms, filters, setFiltered)}
          >
            Find
          </div>
        </div>
        <div className="pagination-wrapper">
          <div className="items rooms">{currentItems.map(renderRooms)}</div>
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={(e) =>
              handlePageClick(e, itemsPerPage, filtered.length, setItemOffset)
            }
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            className="pagination"
          />
        </div>
      </div>
    </div>
  );
};

export default Rooms;
