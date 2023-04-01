import {createAsyncThunk} from "@reduxjs/toolkit";
import {FetchPizzaParams, PizzaItems} from "./types";
import axios from "axios";

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