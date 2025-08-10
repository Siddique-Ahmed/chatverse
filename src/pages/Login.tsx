import LoginForm from "../components/login/LoginForm";
import ChatVerseDetail from "../global/ChatVerseDetail";

const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center bg-gray-100">
      <LoginForm />
      <ChatVerseDetail className="hidden sm:w-full min-h-screen md:flex items-center justify-center p-4"/>
    </div>
  );
};

export default Login;
