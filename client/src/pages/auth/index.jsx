import Background from "@/assets/login2.png";
import Victory from "@/assets/victory.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { use, useState } from "react";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client.js";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";

const Auth = () => {
  const navigate = useNavigate();
  const { setUserInfo } = useAppStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateLogin = () => {
    if(!email.length){
      toast.error("Email is required.");
      return false;
    }
    if(!password.length){
      toast.error("Password is required.");
      return false;
    }
    return true;
  };

  const validateSignup = () => {
    if(!email.length){
      toast.error("Email is required.");
      return false;
    }
    if(!password.length){
      toast.error("Password is required.");
      return false;
    }
    if(password !== confirmPassword){
      toast.error("Password and confirm password should be same.");
      return false;
    }
    return true;
  }  

  const handleLogin = async () => {
    if(validateLogin()){
      const response = await apiClient.post(
        LOGIN_ROUTE,
        { email, password },
        { withCredentials: true }
      );
      if(response.data.user.id){
        setUserInfo(response.data.user);
        if(response.data.user.profileSetup) navigate("/chat");
        else navigate("/profile");
      }
      console.log( { response });
    }
  };

  const handleSignup = async () => {
    if(validateSignup()){
      const response = await apiClient.post(
        SIGNUP_ROUTE, 
        { email, password },
        { withCredentials: true }
      );
      if(response.status === 201){
        setUserInfo(response.data.user);
        navigate("/profile");
      }
      console.log({ response });
    }
  };

  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center bg-gray-50">
      <div className="relative flex flex-col xl:flex-row bg-white shadow-2xl rounded-3xl overflow-hidden h-[80vh] w-[90vw] lg:w-[70vw] xl:w-[60vw]">
        
        <div className="flex flex-col items-center justify-center w-full xl:w-1/2 p-8">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="flex items-center justify-center gap-3">
              <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
              <img src={Victory} alt="Victory Emoji" className="h-[60px]" />
            </div>
            <p className="font-medium mt-2 text-gray-600">
              Fill in the details to get started with the chat app!
            </p>
          </div>

          <Tabs defaultValue="login" className="w-full max-w-sm">
            <TabsList className="flex justify-center bg-transparent border-b border-gray-200 mb-6">
              <TabsTrigger
                value="login"
                className="text-lg font-medium px-6 py-2 border-b-2 border-transparent data-[state=active]:border-purple-500 data-[state=active]:text-purple-600 transition"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="text-lg font-medium px-6 py-2 border-b-2 border-transparent data-[state=active]:border-purple-500 data-[state=active]:text-purple-600 transition"
              >
                Signup
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="flex flex-col gap-5">
              <Input
                placeholder="Email"
                type="email"
                className="rounded-full p-6"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="Password"
                type="password"
                className="rounded-full p-6"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button className="rounded-full p-6 w-full" onClick={handleLogin}>
                Login
              </Button>
            </TabsContent>

            <TabsContent value="signup" className="flex flex-col gap-5">
              <Input
                placeholder="Email"
                type="email"
                className="rounded-full p-6"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="Password"
                type="password"
                className="rounded-full p-6"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Input
                placeholder="Confirm Password"
                type="password"
                className="rounded-full p-6"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button className="rounded-full p-6 w-full" onClick={handleSignup}>
                Signup
              </Button>
            </TabsContent>
          </Tabs>
        </div>

        <div className="hidden xl:flex items-center justify-center bg-purple-50 w-1/2 overflow-hidden">
          <img
            src={Background}
            alt="background login"
            className="object-contain h-[70%] max-h-[500px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;
