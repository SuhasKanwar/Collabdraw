import { Card, CardContent } from "@/components/ui/card";
import Logo from "@/components/Logo";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <section className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-24 h-24 border-2 border-blue-500/40 rounded-full animate-pulse"></div>
        <div
          className="absolute bottom-32 right-40 w-32 h-8 border-2 border-blue-500/30 rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-40 right-32 w-16 h-16 border-2 border-blue-500/35 rotate-45 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/3 left-10 w-20 h-20 border-2 border-blue-500/30 rounded-lg rotate-12 animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute bottom-20 left-20 w-18 h-18 border-2 border-blue-500/40 rounded-full animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute top-60 left-1/3 w-12 h-12 border-2 border-blue-500/35 rounded-lg rotate-45 animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>
        <svg
          className="absolute top-10 right-10 w-32 h-32 opacity-30"
          viewBox="0 0 100 100"
        >
          <path
            d="M10,50 Q30,20 50,50 T90,50"
            stroke="#3B82F6"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
          />
        </svg>
        <svg
          className="absolute bottom-10 left-10 w-24 h-24 opacity-25 rotate-45"
          viewBox="0 0 100 100"
        >
          <path
            d="M20,80 Q40,20 60,80 T100,80"
            stroke="#3B82F6"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
          />
        </svg>
        <svg
          className="absolute top-1/2 right-20 w-28 h-28 opacity-20"
          viewBox="0 0 100 100"
        >
          <path
            d="M10,10 Q50,80 90,10 M20,90 Q60,30 100,90"
            stroke="#3B82F6"
            strokeWidth="1.5"
            fill="none"
            className="animate-pulse"
          />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-md text-center">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Logo />
            <h1 className="text-2xl font-bold text-gray-200">Collabdraw</h1>
          </div>
          <p className="text-gray-400 text-sm">
            Loading your creative workspace...
          </p>
        </div>

        <Card className="bg-gray-900/40 backdrop-blur-sm border-gray-700/30 shadow-xl">
          <CardContent className="py-12">
            <div className="flex flex-col items-center space-y-6">
              <div className="relative">
                <Loader2 className="w-12 h-12 text-blue-400 animate-spin" />
                <div className="absolute inset-0 w-12 h-12 border-2 border-blue-500/20 rounded-full animate-ping"></div>
              </div>
              
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-gray-100">Loading</h2>
                <p className="text-gray-400 text-sm">
                  Preparing your collaborative drawing experience
                </p>
              </div>

              <div className="flex space-x-1">
                <div
                  className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
                  style={{ animationDelay: "0s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
                  style={{ animationDelay: "0.3s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
                  style={{ animationDelay: "0.6s" }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <p className="text-gray-500 text-xs">
            This may take a few moments...
          </p>
        </div>
      </div>
    </section>
  );
}
