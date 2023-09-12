import { createSlice } from "@reduxjs/toolkit";

const componentsSlice = createSlice({
    name: 'components',
    initialState: {
        isSidebarOpen: false,
        isSearchbarOpen: false,
        isSearchSuggestions: false
    },
    reducers: {
        handleSidebar: (state) => {
            state.isSidebarOpen = !state.isSidebarOpen
        },
        closeSidebar: (state) => {
            state.isSidebarOpen = false
        },
        closeSearchbar: (state) => {
            state.isSearchbarOpen = false
        },
        openSearchbar: (state) => {
            state.isSearchbarOpen = true
        },
        openSearchSuggestions: (state) => {
            state.isSearchSuggestions = true
        },
        closeSearchSuggestions: (state) => {
            state.isSearchSuggestions = false
        }
    }
})

export const { closeSidebar, handleSidebar, closeSearchbar, openSearchbar, openSearchSuggestions, closeSearchSuggestions } = componentsSlice.actions
export default componentsSlice.reducer