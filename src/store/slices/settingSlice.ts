import {createSlice} from "@reduxjs/toolkit";

interface InitialState {
  showOnBoarding: boolean;
}

const initialState: InitialState = {showOnBoarding: true};

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    toggelOnBoarding: (state, action) => {
      state.showOnBoarding = action.payload;
    },
  },
  extraReducers: builder => {},
});
export default settingSlice;
export const {toggelOnBoarding} = settingSlice.actions;
