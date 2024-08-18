export const url = process.env.REACT_APP_SERVER_URL || "http://localhost:3030";
export const urlFront =
  process.env.REACT_APP_SERVER_URL || "http://localhost:3000";

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

  const filteredData = data.filter((item) => {
    // Для каждого элемента проверяем, соответствует ли он всем фильтрам
    for (const key in filters) {
      if (filters[key]) {
        if (key === "duration" || key === "price") {
          if (parseInt(item[key]) < parseInt(filters[key])) {
            return false; // Если элемент не соответствует фильтру, исключаем его
          }
        } else {
          if (!`${item[key]}`.includes(filters[key])) {
            return false; // Если элемент не соответствует фильтру, исключаем его
          }
        }
      }
    }
    return true; // Если элемент соответствует всем фильтрам, он включается в отфильтрованные данные
  });

  // Если фильтрованный массив пуст, возвращаем оригинальные данные
  setFiltered(filteredData.length ? filteredData : data);
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
