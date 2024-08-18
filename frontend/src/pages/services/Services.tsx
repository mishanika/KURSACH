import ReactPaginate from "react-paginate";
import { filter, handlePageClick, url } from "../../utils/utils";
import "./Services.scss";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectError } from "../../features/error/errorSlice";
import Error from "../../components/error/Error";
import Med from "../../components/med/Med";
import { Service as ServiceType } from "../../components/create/service/Service";
import Service from "../../components/service/Service";

export type ServiceGet = {
  id: number;
} & ServiceType;

type Props = {
  itemsPerPage: number;
};

const Services: React.FC<Props> = ({ itemsPerPage }) => {
  const { isSeen } = useAppSelector(selectError);
  const [services, setServices] = useState<ServiceGet[]>([]);
  const [filtered, setFiltered] = useState<ServiceGet[]>([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [filters, setFilters] = useState({});

  const endOffset = itemOffset + itemsPerPage;

  const currentItems = filtered.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filtered.length / itemsPerPage);

  const renderRooms = (item: ServiceGet) => <Service {...item} />;

  useEffect(() => {
    setFiltered(services);
  }, [services]);

  useEffect(() => {
    fetch(`${url}/services`)
      .then((data) => data.json())
      .then((data) => setServices(data.data));
  }, []);

  return (
    <div className="items-wrapper">
      {isSeen ? <Error /> : null}
      <div className="content">
        <div className="filters on-page">
          <input
            type="text"
            placeholder="Name"
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <input
            type="text"
            placeholder="Price"
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, price: e.target.value }))
            }
          />

          <div
            className="search"
            onClick={() => filter(services, filters, setFiltered)}
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

export default Services;
