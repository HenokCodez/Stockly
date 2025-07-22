import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type Product = {
  _id: string;
  name: string;
  price: number;
  image?: string;
  category?: string;
};

interface ProductState {
  items: Product[];
  loading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
  filters: {
    search: string;
    category: string;
  };
}

const initialState: ProductState = {
  items: [],
  loading: false,
  error: null,
  page: 1,
  hasMore: true,
  filters: {
    search: "",
    category: "",
  },
};

export const getProducts = createAsyncThunk("products/getAll", async (_, { getState }) => {
  const state = getState() as { products: ProductState };
  const { page, filters } = state.products;

  const token = localStorage.getItem("token");
  const res = await axios.get(import.meta.env.VITE_API_URL + "/products", {
    headers: { Authorization: `Bearer ${token}` },
    params: {
      page,
      search: filters.search,
      category: filters.category,
    },
  });

  return res.data;
});

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.filters.search = action.payload;
      state.page = 1;
      state.items = [];
      state.hasMore = true;
    },
    setCategory(state, action: PayloadAction<string>) {
      state.filters.category = action.payload;
      state.page = 1;
      state.items = [];
      state.hasMore = true;
    },
    nextPage(state) {
      state.page += 1;
    },
    resetProducts(state) {
      state.page = 1;
      state.items = [];
      state.hasMore = true;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        if (!Array.isArray(action.payload) || action.payload.length === 0) {
          state.hasMore = false;
        } else {
          state.items = [...state.items, ...action.payload];
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.error = (action.error && action.error.message) || (typeof action.payload === "string" ? action.payload : "Failed to load products");
        state.loading = false;
      });
  },
});

export const { setSearch, setCategory, nextPage, resetProducts } = productSlice.actions;
export default productSlice.reducer;
