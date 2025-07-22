import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser, getMe } from "../api/auth";

// For login (email + password only)
interface AuthCredentials {
  email: string;
  password: string;
}

// For register (name + email + password)
interface RegisterCredentials extends AuthCredentials {
  name: string;
}

// Login thunk
export const login = createAsyncThunk("auth/login", async (data: AuthCredentials, thunkAPI) => {
  try {
    return await loginUser(data); // Make API call to login
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Login failed");
  }
});

// Register thunk
export const register = createAsyncThunk("auth/register", async (data: RegisterCredentials, thunkAPI) => {
  try {
    return await registerUser(data); // Make API call to register
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Registration failed");
  }
});

// Get current user
export const fetchMe = createAsyncThunk("auth/fetchMe", async (_, thunkAPI) => {
  try {
    return await getMe(); // Make API call to fetch current user info
  } catch {
    return thunkAPI.rejectWithValue("Not authenticated");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null as any,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("token"); // Clear token from storage
    },
  },
  extraReducers(builder) {
    builder
      // 🔓 login success
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      // 🆕 register success
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      // 👤 fetchMe success
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      // ⏳ pending (all auth-related async actions)
      .addMatcher(
        (action) => action.type.startsWith("auth/") && action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      // ❌ rejected (all auth-related async actions)
      .addMatcher(
        (action) => action.type.startsWith("auth/") && action.type.endsWith("/rejected"),
        (state, action: any) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
