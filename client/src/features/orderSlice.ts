import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type Order = {
  _id: string;
  name: string;
  quantity: number;
  size?: string;
  notes?: string;
  status: string;
  totalPrice?: number;
  createdAt: string;
};

interface OrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  loading: false,
  error: null,
};

export const fetchOrders = createAsyncThunk("orders/fetchAll", async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(import.meta.env.VITE_API_URL + "/orders", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data as Order[];
});

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearOrders(state) {
      state.orders = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrders.rejected, (state, action: any) => {
        state.error = action.payload?.message || "Failed to fetch orders";
        state.loading = false;
      });
  },
});

export const { clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
