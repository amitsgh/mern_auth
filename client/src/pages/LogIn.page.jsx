import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { login } from "../api/index.api";
import Spinner from "../components/Spinner.component";
import notify from "../utils/toast.util";

function LogIn() {
  const [isLoading, setIsLoading] = useState(false);
  const userData = useSelector((state) => state.form);

  const [formData, setFormData] = useState({
    email: userData.email,
    password: userData.password,
  });

  const navigate = useNavigate();

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

      const response = await login(formData);
      notify(response.message, "success");
      navigate("/welcome");
    } catch (error) {
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
                value={formData.email}
                onChange={handleChange}
                className="custom-input"
                placeholder="Enter email"
              />
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="custom-input"
                placeholder="Enter password"
              />
              <button
                type="submit"
                className="custom-button"
                disabled={isLoading}
              >
                {isLoading ? <Spinner width={20} height={20} /> : ""}
                Log In
              </button>
            </form>

            <p className="mt-6 text-center text-xs">
              Can’t log in?
              <br />
              <span className="cursor-pointer font-semibold decoration-primary decoration-2 transition-all duration-200 hover:underline hover:underline-offset-2">
                <Link to="/">Create an account?</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LogIn;
