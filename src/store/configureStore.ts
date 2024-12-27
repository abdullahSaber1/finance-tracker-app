import {combineReducers, configureStore} from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {persistStore, persistReducer} from "redux-persist";

import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import settingSlice from "./slices/settingSlice";
import transactionSlice from "./slices/transactionSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["setting"],
  blacklist: ["transaction"],
};
const rootReducer = combineReducers({
  transaction: transactionSlice.reducer,
  setting: settingSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
