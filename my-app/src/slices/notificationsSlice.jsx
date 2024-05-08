import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';

import { makeCorrectIdForRedux, validator } from '../services/utility';

import { api } from '../services/dataService';

const noticeAdapter = createEntityAdapter();

const {createNotification,getAllNotices,getNotice,deleteNotice,editNotice} = api();

const initialState = noticeAdapter.getInitialState({
    status: 'idle',
    error: null
});

const noticesSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {

    }
});