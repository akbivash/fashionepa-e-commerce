import { createSlice } from "@reduxjs/toolkit";


 const modalSlice = createSlice({
    name:'modal',
    initialState:{
        isModal:false,
       
    
    },
    reducers:{
        openModal:(state, action)=> {
            state.isModal = true
        },
        closeModal:(state)=> {
            state.isModal = false
        }
    }
})

export const {openModal, closeModal} = modalSlice.actions
export default modalSlice.reducer