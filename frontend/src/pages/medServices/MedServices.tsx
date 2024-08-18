import ReactPaginate from "react-paginate";
import { filter, handlePageClick, url } from "../../utils/utils";
import "./MedServices.scss";
import { useEffect, useState } from "react";
import Room from "../../components/room/Room";
import { useAppSelector } from "../../app/hooks";
import { selectError } from "../../features/error/errorSlice";
import Error from "../../components/error/Error";
import { Med as MedType } from "../../components/create/med/Med";
import Med from "../../components/med/Med";

export type MedGet = {
  id: number;
} & MedType;

type Props = {
  itemsPerPage: number;
};

const MedServices: React.FC<Props> = ({ itemsPerPage }) => {
  const { isSeen } = useAppSelector(selectError);
  const [medServices, setMedServices] = useState<MedGet[]>([]);
  const [filtered, setFiltered] = useState<MedGet[]>([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [filters, setFilters] = useState({ name: "", email: "", number: "" });

  const endOffset = itemOffset + itemsPerPage;

  const currentItems = filtered.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filtered.length / itemsPerPage);

  const renderRooms = (item: MedGet) => <Med {...item} />;

  useEffect(() => {
    setFiltered(medServices);
  }, [medServices]);

  useEffect(() => {
    fetch(`${url}/med-services`)
      .then((data) => data.json())
      .then((data) => setMedServices(data.data));
  }, []);

  return (
    <div className="items-wrapper">
      {isSeen ? <Error /> : null}
      <div className="content">
        <div className="filters">
          <div
            className="find"
            onClick={() => filter(medServices, filters, setFiltered)}
          >
            Find
          </div>
        </div>
        <div className="pagination-wrapper">
          <div className="items meds">{currentItems.map(renderRooms)}</div>
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

export default MedServices;
