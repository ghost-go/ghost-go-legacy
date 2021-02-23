import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProblems } from "slices";

const Problems = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProblems());
  }, [dispatch]);

  return (
    <>
      <div>PRoblems</div>
    </>
  );
};

export default Problems;
