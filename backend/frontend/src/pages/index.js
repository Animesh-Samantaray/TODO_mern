import { configureStore, createSlice } from "@reduxjs/toolkit";

// ✅ Load initial state from localStorage
const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  user: JSON.parse(localStorage.getItem("user")) || null,
};

// ✅ Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;

      // Persist to localStorage
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.isLoggedIn = false; // ✅ boolean, not string
      state.user = null;

      // Remove from localStorage
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("user");
    },
  },
});

export const authActions = authSlice.actions;

// ✅ Configure store
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    // todo: todoSlice.reducer  <-- later you can plug in todos here
  },
});
