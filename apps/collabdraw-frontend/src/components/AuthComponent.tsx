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
import { Mail, Lock, User, Palette, Github, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { useAuth } from "@/providers/AuthProvider";

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
    <section className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-pink-300/15 to-purple-300/15 rounded-full blur-xl animate-pulse"></div>
        <div
          className="absolute bottom-32 left-40 w-40 h-40 bg-gradient-to-r from-green-300/15 to-emerald-300/15 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-40 right-32 w-24 h-16 bg-gradient-to-r from-blue-300/15 to-cyan-300/15 rounded-lg blur-lg animate-bounce rotate-12"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/3 right-10 w-36 h-20 bg-gradient-to-r from-indigo-300/15 to-purple-300/15 rounded-xl blur-2xl animate-bounce -rotate-12"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute bottom-20 right-20 w-28 h-18 bg-gradient-to-r from-yellow-300/15 to-orange-300/15 rounded-lg blur-xl animate-pulse rotate-45"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute top-1/2 left-10 w-20 h-20 bg-gradient-to-r from-rose-300/15 to-pink-300/15 blur-lg animate-pulse"
          style={{
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            animationDelay: "3s",
          }}
        ></div>
        <div
          className="absolute top-60 left-1/3 w-16 h-16 bg-gradient-to-r from-violet-300/15 to-fuchsia-300/15 blur-lg animate-bounce"
          style={{
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            animationDelay: "2.5s",
            transform: "rotate(180deg)",
          }}
        ></div>
        <div
          className="absolute top-32 left-1/2 w-24 h-24 bg-gradient-to-r from-teal-300/15 to-cyan-300/15 blur-xl animate-pulse"
          style={{
            clipPath:
              "polygon(20% 0%, 80% 10%, 100% 35%, 85% 70%, 75% 100%, 50% 85%, 25% 100%, 0% 75%, 10% 50%, 0% 25%)",
            animationDelay: "4s",
          }}
        ></div>
        <div
          className="absolute bottom-40 right-1/3 w-32 h-20 bg-gradient-to-r from-amber-300/15 to-yellow-300/15 blur-lg animate-bounce"
          style={{
            clipPath:
              "polygon(25% 0%, 75% 15%, 100% 50%, 80% 85%, 40% 100%, 0% 70%, 15% 30%)",
            animationDelay: "1.8s",
          }}
        ></div>
        <div
          className="absolute top-3/4 left-1/4 w-18 h-18 bg-gradient-to-r from-emerald-300/15 to-green-300/15 blur-lg animate-pulse rotate-45"
          style={{ animationDelay: "3.5s" }}
        ></div>
      </div>
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Palette className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              CollabDraw
            </h1>
          </div>
          <p className="text-slate-400 text-sm">
            Create, collaborate, and bring your ideas to life
          </p>
        </div>
        <Card className="bg-gray-900/60 backdrop-blur-xl border-gray-800/50 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-white">
              {isSignUp ? "Join CollabDraw" : "Welcome Back"}
            </CardTitle>
            <CardDescription className="text-slate-400">
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
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-2.5 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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
                <div className="w-full border-t border-slate-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-slate-400 bg-[#0d1422]">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                disabled={loading}
                className="bg-gray-800/50 border-gray-700 text-slate-300 hover:bg-gray-700/50 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
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
                className="bg-gray-800/50 border-gray-700 text-slate-300 hover:bg-gray-700/50 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleComingSoon}
              >
                <Github />
                GitHub
              </Button>
            </div>

            <div className="text-center">
              <p className="text-slate-400 text-sm">
                {isSignUp
                  ? "Already have an account?"
                  : "Don't have an account?"}{" "}
                <button
                  disabled={loading}
                  onClick={() => router.push(isSignUp ? "/signin" : "/signup")}
                  className="text-purple-400 hover:text-purple-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSignUp ? "Sign in" : "Sign up"}
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <p className="text-slate-500 text-xs">
            By continuing, you agree to our{" "}
            <a href="#" className="text-purple-400 hover:text-purple-300">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-purple-400 hover:text-purple-300">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}