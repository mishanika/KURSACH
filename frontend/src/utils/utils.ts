export const url = process.env.REACT_APP_SERVER_URL || "http://localhost:3030";
export const urlFront = process.env.REACT_APP_SERVER_URL || "http://localhost:3000";

export const validateEmail = (email: string) => {
  return email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const filter = (
  notFiltered: any[],
  filters: { [key: string]: string },
  setFiltered: React.Dispatch<React.SetStateAction<any[]>>
) => {
  const data = [...notFiltered];
  const temp: any[] = [];

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

export const handlePageClick = (
  event: any,
  itemsPerPage: number,
  filteredLength: number,
  setItemOffset: React.Dispatch<React.SetStateAction<number>>
) => {
  const newOffset = (event.selected * itemsPerPage) % filteredLength;
  setItemOffset(newOffset);
};
