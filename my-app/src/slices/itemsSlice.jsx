import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';

import { makeCorrectIdForRedux, validator } from '../services/utility';
import { api } from '../services/dataService';

const itemsAdapter = createEntityAdapter();

const { getAllDataInSystem, offer, getTotalAction, getUserAction, onDelete } = api();

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

export const deleteItem = createAsyncThunk(
    'items/deleteItem',

    async (id, { rejectWithValue }) => {
        try {
            await onDelete(id);

            return id;
        } catch (error) {
            rejectWithValue(error);
        }
    }
);

export const closeItemOffer = createAsyncThunk(
    'items/closeItemOffer',

    async (id, { rejectWithValue }) => {
        try {
            await getUserAction(id);
            return id;
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
        },
        setErrorToCatalog(state,action){
            state.error = action.payload;
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
                state.status = 'fetchUserClosedOffers';
                state.closedOffers = action.payload.items.map(item => {
                    item.type = 'item';
                    return makeCorrectIdForRedux(item);
                });
            })
            .addCase(getClosedUserItems.rejected, (state, action) => {
                state.status = 'fetchUserClosedOffersFaild';

                state.error = action.payload;
            })
            .addCase(closeItemOffer.fulfilled, (state, action) => {
                state.status = 'closeItemOfferSucceeded';

                const item = state.entities[action.payload];
                state.closedOffers.push(item);
                itemsAdapter.removeOne(state, action.payload);
            })
            .addCase(closeItemOffer.rejected, (state, action) => {
                state.status = 'closeItemOfferFaild';

                state.error = action.payload;
            })
            .addCase(deleteItem.fulfilled,(state,action) => {
                state.status = 'deleteItemSucceeded';
                itemsAdapter.removeOne(state, action.payload);
            })
            .addCase(deleteItem.rejected, (state, action) => {
                state.status = 'deleteItemFaild';

                state.error = action.payload;
            });

    }
});

export default itemsSlice.reducer;

export const { setUserToCatalog, clearUserFromCatalog, cleanErrorFromCatalog,setErrorToCatalog } = itemsSlice.actions;

export const { selectAll: selectItems, selectById: selectItemById } = itemsAdapter.getSelectors(state => state.items);

// export const getItemByUserId = createSelector(
//     [selectItems, (state, userId) => userId],
//     (items, userId) => items.filter((item) => item.id === userId)
// );

export const selectItemsError = state => state.items.error;

export const selectUserFromCatalog = state => state.items.user;

export const selectClosedOffers = state => state.items.closedOffers;
