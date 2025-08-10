import ResetEmail from "../components/forget_password/ResetEmail";
import ChatVerseDetail from "../global/ChatVerseDetail";

const ResetPassword = () => {
  return (
    <div className="min-h-screen flex items-center bg-gray-100">
      <ResetEmail />
      <ChatVerseDetail className="hidden sm:w-full min-h-screen md:flex items-center justify-center p-4" />
    </div>
  );
};

export default ResetPassword;
