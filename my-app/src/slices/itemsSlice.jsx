import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { api } from '../services/dataService';
import { makeCorrectIdForRedux, validator } from '../services/utility';

const itemsAdapter = createEntityAdapter();

const { getAllDataInSystem, getSpecificDataWithId } = api();

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
            action.payload.type = 'user'
            state.user = makeCorrectIdForRedux(action.payload);
        },
        clearUserFromCatalog(state, action) {
            state.user = null;
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(getItems.fulfilled, (state, action) => {
                state.status = 'fetchItemsSucceeded';
                itemsAdapter.addMany(state, action.payload.items.map(item => {
                    item.type = 'item'
                    return makeCorrectIdForRedux(item)
                }));
                if (action.payload.user) {
                    action.payload.user.type = 'user';
                    state.user = makeCorrectIdForRedux(action.payload.user);
                }
            })
            .addCase(getItems.rejected, (state, action) => {
                state.status = 'fetchItemsFaild';

                state.error = action.payload;
            });

    }
});

export default itemsSlice.reducer;

export const { setUserToCatalog, clearUserFromCatalog } = itemsSlice.actions;

export const { selectAll: selectItems, selectById: selectItemById } = itemsAdapter.getSelectors(state => state.items);

// export const getItemByUserId = createSelector(
//     [selectItems, (state, userId) => userId],
//     (items, userId) => items.filter((item) => item.id === userId)
// );

export const selectItemsError = state => state.items.error;
