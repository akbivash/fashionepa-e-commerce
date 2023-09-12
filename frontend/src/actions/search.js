import { publicRequest } from "../requestMethods"
import {  getSearchResultsSuccess, isError, isLoading } from '../redux/slices/productsSlice'


export const getSearchResults = async (dispatch, text) => {
    try {
        dispatch(isLoading())
        const res = await publicRequest.get(`/api/v1/products?search=${text}`)
        dispatch(getSearchResultsSuccess(res.data))
    } catch (err) {
        console.log(err)
        dispatch(isError())
    }
}