"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Logo from "@/components/Logo";
import { Home, ArrowLeft, Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

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
      </div>

      <div className="relative z-10 w-full max-w-md text-center">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Logo />
            <h1 className="text-2xl font-bold text-gray-200">Collabdraw</h1>
          </div>
        </div>

        <Card className="bg-gray-900/40 backdrop-blur-sm border-gray-700/30 shadow-xl">
          <CardHeader className="text-center">
            <div className="text-6xl font-bold text-gray-300 mb-4">404</div>
            <CardTitle className="text-2xl font-bold text-gray-100">
              Page Not Found
            </CardTitle>
            <CardDescription className="text-gray-400">
              The page you're looking for doesn't exist or has been moved.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <Button
                onClick={() => router.push("/")}
                className="bg-gray-800 hover:bg-gray-700 text-gray-100 font-medium py-2.5 transition-all duration-200 border border-gray-600/30"
              >
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Button>
              <Button
                variant="outline"
                onClick={() => router.back()}
                className="bg-gray-800/50 border-gray-700/50 text-gray-300 hover:bg-gray-700/50 hover:text-gray-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/dashboard")}
                className="bg-gray-800/50 border-gray-700/50 text-gray-300 hover:bg-gray-700/50 hover:text-gray-200"
              >
                <Search className="w-4 h-4 mr-2" />
                Browse Projects
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <p className="text-gray-500 text-xs">
            Lost? Try searching for what you need or contact support.
          </p>
        </div>
      </div>
    </section>
  );
}
