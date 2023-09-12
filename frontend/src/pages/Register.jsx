import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Modal from "../components/Modal";
import { openModal, closeModal } from "../redux/slices/modalSlice";
import { FaTimes } from "react-icons/fa";
import { handleRegister } from "../actions/user";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(6, "Username must be at least 6 characters")
    .max(20, "Username must not exceed 20 characters"),
  email: Yup.string().required("Email is required").email("Email is invalid"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(40, "Password must not exceed 40 characters"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
  acceptTerms: Yup.bool().oneOf([true], "Accept Terms is required"),
});


const Register = () => {
  const dispatch = useDispatch();
  const { loading, currentUser, error, errorMsg } = useSelector(
    (state) => state.user
  );
  const { isModal } = useSelector((state) => state.modal);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  function onSubmit(data) {
    handleRegister(dispatch, data, navigate)
  }

 
  return (
    <div className="grid  place-items-center mt-10 px-10">
      {currentUser && <span>You are already registered</span>}
      {!currentUser && (
        <>
          {" "}
          <h2 className="text-2xl font-[400] uppercase mb-4">
            Create your account
          </h2>
          <form
            action=""
            className="form w-full max-w-lg grid gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="form-group">
              <label>Username</label>
              <input name="username" type="text" {...register("username")} />
              <div className="invalid-feedback">{errors.username?.message}</div>
            </div>

            <div className="form-group">
              <label>Email</label>
              <input name="email" type="text" {...register("email")} />
              <div className="invalid-feedback">{errors.email?.message}</div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                name="password"
                type="password"
                {...register("password")}
              />
              <div className="invalid-feedback">{errors.password?.message}</div>
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                {...register("confirmPassword")}
              />
              <div className="invalid-feedback">
                {errors.confirmPassword?.message}
              </div>
            </div>

            <div className="form-group  form-check">
              <input
                name="acceptTerms"
                type="checkbox"
                {...register("acceptTerms")}
              />
              <label
                htmlFor="acceptTerms"
                className="form-check-label text-center"
              >
                I have read and agree to the Terms
              </label>
              <div className="invalid-feedback">
                {errors.acceptTerms?.message}
              </div>
            </div>

            <button
              className="bg-green-dark px-4 py-1 w-fit mx-auto rounded-sm disabled:opacity-50 text-white"
              type="submit"
              disabled={loading}
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={() => {
              
                reset({
                  username:'',
                  password:'',
                  confirmPassword:'',
                  email:'',
                  acceptTerms:''
                })
              }}
              className="btn btn-warning float-right"
            >
              Reset
            </button>

            {isModal && (
              <Modal>
                <p>{errorMsg}</p>
                <button
                  className="text-yellow-default"
                  onClick={() => dispatch(closeModal())}
                >
                  <FaTimes />
                </button>
              </Modal>
            )}
          </form>
          <div className="mt-4">
            <span>Already have an account ? </span>
            <Link to="/login" className="font-bold  text-green-dark">
              Login
            </Link>
          </div>{" "}
        </>
      )}
    </div>
  );
};

export default Register;
