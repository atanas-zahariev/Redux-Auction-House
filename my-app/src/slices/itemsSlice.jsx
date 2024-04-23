import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';

import { makeCorrectIdForRedux, validator } from '../services/utility';
import { api } from '../services/dataService';

const itemsAdapter = createEntityAdapter();

const { getAllDataInSystem, offer, getTotalAction } = api();

export const getItems = createAsyncThunk(
    'items/fetchItems',
    async (_, { rejectWithValue }) => {
        try {
            const items = await getAllDataInSystem();
            return items;
        } catch (error) {
            rejectWithValue(error);
        }
    }
);

export const getClosedUserItems = createAsyncThunk(
    'items/fetchClosedUserItems',
    async (_, { rejectWithValue }) => {
        try {
            const result = await getTotalAction();
            return result;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const makeOffer = createAsyncThunk(
    'items/makeOffer',
    async ({ data, id }, { rejectWithValue }) => {
        try {
            validator(data);
            const result = await offer(data, id);
            return result;
        } catch (error) {
            return rejectWithValue(error);

        }
    }
);

const initialState = itemsAdapter.getInitialState({
    status: 'idle',
    error: null,
    user: null,
    closedOffers: null
});

const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        setUserToCatalog(state, action) {
            action.payload.type = 'user';
            state.user = makeCorrectIdForRedux(action.payload);
        },
        clearUserFromCatalog(state, action) {
            state.user = null;
        },
        cleanErrorFromCatalog(state, action) {
            state.error = null;
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(getItems.fulfilled, (state, action) => {
                state.status = 'fetchItemsSucceeded';
                itemsAdapter.addMany(state, action.payload.items.map(item => {
                    item.type = 'item';
                    return makeCorrectIdForRedux(item);
                }));
                if (action.payload.user) {
                    action.payload.user.type = 'user';
                    state.user = makeCorrectIdForRedux(action.payload.user);
                }
            })
            .addCase(getItems.rejected, (state, action) => {
                state.status = 'fetchItemsFaild';

                state.error = action.payload;
            })
            .addCase(makeOffer.fulfilled, (state, action) => {
                state.status = 'offerSucceeded';

                action.payload.updatedItem.type = 'item';

                const updatedItem = makeCorrectIdForRedux(action.payload.updatedItem);

                itemsAdapter.upsertOne(state, updatedItem);
            })
            .addCase(makeOffer.rejected, (state, action) => {
                state.status = 'offerFaild';

                state.error = action.payload;
            })
            .addCase(getClosedUserItems.fulfilled, (state, action) => {
                state.closedOffers = action.payload.items.map(item =>{
                    item.type = 'item';
                    return makeCorrectIdForRedux(item);
                });
            });

    }
});

export default itemsSlice.reducer;

export const { setUserToCatalog, clearUserFromCatalog, cleanErrorFromCatalog } = itemsSlice.actions;

export const { selectAll: selectItems, selectById: selectItemById } = itemsAdapter.getSelectors(state => state.items);

// export const getItemByUserId = createSelector(
//     [selectItems, (state, userId) => userId],
//     (items, userId) => items.filter((item) => item.id === userId)
// );

export const selectItemsError = state => state.items.error;

export const selectUserFromCatalog = state => state.items.user;

export const selectClosedOffers = state => state.items.closedOffers;
