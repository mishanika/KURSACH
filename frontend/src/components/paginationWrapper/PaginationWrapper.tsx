import ReactPaginate from "react-paginate";
import "./PaginationWrapper.scss";
import {
  createElement,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";
import { url } from "../../utils/utils";

export type Client = {
  name: string;
  surname: string;
  email: string;
  password: string;
  number: string;
  type: string;
};

type Props = {
  itemsPerPage: number;
  route: string;
};

export const PaginationWrapper: React.FC<PropsWithChildren & Props> = ({
  itemsPerPage,
  route,
  children,
}) => {
  const [data, setData] = useState<{ [key: string]: string }[]>([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [keys, setKeys] = useState<string[]>([]);

  const endOffset = itemOffset + itemsPerPage;

  const pageCount = Math.ceil(data.length / itemsPerPage);
  const currentItems = data.slice(itemOffset, endOffset);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;

    setItemOffset(newOffset);
  };

  const renderHeader = (item: string, index: number) => (
    <div className="" key={index}>
      {item}
    </div>
  );

  useEffect(() => {
    fetch(`${url}/${route}`)
      .then((data) => data.json())
      .then((data) => setData(data));
  }, []);

  useEffect(() => {
    const tempData: string[] = [];
    for (const key in data[0]) {
      const label = key.split("");
      label[0] = label[0].toUpperCase();

      const deleteUnderline = label.join("").split("_").join(" ");
      tempData.push(deleteUnderline);
    }
    setKeys(tempData);
  }, [data]);

  return (
    <>
      <div className="pagination-wrapper">
        <div className="table">
          <div className="header">{keys.map(renderHeader)}</div>
          {createElement(
            "div",
            {
              data: currentItems,
            },
            children
          )}
        </div>
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
      </div>
    </>
  );
};
