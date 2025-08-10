import SignupForm from "../components/signup/SignupForm";
import ChatVerseDetail from "../global/ChatVerseDetail";

const Signup: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center bg-gray-100">
      <ChatVerseDetail className="hidden sm:w-full min-h-screen md:flex items-center justify-center p-4" />
      <SignupForm />
    </div>
  );
};

export default Signup;
