import RecieveEmail from "../components/forget_password/ForgetPassword";
import ChatVerseDetail from "../global/ChatVerseDetail";

const ForgetPassword = () => {
  return (
    <div className="min-h-screen flex items-center bg-gray-100">
      <RecieveEmail />
      <ChatVerseDetail className="hidden sm:w-full min-h-screen md:flex items-center justify-center p-4" />
    </div>
  );
};

export default ForgetPassword;
