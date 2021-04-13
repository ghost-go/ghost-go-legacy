import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ReactModal from "react-modal";
import { useDispatch, useTypedSelector } from "utils";
import { openSignInSlice, uiSlice } from "slices";

const SignInModal = ({ isOpen }: { isOpen: boolean }) => {
  // const openSignIn = useTypedSelector((i) => i.openSignIn);
  const dispatch = useDispatch();
  return (
    // <ReactModal isOpen={openSignIn} contentLabel="Sign In">
    <ReactModal isOpen={true} contentLabel="Sign In">
      <div>Lalala</div>
      <button
        onClick={() => {
          // dispatch(openSignInSlice.actions.makeFalse());
        }}>
        Close Modal
      </button>
    </ReactModal>
  );
};
export default SignInModal;
