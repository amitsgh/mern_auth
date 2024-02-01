import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { verifyOTP } from "../api/index.api.js";
import Spinner from "../components/Spinner.component.jsx";
import notify from "../utils/toast.util.js";

function EmailVerification() {
  const [isLoading, setIsLoading] = useState(false);
  const [otpValues, setOTPValues] = useState(["", "", "", ""]);
  const { email } = useSelector((state) => state.form);
  const navigate = useNavigate();

  useEffect(() => {
    const allValuesEntered = otpValues.every((value) => value !== "");

    if (allValuesEntered) {
      const otp = otpValues.join("");
      handleOnSubmit(otp, email);
    }
  }, [otpValues]);

  function handleInputChange(index, value) {
    const newOTPValues = [...otpValues];
    newOTPValues[index] = value;
    setOTPValues(newOTPValues);

    if (value !== "" && index < newOTPValues.length - 1) {
      const nextInput = document.getElementById(`otp-${index + 2}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  }

  function handlePaste(event) {
    event.preventDefault();

    const pastedText = event.clipboardData.getData("text/plain").trim();
    if (/^\d{4}$/.test(pastedText)) {
      setOTPValues(pastedText.split(""));
    }
  }

  async function handleOnSubmit(otp, email) {
    setIsLoading(true);

    try {
      const data = {
        email,
        otp,
      };

      const { message } = await verifyOTP(data);
      notify(message, "success");
      navigate("/login");
    } catch (error) {
      notify(error.message, "error");
    } finally {
      setIsLoading(false);
      setOTPValues(["", "", "", ""]);
    }
  }

  return (
    <section>
      <div className="flex h-screen items-center justify-center text-primary">
        <div className="relative flex w-7/12 flex-col items-center rounded-2xl border-2 bg-tertiary p-10 font-poppins shadow-2xl">
          <div className="mx-auto flex w-full max-w-lg flex-col space-y-16">
            <div className="flex flex-col items-center justify-center space-y-2 text-center">
              <h1 className="mb-3 text-center font-montserrat text-3xl font-bold">
                Verify your email address
              </h1>
              <p className="text-xs font-normal">
                We emailed you a six-digit code to {email}. <br /> Enter the
                code below to confirm your email address.
              </p>
            </div>

            <form action="" method="post">
              <div
                className="mx-auto flex max-w-xs items-center justify-center gap-5"
                onPaste={handlePaste}
              >
                {isLoading ? (
                  <Spinner width={50} height={50} />
                ) : (
                  [...Array(4)].map((_, index) => (
                    <input
                      key={index}
                      id={`otp-${index + 1}`}
                      className="custom-otp_input"
                      type="text"
                      name={`otp-${index + 1}`}
                      placeholder="0"
                      maxLength="1"
                      value={otpValues[index]}
                      onChange={(event) =>
                        handleInputChange(index, event.target.value)
                      }
                    />
                  ))
                )}
              </div>
            </form>

            <p className="rounded border border-slate border-opacity-10 bg-secondary p-3 text-center font-poppins text-xs outline-0 ">
              Make sure to keep this window open while check your inbox.{" "}
              <span className="cursor-pointer font-bold decoration-primary decoration-2 transition-all duration-200 hover:underline hover:underline-offset-2">
                Resend Code
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EmailVerification;
