import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';

import { makeCorrectIdForRedux, validator } from '../services/utility';

import { api } from '../services/dataService';

const noticeAdapter = createEntityAdapter();

const { createNotification, getAllNotices, getNotice, deleteNotice, editNotice, getOwner } = api();

const initialState = noticeAdapter.getInitialState({
    status: 'idle',
    error: null,
    answers: null
});

export const getNotifications = createAsyncThunk(
    'notice/fetchNotice',
    async (_, { rejectWithValue }) => {
        try {
            const result = await getAllNotices();
            return result;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const answerNotice = createAsyncThunk(
    'notice/fetchAnswer',
    async (_, { rejectWithValue }) => {
        try {
            const result = await getOwner();
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
                noticeAdapter.addMany(state, action.payload.map(notice => {
                    notice.type = 'notice';
                    return makeCorrectIdForRedux(notice);
                }));
            })
            .addCase(getNotifications.rejected, (state, action) => {
                state.status = 'fetchNoticesFaild';

                state.error = action.payload;
            })
            .addCase(answerNotice.fulfilled, (state, action) => {
                state.status = 'fetchAnswersSucceeded';
                console.log(action.payload);
            })
            .addCase(answerNotice.rejected, (state, action) => {
                state.status = 'fetchAnswersFaild';

                state.error = action.payload;
            });
    }
});

export default noticesSlice.reducer;

export const { selectAll: selectNotices, selectById: selectNoticeById } = noticeAdapter.getSelectors(state => state.notifications);

export const getAnswers = state => state.notifications.answers;