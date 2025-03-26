import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    token: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action: PayloadAction<string>) => {
            // Changed payload type
            state.isAuthenticated = true;
            state.token = action.payload;
            state.loading = false;
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.token = null;
        },
        signupStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        signupSuccess: (state, action: PayloadAction<string>) => {
            // Changed payload type
            state.isAuthenticated = true;
            state.token = action.payload;
            state.loading = false;
        },
        signupFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
    signupStart,
    signupSuccess,
    signupFailure,
} = authSlice.actions;

export default authSlice.reducer;
