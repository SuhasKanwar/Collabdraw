import { Button } from "@/components/ui/button";
import { Palette, Users, Zap } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <svg
          className="absolute top-10 left-10 w-32 h-32 text-orange-300 animate-pulse"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 30 Q 40 10, 60 30 T 80 50 Q 70 70, 50 60 T 20 30"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        <svg
          className="absolute top-20 right-20 w-24 h-24 text-pink-300 animate-bounce"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="50"
            cy="50"
            r="20"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            strokeDasharray="5,5"
          />
          <path
            d="M30 30 L70 70 M70 30 L30 70"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>

        <svg
          className="absolute bottom-20 left-1/4 w-40 h-20 text-purple-300"
          viewBox="0 0 200 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 50 Q 50 10, 100 50 Q 150 90, 190 50"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            strokeDasharray="10,5"
          />
        </svg>

        <svg
          className="absolute top-1/2 right-10 w-28 h-28 text-green-300 animate-spin"
          style={{ animationDuration: "20s" }}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            points="50,10 90,90 10,90"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            strokeLinejoin="round"
          />
          <circle cx="50" cy="60" r="8" fill="currentColor" />
        </svg>

        <svg
          className="absolute bottom-10 right-1/3 w-36 h-24 text-yellow-300"
          viewBox="0 0 150 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 80 Q 30 20, 50 60 Q 70 20, 90 60 Q 110 20, 130 80"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        <svg
          className="absolute bottom-32 right-24 w-20 h-20 text-pink-400"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="30"
            y="60"
            width="20"
            height="8"
            rx="4"
            fill="currentColor"
          />
          <path
            d="M40 60 Q38 40, 60 20 Q70 10, 72 18 Q74 26, 60 40 Q50 50, 40 60"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
          />
        </svg>

        <svg
          className="absolute top-10 right-1/3 w-12 h-12 text-yellow-400 animate-spin"
          style={{ animationDuration: "12s" }}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            points="20,2 25,15 39,15 28,24 32,38 20,30 8,38 12,24 1,15 15,15"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>

        <svg
          className="absolute top-1/3 left-1/5 w-20 h-10 text-green-400"
          viewBox="0 0 80 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="10"
            y="10"
            width="60"
            height="20"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
          />
        </svg>
      </div>

      <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-pink-300 rounded-full animate-pulse"></div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 bg-gray-800/80 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-gray-200 shadow-lg border border-gray-700">
            <Zap className="w-4 h-4 text-yellow-500" />
            Collaborate, Create, Inspire
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent leading-tight">
              Collabdraw
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-medium">
              Unleash your creativity with friends and the world
            </p>
          </div>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Collabdraw is your digital studio for real-time collaborative art.
            Sketch, paint, and design together—whether you're brainstorming,
            teaching, or just having fun.
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 bg-gray-800/60 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-700 text-gray-300">
              <Users className="w-4 h-4 text-blue-500" />
              Global Collaboration
            </div>
            <div className="flex items-center gap-2 bg-gray-800/60 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-700 text-gray-300">
              <Palette className="w-4 h-4 text-green-500" />
              Limitless Canvas
            </div>
            <div className="flex items-center gap-2 bg-gray-800/60 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-700 text-gray-300">
              <Zap className="w-4 h-4 text-purple-500" />
              Instant Sync
            </div>
            <div className="flex items-center gap-2 bg-gray-800/60 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-700 text-gray-300">
              <Palette className="w-4 h-4 text-pink-500" />
              Creative Tools
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button
              size="lg"
              className="bg-gray-700 hover:bg-gray-600 text-white px-6 cursor-pointer border border-gray-600/50 py-3 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-101 transition-all duration-200"
            >
              Start Drawing
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-gray-600 hover:border-gray-500 px-8 py-3 text-lg font-semibold bg-gray-800/80 backdrop-blur-sm hover:bg-gray-700/90 text-gray-200 hover:text-white transition-all duration-200"
            >
              See How It Works
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-12 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gray-200">
                15K+
              </div>
              <div className="text-sm text-gray-400">Active Creators</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gray-200">
                80K+
              </div>
              <div className="text-sm text-gray-400">
                Collaborative Artworks
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gray-200">
                99.9%
              </div>
              <div className="text-sm text-gray-400">Uptime for Sessions</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}