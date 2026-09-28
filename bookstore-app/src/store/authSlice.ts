import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  isLoggedIn: boolean;

  user: User | null;
}

const initialState: AuthState = {
  isLoggedIn: false,

  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginFake: (state) => {
      state.isLoggedIn = true;

      state.user = { id: "1", name: "Nguyễn Văn A", email: "vana@example.com" };
    },
    logout: (state) => {
      state.isLoggedIn = false;

      state.user = null;
    },
  },
});

export const { loginFake, logout } = authSlice.actions;
export default authSlice.reducer;
