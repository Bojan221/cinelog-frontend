"use client";

import { ToastContainer, toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export type ToastType = "success" | "error" | "info" | "warning";

/**
 * Fire a toast notification from anywhere on the client.
 *
 * @example
 *   showToast("success", "Successfully added movie");
 *   showToast("error", "Something went wrong");
 */
export function showToast(
  type: ToastType,
  message: string,
  options?: ToastOptions
) {
  toast[type](message, options);
}

/**
 * Mount once near the root of the app so toasts have somewhere to render.
 */
export default function ToastProvider() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover
      draggable
      theme="dark"
    />
  );
}
