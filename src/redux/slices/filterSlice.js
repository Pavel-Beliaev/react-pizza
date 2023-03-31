import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    searchValue: '',
    categoryId: 0,
    page: 1,
    sort: {
        name: 'популярности',
        sortProperty: 'rating'
    }
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload
        },
        setSearchValue(state, action) {
            state.searchValue = action.payload
        },
        setSort(state, action) {
            state.sort = action.payload
         },
        setPage(state, action) {
            state.page = action.payload
        },
        setFilters(state, action) {
            state.sort = action.payload.sort
            state.page = Number(action.payload.page)
            state.categoryId = Number(action.payload.categoryId)
        }
    },
})

export const selectFilter = (state) => state.filter
export const selectSort = (state) => state.filter.sort
export const {setCategoryId, setSort, setPage, setFilters, setSearchValue} = filterSlice.actions

export default filterSlice.reducer