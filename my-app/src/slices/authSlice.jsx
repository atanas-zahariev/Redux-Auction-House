import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { api } from '../services/dataService';
import { getUser, validator } from '../services/utility';

const { login, register, logout } = api();

const userAdapter = createEntityAdapter();

export const loginUser = createAsyncThunk(
    'user/login',
    async (data, { rejectWithValue }) => {
        try {
            validator(data);
            const result = await login(data);
            return result;
        } catch (error) {

            return rejectWithValue(error);
        }
    }
);

export const registerUser = createAsyncThunk(
    'user/register',
    async (data, { rejectWithValue }) => {
        try {
            validator(data);
            const result = await register(data);
            return result;
        } catch (error) {

            return rejectWithValue(error);
        }
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
    reducers: {
        cleanError(state, action) {
            state.error = null;
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'loginSucceeded';
                state.persistedState = getUser();

                const { _id: id, email, firstname, lastname, __v } = action.payload;

                userAdapter.addOne(state, { id, email, firstname, lastname, __v });
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'loginFaild';

                state.error = action.payload;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = 'registerSucceeded';
                state.persistedState = getUser();

                const { _id: id, email, firstname, lastname, __v } = action.payload;

                userAdapter.addOne(state, { id, email, firstname, lastname, __v });
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'registerFaild';

                state.error = action.payload;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.status = 'logoutSucceeded';
                state.persistedState = null;
                if (action.payload) {
                    userAdapter.removeOne(state, action.payload);
                }
            });
    }
});


export default userSlice.reducer;

export const { cleanError, setUpUser } = userSlice.actions;

export const selectUser = state => state.user;

export const selectPersistedState = state => state.user.persistedState;

export const selectError = state => state.user.error;

