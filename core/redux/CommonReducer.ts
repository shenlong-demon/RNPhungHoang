import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '@core/redux/Store';

export interface CommonState {
  isLoading: boolean;
}

const initialState: CommonState = {
  isLoading: false,
};

export const commonSlice = createSlice({
  name: 'commonSlice',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.isLoading = action.payload;
    },
  },
});

export const {setLoading} = commonSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCommonState = (state: RootState) => state.common.value;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default commonSlice.reducer;
