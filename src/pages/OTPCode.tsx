import ChatVerseDetail from "../global/ChatVerseDetail";
import OTPForm from "../components/otp_code/OTPForm";

const OTPCode = () => {
  return (
    <div className="min-h-screen flex items-center bg-gray-100">
      <OTPForm />
      <ChatVerseDetail className="hidden sm:w-full min-h-screen md:flex items-center justify-center p-4" />
    </div>
  );
};

export default OTPCode;
