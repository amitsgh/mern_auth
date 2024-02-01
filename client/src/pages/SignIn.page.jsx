import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { register, sendOTP } from "../api/index.api";
import Google from "../assets/google.svg?react";
import Microsoft from "../assets/microsoft.svg?react";
import Spinner from "../components/Spinner.component";
import { setForm } from "../redux/auth/form.reducer";
import notify from "../utils/toast.util";

function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prevFromData) => ({
      ...prevFromData,
      [name]: value,
    }));
  }

  async function handleOnSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const { email, password } = formData;

      if (password) {
        const passwordPattern =
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordPattern.test(formData.password)) {
          throw new Error(
            "Password must contain at least 8 characters, including uppercase, lowercase, a number, and a special symbol.",
          );
        }
      }

      if (email) {
        const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
        if (!emailPattern.test(formData.email)) {
          throw new Error("Invalid email format");
        }
      }

      const response = await register(formData);
      notify(response.message, "success");
      dispatch(setForm(formData));

      const otpResponse = await sendOTP(response.email);
      notify(otpResponse.message, "success");

      navigate("/verification");
    } catch (error) {
      console.error(error);
      notify(error.message, "error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section>
      <div className="flex h-screen items-center justify-center text-primary">
        <div className="flex w-4/12 justify-center rounded-2xl border-2 bg-tertiary p-10 font-poppins shadow-2xl">
          <div className="w-10/12">
            <h1 className="mb-4 text-center font-montserrat text-2xl font-bold">
              Sign in
            </h1>
            <form className="" onSubmit={handleOnSubmit}>
              <input
                name="email"
                // type="email"
                value={formData.email}
                onChange={handleChange}
                className="custom-input"
                placeholder="Enter email"
                autoFocus
              />
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="custom-input"
                placeholder="Enter password"
              />
              <button type="submit" className="custom-button">
                {isLoading ? <Spinner width={20} height={20} /> : ""}
                Sign In
              </button>
              <div className="m-4 text-center uppercase opacity-50">or</div>
              <button type="button" className="custom-social_button">
                <span className="inline-block h-4 w-4">
                  <Google />
                </span>
                Continue with Google
              </button>
              <button type="button" className="custom-social_button">
                <span className="inline-block h-4 w-4">
                  <Microsoft />
                </span>
                Continue with Microsoft
              </button>
            </form>
            <p className="mt-6 text-center text-xs">
              Can’t sign in?・
              <br />
              <span className="cursor-pointer font-semibold decoration-primary decoration-2 transition-all duration-200 hover:underline hover:underline-offset-2">
                <Link to="/login">Already have an account?</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignIn;
