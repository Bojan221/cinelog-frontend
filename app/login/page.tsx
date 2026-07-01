"use client";

import Logo from "@/components/core/Logo";
import {
  FaRegStar,
  FaRegBookmark,
  FaRegEye,
  FaRegEyeSlash,
  FaApple,
} from "react-icons/fa";
import { IoStatsChartSharp } from "react-icons/io5";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginSchema } from "./schema";
import { useAppDispatch } from "@/reduxStore/hooks";
import { loginUser } from "@/reduxStore/authSlice";

type FormValues = {
  email: string;
  password: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  email: "",
  password: "",
};

function page() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setServerError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError(null);
    const result = loginSchema.safeParse(values);

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
        loginUser({ email: result.data.email, password: result.data.password })
      ).unwrap();
      router.push("/");
    } catch (err) {
      setServerError(typeof err === "string" ? err : "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#0a0a0b] text-white">
      <div className="absolute top-5 left-8 z-20">
        <Logo size="lg" />
      </div>

      <div className="mx-auto flex h-screen max-w-6xl items-center px-6 pt-16 pb-6">
        <div className="grid max-h-full w-full overflow-hidden rounded-2xl border border-white/10 lg:grid-cols-2">
          {/* Left promo panel */}
          <div className="relative flex flex-col justify-center p-8">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/registerbg.jpg')" }}
            />
            <div className="absolute inset-0 bg-[#0a0a0b]/70" />

            <div className="relative z-10 max-w-md">
              <h1 className="text-4xl font-bold tracking-tight">
                Welcome back to Cine<span className="text-red-500">Log</span>
              </h1>
              <p className="mt-3 text-lg text-neutral-300">
                Log in to pick up right where you left off.
              </p>

              <div className="mt-8 flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-500/15">
                    <FaRegBookmark size={22} className="text-red-500" />
                  </div>
                  <div>
                    <span className="font-semibold">Your Watchlist</span>
                    <p className="mt-1 text-sm text-neutral-300">
                      Everything you saved, ready to watch.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-500/15">
                    <FaRegStar size={22} className="text-red-500" />
                  </div>
                  <div>
                    <span className="font-semibold">Ratings &amp; Reviews</span>
                    <p className="mt-1 text-sm text-neutral-300">
                      Continue sharing your thoughts on films.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-500/15">
                    <IoStatsChartSharp size={22} className="text-red-500" />
                  </div>
                  <div>
                    <span className="font-semibold">Your Movie Stats</span>
                    <p className="mt-1 text-sm text-neutral-300">
                      Track your journey with detailed stats.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right form panel */}
          <div className="min-h-0 overflow-y-auto bg-[#0d0d0f] p-8 sleek-scrollbar">
            <div className="mx-auto w-full max-w-md">
              <div className="text-center">
                <h2 className="text-2xl font-bold">Sign In</h2>
                <p className="mt-1 text-sm text-neutral-400">
                  Enter your credentials to access your account
                </p>
              </div>

              <form
                className="mt-6 flex flex-col gap-3"
                onSubmit={handleSubmit}
                noValidate
              >
                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-neutral-300">
                    Email Address
                  </label>
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
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className={`w-full rounded-lg border bg-white/3 py-2.5 pl-11 pr-11 text-sm placeholder:text-neutral-500 focus:outline-none ${
                        errors.password
                          ? "border-red-500/80 focus:border-red-500"
                          : "border-white/10 focus:border-red-500/60"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300"
                    >
                      {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-xs text-red-400">{errors.password}</p>
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
                  {submitting ? "Signing in..." : "Sign In"}
                </button>
              </form>

              {/* Divider */}
              <div className="my-4 flex items-center gap-4">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-sm text-neutral-500">
                  or continue with
                </span>
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
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="font-semibold text-red-500 hover:underline"
                >
                  Sign up
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
