import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { api } from '../services/dataService';
import { validator } from '../services/utility';

const itemsAdapter = createEntityAdapter();

const { getAllDataInSystem } = api();

export const getItems = createAsyncThunk(
    'items/fetchItems',
    async (_, { rejectWithValue }) => {
        try {
            const items = getAllDataInSystem();
            return items;
        } catch (error) {
            rejectWithValue(error);
        }
    }
);

const initialState = itemsAdapter.getInitialState({
    status: 'idle',
    error: null
});

const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {

    },

    extraReducers: (builder) => {
        builder
            .addCase(getItems.fulfilled, (state, action) => {
                function makeCorrectIdForRedux(item) {
                    // const itemId = item._id;
                    const { _id: id, title, category, description, imgUrl, bider, owner, price, __v } = item;
                    return { id, title, category, description, imgUrl, bider, owner, price, __v };
                }
                console.log(action.payload.items.map(makeCorrectIdForRedux));

                itemsAdapter.addMany(state, action.payload.items.map(makeCorrectIdForRedux));
            });
    }
});

export default itemsSlice.reducer;

export const selectItems = state => state.items.entities;