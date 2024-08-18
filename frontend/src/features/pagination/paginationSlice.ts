import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export type Pagination = {
  route: string;
  itemsPerPage: number;
  data: { [key: string]: string }[];
};

const initialState: Pagination = {
  route: "user",
  itemsPerPage: 5,
  data: [],
};

export const paginationSlice = createSlice({
  name: "pagination",
  initialState,

  reducers: {
    setRoute: (state, { payload }: PayloadAction<string>) => {
      state.route = payload;
    },

    setData: (
      state,
      { payload }: PayloadAction<{ [key: string]: string }[]>
    ) => {
      state.data = payload;
    },
  },
});

export const { setRoute, setData } = paginationSlice.actions;

export const selectPagination = (state: RootState): Pagination =>
  state.pagination;

export default paginationSlice.reducer;
