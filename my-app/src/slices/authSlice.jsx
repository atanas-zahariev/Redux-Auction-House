import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';

import { getUser, makeCorrectIdForRedux, validator } from '../services/utility';

import { api } from '../services/dataService';

const { login, register, logout, sendNotice } = api();

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

export const sendUserNotice = createAsyncThunk(
    'user/sendNotice',
    async (data, { rejectWithValue }) => {
        try {
           const result =  await sendNotice(data);
           return result;
        } catch (error) {
            return rejectWithValue(error);
        }
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
        cleanAuthError(state, action) {
            state.error = null;
        },
        setPersistedStateToNull(state, action) {
            state.persistedState = null;
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'loginSucceeded';
                state.persistedState = getUser();

                action.payload.type = 'user';
                userAdapter.addOne(state, makeCorrectIdForRedux(action.payload));
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'loginFaild';

                state.error = action.payload;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = 'registerSucceeded';
                state.persistedState = getUser();

                action.payload.type = 'user';
                userAdapter.addOne(state, makeCorrectIdForRedux(action.payload));
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
            })
            .addCase(sendUserNotice.fulfilled, (state, action) => {
                state.status = 'sendUserNoticeSucceeded';
                console.log(action.payload);
            })
            .addCase(sendUserNotice.rejected, (state, action) => {
                state.status = 'sendUserNoticeFaild';

                state.error = action.payload;
            });
    }
});


export default userSlice.reducer;

export const { cleanAuthError, setUpUser, setPersistedStateToNull } = userSlice.actions;

export const { selectById: selectUserBiId, selectAll: selectAllUsers } = userAdapter.getSelectors(state => state.user);

export const selectUser = state => state.user;

export const selectPersistedState = state => state.user.persistedState;

export const selectAuthError = state => state.user.error;

export const selectNotices = state => state.user.notices;

