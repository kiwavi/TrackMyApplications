import { createSlice } from '@reduxjs/toolkit';
import type { PayLoadAction } from '@reduxjs/toolkit';

const initialState =  {
    isLogged: false,
    firstname: null,
    email: null,
};


export const loggedSlice = createSlice(
    {
        name: 'logged',
        initialState,
        reducers: {
            login: (state) => {
                state.isLogged = true;
            },
            logout: (state) => {
                state.isLogged = false;
            },
            logusername: (state,action) => {
                state.firstname = action.payload;
            },
            logemail: (state,action) => {
                state.email = action.payload;
            },
            logoutusername: (state) => {
                state.firstname = null;
            },
            logoutemail: (state) => {
                state.email = null;
            }
        }
    }
);

export const {login, logout, logusername, logemail, logoutemail, logoutusername} = loggedSlice.actions;

export default loggedSlice.reducer;
