"use client";

import Logo from "@/components/core/Logo";
import {
  FaRegStar,
  FaRegBookmark,
  FaRegUser,
  FaRegEye,
} from "react-icons/fa";
import { IoStatsChartSharp } from "react-icons/io5";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerSchema } from "./schema";
import { useAppDispatch } from "@/reduxStore/hooks";
import { registerUser } from "@/reduxStore/authSlice";
import { showToast } from "@/components/common/Toast";

type FormValues = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function page() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, type, value, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setServerError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError(null);
    const result = registerSchema.safeParse(values);

    if (!result.success) {
      const fieldErrors: FormErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof FormValues;
        if (field && !fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);
    try {
      await dispatch(
        registerUser({
          firstName: result.data.firstName,
          lastName: result.data.lastName,
          username: result.data.username,
          email: result.data.email,
          password: result.data.password,
        })
      ).unwrap();
      showToast("success", "Account created successfully! Please log in.");
      // Registration doesn't log the user in — send them to login.
      router.push("/login");
    } catch (err) {
      const message =
        typeof err === "string" ? err : "Failed to create account";
      setServerError(message);
      showToast("error", message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#0a0a0b] text-white">

      <div className="absolute top-4 left-4 z-20 sm:top-5 sm:left-8">
        <Logo size="lg" />
      </div>

      <div className="mx-auto flex h-screen max-w-6xl items-center px-4 pt-16 pb-4 sm:px-6 sm:pb-6">
        <div className="grid max-h-full w-full overflow-hidden rounded-2xl border border-white/10 lg:grid-cols-2">

          <div className="relative hidden flex-col justify-center p-8 lg:flex">

            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/registerbg.jpg')" }}
            />
            <div className="absolute inset-0 bg-[#0a0a0b]/70" />

            <div className="relative z-10 max-w-md">
              <h1 className="text-4xl font-bold tracking-tight">
                Join Cine<span className="text-red-500">Log</span>
              </h1>
              <p className="mt-3 text-lg text-neutral-300">
                Create your account and start tracking your favorite movies.
              </p>

              <div className="mt-8 flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-500/15">
                    <FaRegBookmark size={22} className="text-red-500" />
                  </div>
                  <div>
                    <span className="font-semibold">Track Your Watchlist</span>
                    <p className="mt-1 text-sm text-neutral-300">
                      Save and organize movies you want to watch.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-500/15">
                    <FaRegStar size={22} className="text-red-500" />
                  </div>
                  <div>
                    <span className="font-semibold">Rate &amp; Review</span>
                    <p className="mt-1 text-sm text-neutral-300">
                      Share your thoughts and see what others think.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-500/15">
                    <IoStatsChartSharp size={22} className="text-red-500" />
                  </div>
                  <div>
                    <span className="font-semibold">Movie Stats</span>
                    <p className="mt-1 text-sm text-neutral-300">
                      Analyze your movie journey with detailed stats.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="min-h-0 overflow-y-auto bg-[#0d0d0f] p-6 sm:p-8 sleek-scrollbar">
            <div className="mx-auto w-full max-w-md">
              <div className="text-center">
                <h2 className="text-2xl font-bold">Create Account</h2>
                <p className="mt-1 text-sm text-neutral-400">
                  Fill in your details to get started
                </p>
              </div>

              <form
                className="mt-6 flex flex-col gap-3"
                onSubmit={handleSubmit}
                noValidate
              >
                {/* First / Last name */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-neutral-300">First Name</label>
                    <div className="relative">
                      <FaRegUser className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                      <input
                        type="text"
                        name="firstName"
                        value={values.firstName}
                        onChange={handleChange}
                        placeholder="First name"
                        className={`w-full rounded-lg border bg-white/3 py-2.5 pl-11 pr-4 text-sm placeholder:text-neutral-500 focus:outline-none ${
                          errors.firstName
                            ? "border-red-500/80 focus:border-red-500"
                            : "border-white/10 focus:border-red-500/60"
                        }`}
                      />
                    </div>
                    {errors.firstName && (
                      <p className="text-xs text-red-400">{errors.firstName}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-neutral-300">Last Name</label>
                    <div className="relative">
                      <FaRegUser className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                      <input
                        type="text"
                        name="lastName"
                        value={values.lastName}
                        onChange={handleChange}
                        placeholder="Last name"
                        className={`w-full rounded-lg border bg-white/3 py-2.5 pl-11 pr-4 text-sm placeholder:text-neutral-500 focus:outline-none ${
                          errors.lastName
                            ? "border-red-500/80 focus:border-red-500"
                            : "border-white/10 focus:border-red-500/60"
                        }`}
                      />
                    </div>
                    {errors.lastName && (
                      <p className="text-xs text-red-400">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Username */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-neutral-300">Username</label>
                  <div className="relative">
                    <FaRegUser className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                    <input
                      type="text"
                      name="username"
                      value={values.username}
                      onChange={handleChange}
                      placeholder="Choose a username"
                      className={`w-full rounded-lg border bg-white/3 py-2.5 pl-11 pr-4 text-sm placeholder:text-neutral-500 focus:outline-none ${
                        errors.username
                          ? "border-red-500/80 focus:border-red-500"
                          : "border-white/10 focus:border-red-500/60"
                      }`}
                    />
                  </div>
                  {errors.username && (
                    <p className="text-xs text-red-400">{errors.username}</p>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-neutral-300">Email Address</label>
                  <div className="relative">
                    <HiOutlineMail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                    <input
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      className={`w-full rounded-lg border bg-white/3 py-2.5 pl-11 pr-4 text-sm placeholder:text-neutral-500 focus:outline-none ${
                        errors.email
                          ? "border-red-500/80 focus:border-red-500"
                          : "border-white/10 focus:border-red-500/60"
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-400">{errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-neutral-300">Password</label>
                  <div className="relative">
                    <HiOutlineLockClosed className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                    <input
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      placeholder="Create a password"
                      className={`w-full rounded-lg border bg-white/3 py-2.5 pl-11 pr-11 text-sm placeholder:text-neutral-500 focus:outline-none ${
                        errors.password
                          ? "border-red-500/80 focus:border-red-500"
                          : "border-white/10 focus:border-red-500/60"
                      }`}
                    />
                    <button
                      type="button"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300"
                    >
                      <FaRegEye />
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-xs text-red-400">{errors.password}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-neutral-300">Confirm Password</label>
                  <div className="relative">
                    <HiOutlineLockClosed className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      className={`w-full rounded-lg border bg-white/3 py-2.5 pl-11 pr-11 text-sm placeholder:text-neutral-500 focus:outline-none ${
                        errors.confirmPassword
                          ? "border-red-500/80 focus:border-red-500"
                          : "border-white/10 focus:border-red-500/60"
                      }`}
                    />
                    <button
                      type="button"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300"
                    >
                      <FaRegEye />
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-xs text-red-400">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {serverError && (
                  <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
                    {serverError}
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-1 w-full cursor-pointer rounded-lg bg-red-600 py-2.5 font-semibold transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? "Creating account..." : "Create Account"}
                </button>
              </form>

              {/* Divider */}
              <div className="my-4 flex items-center gap-4">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-sm text-neutral-500">or continue with</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              {/* Social buttons */}
              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  className="flex w-full items-center cursor-pointer justify-center gap-3 rounded-lg border border-white/10 bg-white/3 py-2.5 text-sm font-medium transition-colors hover:bg-white/6"
                >
                  <FcGoogle size={20} />
                  Continue with Google
                </button>
              </div>

              {/* Footer */}
              <p className="mt-4 text-center text-sm text-neutral-400">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-red-500 hover:underline"
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
