import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isHidden: true,
  isPopupHidden:false
};

const hideSlice = createSlice({
  name: "hide",
  initialState,
  reducers: {
    setHideState: (state, action) => {
      state.isHidden = action.payload;
    },
    setPopUpState:(state,action)=>{
      state.isPopupHidden = action.payload;

    }
  },
});

export const { setHideState ,setPopUpState } = hideSlice.actions;
export default hideSlice.reducer;
