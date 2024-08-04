import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export type Error = {
  error: string;
  isSeen: boolean;
};

const initialState: Error = {
  error: "",
  isSeen: false,
};

export const errorSlice = createSlice({
  name: "error",
  initialState,

  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isSeen = true;
    },
    setNotSeen: (state) => {
      state.isSeen = false;
    },
  },
});

export const { setError, setNotSeen } = errorSlice.actions;

export const selectError = (state: RootState): Error => state.error;

export default errorSlice.reducer;
