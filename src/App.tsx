import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import MainLayout from "./pages/MainLayout";
import ChatLayout from "./pages/ChatLayout";
import ChatDetail from "./pages/ChatDetail";
import ChatVerseDetail from "./global/ChatVerseDetail";
import ProfileDetail from "./pages/ProfileDetail";
import OTPCode from "./pages/OTPCode";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/forget-password" element={<ForgetPassword />} />  
        <Route path="/otp-code" element={<OTPCode />} />  
        <Route path="/reset-password/:token" element={<ResetPassword />} />

      {/******** for chats layout ******/}
      
        <Route path="/chatverse" element={<MainLayout />}>
          {/* Default redirect to chats */}
          <Route index element={<Navigate to="chats" replace />} />

          {/* Chats Routes */}
          <Route path="chats" element={<ChatLayout />}>
            <Route
              index
              element={
                <ChatVerseDetail className="h-screen flex items-center justify-center" />
              }
            />
            <Route path="chat/:chatId" element={<ChatDetail />} />
            <Route path="profile/:userId" element={<ProfileDetail />} />
          </Route>

          {/* Other Routes */}
          <Route path="calls" element={<div>calls</div>} />
          <Route path="status" element={<div>status</div>} />
          <Route path="posts" element={<div>posts</div>} />
          <Route path="starred" element={<div>starred</div>} />
          <Route path="settings" element={<div>settings</div>} />
          <Route path="profile" element={<div>profile</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
