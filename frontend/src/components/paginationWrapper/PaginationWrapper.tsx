import ReactPaginate from "react-paginate";
import "./PaginationWrapper.scss";
import {
  Children,
  cloneElement,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { selectPagination } from "../../features/pagination/paginationSlice";
import { useAppSelector } from "../../app/hooks";

export type Client = {
  name: string;
  surname: string;
  email: string;
  password: string;
  number: string;
  type: string;
};

export const PaginationWrapper: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const { itemsPerPage, data } = useAppSelector(selectPagination);

  // const [data, setData] = useState<{ [key: string]: string }[]>([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [keys, setKeys] = useState<string[]>([]);

  const endOffset = itemOffset + itemsPerPage;

  const pageCount = Math.ceil(data.length / itemsPerPage);
  const currentItems = data.slice(itemOffset, endOffset);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;

    setItemOffset(newOffset);
  };

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

  const clonedChildren = Children.toArray(children);
  const firstChild = clonedChildren[0];

  return (
    <>
      <div className="pagination-wrapper">
        <div className="table">
          {/* <div className="header">{keys.map(renderHeader)}</div> */}
          {cloneElement(firstChild as React.ReactElement, {
            data: currentItems,
          })}
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
