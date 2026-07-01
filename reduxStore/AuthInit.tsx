"use client";

import { useEffect } from "react";
import { useAppDispatch } from "./hooks";
import { initAuth } from "./authSlice";

const AuthInit = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initAuth());
  }, [dispatch]);

  return null;
};

export default AuthInit;
