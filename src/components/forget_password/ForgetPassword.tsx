import React, { useState } from "react";
import { FiMail, FiPhone } from "react-icons/fi";
import { Link } from "react-router-dom";

type LoginMethod = "email" | "phone";

const RecieveEmail = () => {
  const [loginMethod, setLoginMethod] = useState<LoginMethod>("email");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginData = {
      [loginMethod]: loginMethod === "email" ? email : phone,
    };
    console.log("Login data:", loginData);
    // Handle login logic here
    alert(
      `Login attempted with ${loginMethod}: ${
        loginMethod === "email" ? email : phone
      }`
    );
  };
  return (
    <div className="w-full h-screen bg-white md:w-2/4 space-y-2 flex items-center justify-center p-3">
      <div className="py-8 px-3">
        {/* Login Method Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1 mb-3">
          <button
            type="button"
            onClick={() => setLoginMethod("email")}
            className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md transition-all duration-200 ${
              loginMethod === "email"
                ? "bg-white text-green-600 shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <FiMail className="mr-2" />
            Email
          </button>
          <button
            type="button"
            onClick={() => setLoginMethod("phone")}
            className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md transition-all duration-200 ${
              loginMethod === "phone"
                ? "bg-white text-green-600 shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <FiPhone className="mr-2" />
            Phone
          </button>
        </div>

        {/* Login Form */}
        <div className="space-y-3">
          {/* Email/Phone Input */}
          <div>
            <label
              htmlFor={loginMethod}
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {loginMethod === "email" ? "Email Address" : "Phone Number"}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {loginMethod === "email" ? (
                  <FiMail className="h-5 w-5 text-gray-400" />
                ) : (
                  <FiPhone className="h-5 w-5 text-gray-400" />
                )}
              </div>
              <input
                id={loginMethod}
                name={loginMethod}
                type={loginMethod === "email" ? "email" : "tel"}
                required
                value={loginMethod === "email" ? email : phone}
                onChange={(e) =>
                  loginMethod === "email"
                    ? setEmail(e.target.value)
                    : setPhone(e.target.value)
                }
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                placeholder={
                  loginMethod === "email"
                    ? "Enter your email"
                    : "Enter your phone number"
                }
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={() => {
              const fakeEvent = {
                preventDefault: () => {},
              } as React.FormEvent<HTMLFormElement>;
              handleSubmit(fakeEvent);
            }}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 transform hover:scale-[1.02]"
          >
            
            Forget Password
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            <Link
              to={"/login"}
              className="font-medium text-green-600 hover:text-green-800 transition-colors duration-200 cursor-pointer"
            >
              Cancel
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecieveEmail;
