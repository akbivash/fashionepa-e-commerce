import { createSlice, current } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    quantity: 0,
    totalPrice: 0,
    watchlist: []
  },
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;

      state.quantity += 1
      state.items.push(item)
      state.totalPrice += action.payload.price * action.payload.quantity;

      //  if the add button is not disabled then apply this logic 
      //       if (!state.items.find(elem => elem._id === item._id)) {
      //         state.quantity += 1;
      //         state.items.push(item);
      //       state.totalPrice += action.payload.price * action.payload.quantity;
      // }
    },
    removeItem: (state, action) => {
      state.quantity -= 1
      state.totalPrice -= action.payload.price * action.payload.quantity;
      state.items.splice(
        state.items.findIndex(item => item._id === action.payload._id), 1
      )
    },

    increaseQuantity: (state, action) => {
      state.items.map(item => {
        if (item._id === action.payload._id) {
          item.quantity += 1
          state.totalPrice += action.payload.price
        }

      })

    },
    decreaseQuantity: (state, action) => {

      state.items.map(item => {
        if (item._id === action.payload._id) {
          if (item.quantity > 1) {
            item.quantity -= 1
            state.totalPrice -= action.payload.price
          }
        }

      })

    },
    addToWatchList: (state, action) => {
      if (!state.watchlist.find(elem => elem._id === action.payload.item._id)) {
        state.watchlist.push(action.payload.item);
      } else {
        return
      }
    },
    removeFromWatchlist: (state, action) => {
      state.watchlist.splice(
        state.watchlist.findIndex(item => item._id === action.payload), 1
      )
    },
    resetState: (state) => {
      state.items = []
      state.quantity = 0
      state.totalPrice = 0
      state.watchlist = []
    }
  }
});


export const { addItem, removeItem, increaseQuantity, decreaseQuantity, addToWatchList, removeFromWatchlist, resetState } = cartSlice.actions;
export default cartSlice.reducer;