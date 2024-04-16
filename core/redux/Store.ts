import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import CommonReducer from '@core/redux/CommonReducer';

export const store = configureStore({
  reducer: {
    common: CommonReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
