import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store";

export enum SortPropertyEnum {
   RATING_DESC = 'rating',
   RATING_ASC = '-rating',
   PRICE_DESC = 'price',
   PRICE_ASC = '-price',
   TITLE_DESC = 'title',
   TITLE_ASC = '-title',
}

export type SortItem = {
    name: string,
    sortProperty: SortPropertyEnum
}

export interface FilterSliceState {
    searchValue: string,
    categoryId: number,
    page: number,
    sort: SortItem
}

const initialState: FilterSliceState = {
    searchValue: '',
    categoryId: 0,
    page: 1,
    sort: {
        name: 'популярности',
        sortProperty: SortPropertyEnum.PRICE_DESC
    }
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload
        },
        setSort(state, action: PayloadAction<SortItem>) {
            state.sort = action.payload
        },
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload
        },
        setFilters(state, action: PayloadAction<FilterSliceState>) {
            if (Object.keys(action.payload).length) {
                state.page = Number(action.payload.page)
                state.categoryId = Number(action.payload.categoryId)
                state.sort = action.payload.sort
            } else {
                state.page = 1;
                state.categoryId = 0;
                state.sort = {
                    name: 'популярности',
                    sortProperty: SortPropertyEnum.PRICE_DESC
                }
            }
        },
    },
})

export const selectFilter = (state: RootState) => state.filter
export const selectSort = (state: RootState) => state.filter.sort
export const {setCategoryId, setSort, setPage, setFilters, setSearchValue} = filterSlice.actions

export default filterSlice.reducer