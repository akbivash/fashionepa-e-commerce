import { openModal } from "../redux/slices/modalSlice";
import { loginSuccess, registerSuccess, setErrorMsg, isLoading, isError } from "../redux/slices/userSlice";
import { publicRequest } from "../requestMethods";



export const handleLogin = async (dispatch, {username, password}, navigate) => {
    try {
    dispatch(isLoading())
        const response = await publicRequest.post('api/v1/auth/login', {username, password})
        dispatch(loginSuccess(response))
      setTimeout(() =>{
        navigate('/')
      },2000)
        console.log('succ')
    } catch (err) {
        dispatch(isError())
        console.log('fail')

        if (err.message === 'Network Error') {
            dispatch(setErrorMsg('Network Error, try again '))
        }
        dispatch(setErrorMsg(err.response.data.msg))
    }
}

export const handleRegister = async (dispatch, user, navigate) => {
      try {
      dispatch(isLoading());

        const response = await publicRequest.post("api/v1/auth/register", {
      email:    user.email,
        password:  user.password,
         username : user.username,
        });
        dispatch(registerSuccess(response));
        navigate("/account");
      } catch (err) {
        console.log(err.message === "Network Error");
        dispatch(isError());
        if (err.message === "Network Error") {
          dispatch(setErrorMsg(err.message));
        } else {
          dispatch(setErrorMsg(err.response.data.msg));
        }
        dispatch(openModal());
      }
    };

