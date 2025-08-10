import React, { useState } from "react";
import { FiMail, FiPhone, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";
import { SyncLoader } from "react-spinners";

type LoginMethod = "email" | "phone";

const LoginForm: React.FC = () => {
  const [loginMethod, setLoginMethod] = useState<LoginMethod>("email");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  // const [isLoading, setIsLoading] = useState<boolean>(true);

  const isLoading = false; 
  
  
  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  // };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="w-full bg-white md:w-2/4 space-y-2 flex items-center justify-center p-3">
      <div className="py-8 px-3">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

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

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-green-600 transition-colors duration-200"
              >
                {showPassword ? (
                  <FiEyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <FiEye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <Link
              to={"/forget-password"}
              className="text-sm text-green-600 hover:text-green-800 transition-colors duration-200 cursor-pointer"
            >
              Forgot your password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${
              isLoading
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isLoading ? <SyncLoader color="#ffffff" size={5} /> : "Login"}
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to={"/register"}
              className="font-medium text-green-600 hover:text-green-800 transition-colors duration-200 cursor-pointer"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
