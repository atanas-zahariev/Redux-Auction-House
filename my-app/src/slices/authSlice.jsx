import { createSlice, createAsyncThunk, createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { api } from '../services/dataService';
import { getUser, setUserData } from '../services/utility';

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
        await logout();
        return id;
    }
);

const initialState = userAdapter.getInitialState({
    status: 'idle',
    error: null,
    persistedState: getUser()
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reduser: {},

    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.persistedState = getUser()
                const { _id: id, email, firstname, lastname, __v } = action.payload;
                // state.entities[_id] = action.payload;
                // state.ids.push(_id);
                userAdapter.addOne(state, { id, email, firstname, lastname, __v })
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.persistedState = null;
                if (action.payload) {
                    userAdapter.removeOne(state, action.payload)
                }
            });
    }
});


export default userSlice.reducer;

export const selectUser = state => state.user;

export const selectPersistedState = state => state.user.persistedState;


