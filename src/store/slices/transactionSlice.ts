import {SerializedError, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {connectToDatabase} from "../../db/db-service";
import {addTransaction, getTransactions} from "../../db/transactions";
import {Transaction} from "../../types";
import {showMessage} from "react-native-flash-message";

interface InitialState {
  balance: number;
  income: number;
  expenses: number;
  transactions: Transaction[];
  error: SerializedError | undefined;
  isLoading: boolean;
}

const initialState: InitialState = {
  balance: 0,
  income: 0,
  expenses: 0,
  transactions: [],
  error: undefined,
  isLoading: true,
};

export const getTransactionsAsync = createAsyncThunk(
  "transaction/getTransactions",
  async (data, thunkAPI) => {
    try {
      const db = await connectToDatabase();
      const data = await getTransactions(db);

      const formatData = data.reduce(
        (accumulator, currentItem) => {
          if (currentItem.type === "income") {
            accumulator.income += currentItem.amount;
          } else if (currentItem.type === "expense") {
            accumulator.expenses += currentItem.amount;
          }
          accumulator.balance = accumulator.income - accumulator.expenses;
          return accumulator;
        },
        {income: 0, expenses: 0, balance: 0},
      );

      return {...formatData, data};
    } catch (error) {
      return thunkAPI.rejectWithValue({error});
    }
  },
);

export const addTransactionAsync = createAsyncThunk<Transaction, Transaction>(
  "transaction/addTransaction",
  async (data, thunkAPI) => {
    try {
      const {amount, category, date, description, type} = data;
      const db = await connectToDatabase();

      await addTransaction({
        db,
        transaction: {
          amount,
          category,
          date,
          type,
          description,
        },
      });

      showMessage({
        message: "add transaction success",
        type: "success",
      });

      const timestamp = new Date().getTime();
      const randomDigits = Math.floor(Math.random() * 10000);

      return {id: `${timestamp} ${randomDigits}`, ...data};
    } catch (error) {
      showMessage({
        message: "add transaction failed",
        type: "danger",
      });

      return thunkAPI.rejectWithValue({error});
    }
  },
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getTransactionsAsync.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getTransactionsAsync.fulfilled, (state, action) => {
      state.transactions = action.payload!.data as Transaction[];
      state.balance = action.payload!.balance;
      state.expenses = action.payload!.expenses;
      state.income = action.payload!.income;
      state.isLoading = false;
    });
    builder.addCase(getTransactionsAsync.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });

    builder.addCase(addTransactionAsync.fulfilled, (state, action) => {
      state.transactions = [...state.transactions, action.payload];
      state.balance = state.balance + action.payload.amount;

      if (action.payload.type === "income") {
        state.income = state.income + Number(action.payload.amount);
      } else if (action.payload.type === "expense") {
        state.expenses = state.expenses + Number(action.payload.amount);
      }
      state.isLoading = false;
    });
  },
});
export default transactionSlice;
