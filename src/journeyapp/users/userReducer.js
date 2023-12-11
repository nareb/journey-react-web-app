import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  statusList: [], // Add an array to store user statuses
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },

    addStatus: (state, action) => {
      state.statusList.push(action.payload);
    },

  },
});

export const { setCurrentUser, addStatus } = userSlice.actions;
export default userSlice.reducer;
