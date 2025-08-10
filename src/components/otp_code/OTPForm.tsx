import React, { useState, useRef, useEffect } from "react";

const OTPForm: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus on first input when component mounts
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index: number, value: string) => {
    // Only allow single digit
    if (value.length > 1) return;

    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError(""); // Clear error when user types

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    // Handle arrow keys
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.slice(0, 6).split("");

    // Only process if all characters are digits
    if (pasteArray.every((char) => /^\d$/.test(char))) {
      const newOtp = [...otp];
      pasteArray.forEach((digit, index) => {
        if (index < 6) {
          newOtp[index] = digit;
        }
      });
      setOtp(newOtp);

      // Focus on the next empty input or last input
      const nextIndex = Math.min(pasteArray.length, 5);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const onSubmit = async () => {
    const otpString = otp.join("");

    if (otpString.length !== 4) {
      setError("Please enter all 4 digits");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("OTP submitted:", otpString);
      // Handle successful OTP verification here
    } catch (error) {
      setError("Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resendOTP = async () => {
    setIsLoading(true);
    try {
      // Simulate resend API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setOtp(["", "", "", ""]);
      setError("");
      inputRefs.current[0]?.focus();
      // You can show a success message here
    } catch (error) {
      setError("Failed to resend OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-white md:w-2/4 space-y-3 flex items-center justify-center p-3">
      <div className="py-6 px-3">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Verify Your Account
          </h2>
          <p className="text-gray-600 text-sm sm:text-base px-2">
            Enter the 4-digit code sent to your phone
          </p>
        </div>

        {/* OTP Form */}
        <div className="space-y-6">
          {/* OTP Input Boxes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
              Enter Verification Code
            </label>
            <div className="flex justify-center space-x-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                />
              ))}
            </div>
            {error && (
              <p className="text-red-500 text-sm mt-3 text-center">{error}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={onSubmit}
            disabled={isLoading}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm sm:text-base font-medium text-white ${
              isLoading
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            } transition-all duration-200`}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                <span>Verifying...</span>
              </div>
            ) : (
              "Verify OTP"
            )}
          </button>

          {/* Resend OTP */}
          <div className="text-center px-2">
            <p className="text-xs sm:text-sm text-gray-600">
              Didn't receive the code?{" "}
              <button
                type="button"
                onClick={resendOTP}
                disabled={isLoading}
                className="font-medium text-green-600 hover:text-green-800 transition-colors duration-200 cursor-pointer disabled:opacity-50"
              >
                Resend OTP
              </button>
            </p>
          </div>
        </div>

        {/* Back to Signup Link */}
        <div className="mt-6 text-center px-2">
          <p className="text-xs sm:text-sm text-gray-600">
            Want to change phone number?{" "}
            <span className="font-medium text-green-600 hover:text-green-800 transition-colors duration-200 cursor-pointer">
              Go back
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OTPForm;
