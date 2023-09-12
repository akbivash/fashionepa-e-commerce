import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
        name: 'products',
        initialState: {
                loading: false,
                error: false,
                items: [],
                item: [],
                searchResults: [],
                categoryItems:[]
        },
        reducers: {
                isLoading: (state) => {
                        state.loading = true
                },
                isError: (state) => {
                        state.loading = false
                        state.error = true
                },
                isSuccess:(state) => {
                        state.loading = false
                        state.error = false       
                }
,
                getAllItemsSuccess: (state, action) => {
                        state.items = action.payload
                        state.loading = false
                        state.error = false

                },

                getSingleItemSuccess: (state, action) => {
                        state.item = action.payload
                        state.loading = false
                        state.error = false
                },
                getSearchResultsSuccess: (state, action) => {
                        state.searchResults = action.payload
                        state.loading = false
                        state.error = false

                },
                getCategoryItemsSuccess:(state, action) => {
                        state.loading = false 
                        state.error = false
                        state.categoryItems = action.payload
                }

        }
})

export const { getAllItemsSuccess, getSearchResultsSuccess,isSuccess, getSingleItemSuccess,getCategoryItemsSuccess, isError, isLoading } = productSlice.actions

export default productSlice.reducer