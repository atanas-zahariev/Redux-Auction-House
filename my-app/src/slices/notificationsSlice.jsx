import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';

import { makeCorrectIdForRedux, validator } from '../services/utility';

import { api } from '../services/dataService';

const noticeAdapter = createEntityAdapter();

const { createNotification, getAllNotices, getNotice, deleteNotice, editNotice } = api();

const initialState = noticeAdapter.getInitialState({
    status: 'idle',
    error: null
});

export const getNotifications = createAsyncThunk(
    'notice/fetchNotice',
    async (id, { rejectWithValue }) => {
        try {
            const result = await getAllNotices();
            console.log(result);
            return result;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const noticesSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {

    },

    extraReducers: (builder) => {
        builder
            .addCase(getNotifications.fulfilled, (state, action) => {
                state.status = 'fetchNoticesSucceeded';
                console.log(action.payload);
            })
            .addCase(getNotifications.rejected, (state, action) => {
                state.status = 'fetchNoticesFaild';

                state.error = action.payload;
            });
    }
});

export default noticesSlice.reducer;