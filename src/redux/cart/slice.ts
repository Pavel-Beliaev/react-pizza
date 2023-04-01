import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {CartItemType, CartSliceState} from "./types";
import {getSumPrice} from "../../utils/getSum";
import {getCardFromLS} from "../../utils/getCardFromLS";

const initialState: CartSliceState = getCardFromLS();
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItemType>) {
            const findItem = state.items.find((obj) => obj.id === action.payload.id);
            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                });
            }
            state.totalPrice = getSumPrice(state.items)
        },
        minusItem(state, action: PayloadAction<string>) {
            const findItem = state.items.find((obj) => obj.id === action.payload);
            if (findItem) {
                findItem.count--;
            }
            if (findItem && findItem.count <= 0) {
                state.items = state.items.filter((obj) => obj.id !== action.payload)
            }
        },
        removeItem(state, action: PayloadAction<string>) {
            state.items = state.items.filter((obj) => obj.id !== action.payload)
        },
        clearItem(state) {
            state.items = [];
            state.totalPrice = 0
        },
    },
})

export const {addItem, removeItem, clearItem, minusItem} = cartSlice.actions

export default cartSlice.reducer