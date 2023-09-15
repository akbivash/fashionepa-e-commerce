import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "../../redux/slices/modalSlice";
import Modal from "../../components/Modal";
import { Link } from "react-router-dom";

const Pay = () => {
  const cart = useSelector((s) => s.cart);
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);
  const { isModal } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  
  function handleSubmit() {
    if (!currentUser) {
      dispatch(openModal());
    } else {
      try {
        setIsLoading(true);
        fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/checkout/payment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cart),
        })
          .then((res) => {
            if (res.ok) return res.json();
          })
          .then(({ url }) => {
            window.location = url;
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
          });
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    }
  }

  return (
    <>
      <div className="text-center">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading}
          className="disabled:opacity-[0.5] w-full  bg-lime-dark max-w-[170px] my-4 text-center text-white p-3 rounded-sm"
        >
          Checkout
        </button>
      </div>

      {isModal && currentUser === null && (
        <Modal className="fixed">
          <div className="grid gap-2">
            <span className="flex gap-3 items-center">
              {" "}
              Please sign up first{" "}
              <img
                src="https://em-content.zobj.net/source/skype/289/smiling-face-with-smiling-eyes_1f60a.png"
                alt=""
                className="h-10 w-10"
              />
            </span>
            <span className="flex gap-3 items-center">
              <Link
                to="/register"
                className="bg-green-default py-2 text-[#000] px-7"
              >
                Ok
              </Link>{" "}
              <button
                className="bg-yellow-default text-[#000] px-7 py-2"
                onClick={() => dispatch(closeModal())}
              >
                Cancel
              </button>
            </span>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Pay;
