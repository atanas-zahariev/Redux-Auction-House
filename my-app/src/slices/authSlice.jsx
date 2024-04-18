import { createSlice, createAsyncThunk, createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { api } from '../services/dataService';
import { setUserData } from '../services/utility';

const { login, register, logout } = api();

const userAdapter = createEntityAdapter();

export const loginUser = createAsyncThunk(
    'user/login',
    async (data) => {
        const result = await login(data);
        return result;
    }
);

export const logoutUser = createAsyncThunk(
    'user/logout',
    async (id) => {
        const result = await logout();
        return id;
    }
);

const initialState = userAdapter.getInitialState({
    status: 'idle',
    error: null
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reduser: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const { _id } = action.payload;
                state.entities[_id] = action.payload;
                state.ids.push(_id);
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                console.log(action.payload);
                delete state.entities[action.payload];
                const index = state.ids.indexOf(action.payload);
                state.ids.splice(index, 1);
            });
    }
});


export default userSlice.reducer;

export const selectUser = state => state.user;


