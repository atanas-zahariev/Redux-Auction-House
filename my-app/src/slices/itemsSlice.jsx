import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { api } from '../services/dataService';
import { makeCorrectIdForRedux, validator } from '../services/utility';

const itemsAdapter = createEntityAdapter();

const { getAllDataInSystem, offer } = api();

export const getItems = createAsyncThunk(
    'items/fetchItems',
    async (_, { rejectWithValue }) => {
        try {
            const items = await getAllDataInSystem();
            console.log(items);
            return items;
        } catch (error) {
            rejectWithValue(error);
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
    user: null
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
        cleanErrorFromCatalog(state,action){
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
                
                 itemsAdapter.upsertOne(state,updatedItem);
            })
            .addCase(makeOffer.rejected, (state, action) => {
                state.status = 'offerFaild';

                state.error = action.payload;
            });

    }
});

export default itemsSlice.reducer;

export const { setUserToCatalog, clearUserFromCatalog,cleanErrorFromCatalog } = itemsSlice.actions;

export const { selectAll: selectItems, selectById: selectItemById } = itemsAdapter.getSelectors(state => state.items);

// export const getItemByUserId = createSelector(
//     [selectItems, (state, userId) => userId],
//     (items, userId) => items.filter((item) => item.id === userId)
// );

export const selectItemsError = state => state.items.error;

export const selectUserFromCatalog = state => state.items.user;
