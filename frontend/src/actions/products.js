import {   isLoading, isError, getProducts,  getAllItemsSuccess, getSingleItemSuccess, getCategoryItemsSuccess } from "../redux/slices/productsSlice";
import { publicRequest } from "../requestMethods";


export const getAllItems = async (dispatch) => {
    try {
        dispatch(isLoading())
        const res = await publicRequest.get(`api/v1/products` );
      dispatch(getAllItemsSuccess(res.data))
    } catch (err) {
     console.log(err)
     dispatch(isError())
    }
}

export const getSingleItem = async (dispatch,id) => {
    try {
        dispatch(isLoading())
        const res = await publicRequest.get(`api/v1/products/${id}` );
      dispatch(getSingleItemSuccess(res.data))
    } catch (err) {
     console.log(err)
     dispatch(isError())
    }
}


export const getItemsByCategory = async (dispatch, category) => {
  try {
    dispatch(isLoading());
    const res = await publicRequest.get(`api/v1/products?category=${category}`);
      dispatch(getCategoryItemsSuccess(res.data));
    
  } catch (err) {
    console.log(err);
    dispatch(isError());
  }
};
