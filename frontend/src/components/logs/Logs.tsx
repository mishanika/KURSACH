import ReactPaginate from "react-paginate";
import { url } from "../../utils/utils";
import "./Logs.scss";
import { useEffect, useState } from "react";

type Log = {
  amount: number;
  date: string;
  details: string;
  email: string;
  id: number;
  name: string;
  number: string;
  surname: string;
  type: string;
};

type Props = {
  itemsPerPage: number;
};

const Logs: React.FC<Props> = ({ itemsPerPage }) => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [filtered, setFiltered] = useState<Log[]>([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [filters, setFilters] = useState({ name: "", email: "", number: "" });

  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = filtered.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filtered.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filtered.length;
    console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
    setItemOffset(newOffset);
  };

  const renderLogs = ({ id, name, surname, email, number, date, amount, type, details }: Log) => (
    <div className="log">
      <div className="id">{id}</div>
      <div className="name">{name}</div>
      <div className="surname">{surname}</div>
      <div className="email">{email}</div>
      <div className="number">{number}</div>
      <div className="date">{new Date(date).toDateString()}</div>
      <div className="amount">{amount}</div>
      <div className="type">{type}</div>
      <div className="details">{details}</div>
    </div>
  );

  const filter = () => {
    const data = [...logs];
    const temp: Log[] = [];

    if (filters.name) {
      data.forEach((log, id) => {
        if (log.name.includes(filters.name)) {
          temp.push(log);
        }
      });
    }
    if (filters.email) {
      data.forEach((log, id) => {
        if (log.email.includes(filters.email)) {
          temp.push(log);
        }
      });
    }
    if (filters.number) {
      data.forEach((log, id) => {
        if (log.number.includes(filters.number)) {
          temp.push(log);
        }
      });
    }
    setFiltered(temp.length ? temp : data);
  };

  useEffect(() => {
    setFiltered(logs);
  }, [logs]);

  useEffect(() => {
    fetch(`${url}/db/logs`)
      .then((data) => data.json())
      .then((data) => setLogs(data.data.logs));
  }, []);

  return (
    <>
      <div className="filters">
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setFilters((prev) => ({ ...prev, name: e.target.value }))}
        />
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setFilters((prev) => ({ ...prev, email: e.target.value }))}
        />
        <input
          type="text"
          placeholder="Number"
          onChange={(e) => setFilters((prev) => ({ ...prev, number: e.target.value }))}
        />
        <div className="search" onClick={() => filter()}>
          Search
        </div>
      </div>
      <div className="logs">{currentItems.map(renderLogs)}</div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        className="pagination"
      />
    </>
  );
};

export default Logs;
