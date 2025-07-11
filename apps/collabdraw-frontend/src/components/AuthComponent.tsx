"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, Lock, User, Github, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { useAuth } from "@/providers/AuthProvider";
import Logo from "./Logo";

function handleComingSoon() {
  toast.info("This service is not available currently.");
}

async function handleSignIn(formData: FormData, setToken: Function): Promise<boolean> {
  const { email, password } = Object.fromEntries(formData.entries());
  try {
    const response = await api.post("/api/auth/signin", {
      email: email,
      password: password,
    });
    if (response.status !== 200) {
      toast.error(response.data.error || "Sign in failed. Please try again.");
      return false;
    }
    setToken(response.data.token);
    return true;
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message || "Sign in failed. Please try again.");
    } else {
      toast.error("An unexpected error occurred. Please try again.");
    }
    return false;
  }
}

async function handleSignUp(formData: FormData): Promise<boolean> {
  const { email, password, name } = Object.fromEntries(formData.entries());
  try {
    const repponse = await api.post("/api/auth/signup", {
      name: name,
      email: email,
      password: password,
    });
    if (repponse.status !== 201) {
      toast.error(repponse.data.error || "Sign up failed. Please try again.");
      return false;
    }
    return true;
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message || "Sign up failed. Please try again.");
    } else {
      toast.error("An unexpected error occurred. Please try again.");
    }
    return false;
  }
}

export default function AuthComponent({ isSignUp }: { isSignUp: boolean }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setToken } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setLoading(true);

    if (isSignUp) {
      if (formData.get("password") !== formData.get("confirmPassword")) {
        toast.error("Passwords do not match.");
        setLoading(false);
        return;
      }
      const success = await handleSignUp(formData);
      if (success) {
        toast.success("Account created successfully");
        setTimeout(() => {
          router.push("/signin");
        }, 1000);
      }
    } else {
      const success = await handleSignIn(formData, setToken);
      if (success) {
        toast.success("Signed in successfully");
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      }
    }
    setLoading(false);
  };

  return (
    <section className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-24 h-24 border-2 border-gray-500/40 rounded-full animate-pulse"></div>
        <div
          className="absolute bottom-32 right-40 w-32 h-8 border-2 border-gray-500/30 rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-40 right-32 w-16 h-16 border-2 border-gray-500/35 rotate-45 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/3 left-10 w-20 h-20 border-2 border-gray-500/30 rounded-lg rotate-12 animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute bottom-20 left-20 w-18 h-18 border-2 border-gray-500/40 rounded-full animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute top-60 left-1/3 w-12 h-12 border-2 border-gray-500/35 rounded-lg rotate-45 animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>
        <svg
          className="absolute top-10 right-10 w-32 h-32 opacity-30"
          viewBox="0 0 100 100"
        >
          <path
            d="M10,50 Q30,20 50,50 T90,50"
            stroke="#6B7280"
            strokeWidth="2"
            fill="none"
          />
        </svg>
        <svg
          className="absolute bottom-10 left-10 w-24 h-24 opacity-25 rotate-45"
          viewBox="0 0 100 100"
        >
          <path
            d="M20,80 Q40,20 60,80 T100,80"
            stroke="#6B7280"
            strokeWidth="2"
            fill="none"
          />
        </svg>
        <svg
          className="absolute top-1/2 right-20 w-28 h-28 opacity-20"
          viewBox="0 0 100 100"
        >
          <path
            d="M10,10 Q50,80 90,10 M20,90 Q60,30 100,90"
            stroke="#6B7280"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
        <svg
          className="absolute bottom-1/3 left-1/4 w-20 h-20 opacity-25 rotate-12"
          viewBox="0 0 100 100"
        >
          <path
            d="M30,10 Q10,50 30,90 Q70,70 90,30 Q60,10 30,10"
            stroke="#6B7280"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </div>
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Logo />
            <h1 className="text-2xl font-bold text-gray-200">
              CollabDraw
            </h1>
          </div>
          <p className="text-gray-400 text-sm">
            Create, collaborate, and bring your ideas to life
          </p>
        </div>
        <Card className="bg-gray-900/40 backdrop-blur-sm border-gray-700/30 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-100">
              {isSignUp ? "Join CollabDraw" : "Welcome Back"}
            </CardTitle>
            <CardDescription className="text-gray-400">
              {isSignUp
                ? "Create your account and start collaborating"
                : "Sign in to continue your creative journey"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form className="space-y-4" onSubmit={handleSubmit}>
              {isSignUp && (
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-slate-300 text-sm font-medium"
                  >
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-slate-400 focus:border-purple-500 focus:ring-purple-500/20"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-slate-300 text-sm font-medium"
                >
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-slate-400 focus:border-purple-500 focus:ring-purple-500/20"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-slate-300 text-sm font-medium"
                >
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    className="pl-10 pr-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-slate-400 focus:border-purple-500 focus:ring-purple-500/20"
                    required
                  />
                </div>
              </div>

              {isSignUp && (
                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-slate-300 text-sm font-medium"
                  >
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      className="pl-10 pr-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-slate-400 focus:border-purple-500 focus:ring-purple-500/20"
                      required
                    />
                  </div>
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gray-800 hover:bg-gray-700 text-gray-100 font-medium py-2.5 transition-all duration-200 border border-gray-600/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {isSignUp ? "Creating Account..." : "Signing In..."}
                  </>
                ) : (
                  isSignUp ? "Create Account" : "Sign In"
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700/50"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-gray-400 bg-gray-900/40">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                disabled={loading}
                className="bg-gray-800/50 border-gray-700/50 text-gray-300 hover:bg-gray-700/50 hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleComingSoon}
              >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </Button>
              <Button
                variant="outline"
                disabled={loading}
                className="bg-gray-800/50 border-gray-700/50 text-gray-300 hover:bg-gray-700/50 hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleComingSoon}
              >
                <Github />
                GitHub
              </Button>
            </div>

            <div className="text-center">
              <p className="text-gray-400 text-sm">
                {isSignUp
                  ? "Already have an account?"
                  : "Don't have an account?"}{" "}
                <button
                  disabled={loading}
                  onClick={() => router.push(isSignUp ? "/signin" : "/signup")}
                  className="text-gray-300 hover:text-gray-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSignUp ? "Sign in" : "Sign up"}
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <p className="text-gray-500 text-xs">
            By continuing, you agree to our{" "}
            <a href="#" className="text-gray-400 hover:text-gray-300">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-gray-400 hover:text-gray-300">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}