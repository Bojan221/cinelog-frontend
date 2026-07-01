import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import axiosAuth from "@/app/api/axiosAuth";
import { decodeToken, AuthUser } from "@/app/api/decodeToken";
import { setAccessToken, clearAccessToken } from "@/app/api/tokenStore";

const getErrorMessage = (err: unknown, fallback: string) => {
  const axiosErr = err as AxiosError<{ message?: string }>;
  return axiosErr.response?.data?.message ?? fallback;
};

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export const registerUser = createAsyncThunk<
  string,
  RegisterPayload,
  { rejectValue: string }
>("auth/register", async (payload, { rejectWithValue }) => {
  try {
    const { data } = await axiosAuth.post("/auth/register", payload);
    return data.message as string;
  } catch (err) {
    return rejectWithValue(getErrorMessage(err, "Failed to create account"));
  }
});

export const loginUser = createAsyncThunk<
  AuthUser,
  LoginPayload,
  { rejectValue: string }
>("auth/login", async (payload, { rejectWithValue }) => {
  try {
    const { data } = await axiosAuth.post("/auth/login", payload);
    const token = data.accessToken as string;
    setAccessToken(token);
    const user = decodeToken(token);
    if (!user) return rejectWithValue("Could not read session token");
    return user;
  } catch (err) {
    return rejectWithValue(getErrorMessage(err, "Login failed"));
  }
});

// Called once on app start to restore a session from the refresh cookie.
export const initAuth = createAsyncThunk<AuthUser | null>(
  "auth/init",
  async () => {
    try {
      const { data } = await axiosAuth.post("/auth/refresh");
      const token = data.accessToken as string;
      setAccessToken(token);
      return decodeToken(token);
    } catch {
      return null;
    }
  }
);

type AuthStatus = "idle" | "loading" | "authenticated";

interface AuthState {
  user: AuthUser | null;
  status: AuthStatus;
  error: string | null;
  initialized: boolean; 
}

const initialState: AuthState = {
  user: null,
  status: "idle",
  error: null,
  initialized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      clearAccessToken();
      state.user = null;
      state.status = "idle";
      state.error = null;
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "authenticated";
        state.error = null;
      })
      .addCase(initAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = action.payload ? "authenticated" : "idle";
        state.initialized = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = "idle";
        state.error = null;
      })
      .addMatcher(isAnyOf(loginUser.pending, registerUser.pending), (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addMatcher(
        isAnyOf(loginUser.rejected, registerUser.rejected),
        (state, action) => {
          state.status = "idle";
          state.error = action.payload ?? "Something went wrong";
        }
      );
  },
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
