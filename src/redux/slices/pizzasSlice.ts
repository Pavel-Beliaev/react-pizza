import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";
import {RootState} from "../store";
import {SortItem} from "./filterSlice";

export type PizzaItems = {
    id: string,
    title: string,
    price: number,
    imageUrl: string,
    sizes: number[],
    types: number[],
    rating: number,
}

interface PizzaSliceState {
    items: PizzaItems[],
    status: Status
}

export type FetchPizzaParams = {
    sortBy: string,
    order: string,
    category: string,
    search: string,
    page: string,
}



export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',

}

export const fetchPizzas = createAsyncThunk<PizzaItems[], FetchPizzaParams>(
    'pizza/fetchPizzasStatus',
    async (params) => {
        const {sortBy, order, category, search, page} = params
        const {data} = await axios.get<PizzaItems[]>(
            `https://641ad7ee9b82ded29d432801.mockapi.io/items?page=${page}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`
        )
        return data;
    }
)

const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING,
}

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<PizzaItems[]>) {
            state.items = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state) => {
            state.status = Status.LOADING;
            state.items = [];
        });
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = Status.SUCCESS;
        });
        builder.addCase(fetchPizzas.rejected, (state) => {
            state.status = Status.ERROR;
            state.items = [];
        });

    }
})

export const selectPizza = (state: RootState) => state.pizza
export const {setItems} = pizzaSlice.actions

export default pizzaSlice.reducer