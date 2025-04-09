import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
    user: { id: string } | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    token: null,
    user: null,
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
            state.isAuthenticated = true;
            state.token = action.payload;
            state.loading = false;
            try {
                const decodedToken: any = jwtDecode(action.payload);
                state.user = {
                    id: decodedToken[
                        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
                    ],
                };
            } catch (error) {
                console.error("Error decoding JWT:", error);
                state.user = null;
            }
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.token = null;
            state.user = null;
        },
        signupStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        signupSuccess: (state, action: PayloadAction<string>) => {
            state.isAuthenticated = true;
            state.token = action.payload;
            state.loading = false;
            try {
                const decodedToken: any = jwtDecode(action.payload);
                state.user = {
                    id: decodedToken[
                        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
                    ],
                };
            } catch (error) {
                console.error("Error decoding JWT:", error);
                state.user = null;
            }
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
