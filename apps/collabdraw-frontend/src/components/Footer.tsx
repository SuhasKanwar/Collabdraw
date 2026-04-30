import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "@/components/Logo";
import {
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  Instagram,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-black border-t border-gray-800/50">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-orange-400 to-purple-400 rounded-full blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex flex-row items-center gap-2">
              <Logo />
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Collabdraw
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Your digital studio for real-time collaborative art. Create,
              collaborate, and inspire with artists around the world.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/SuhasKanwar"
                className="text-gray-400 hover:text-purple-400 transition-all duration-300 hover:scale-110 p-2 rounded-lg hover:bg-gray-800/50"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/suhas-kanwar-4a3a09291"
                className="text-gray-400 hover:text-purple-400 transition-all duration-300 hover:scale-110 p-2 rounded-lg hover:bg-gray-800/50"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:suhas.kanwar@gmail.com"
                className="text-gray-400 hover:text-purple-400 transition-all duration-300 hover:scale-110 p-2 rounded-lg hover:bg-gray-800/50"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/suhaskanwar.bh3"
                className="text-gray-400 hover:text-purple-400 transition-all duration-300 hover:scale-110 p-2 rounded-lg hover:bg-gray-800/50"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent ml-5">
              Product
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group"
                >
                  <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group"
                >
                  <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Drawing Tools
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group"
                >
                  <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Collaboration
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group"
                >
                  <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Templates
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group"
                >
                  <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Export Options
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent ml-5">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group"
                >
                  <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group"
                >
                  <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group"
                >
                  <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group"
                >
                  <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group"
                >
                  <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Press Kit
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="font-semibold text-lg bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
              Stay Updated
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Get the latest updates on new features and collaborative art
              showcases.
            </p>
            <div className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-1 focus:ring-purple-400/20 backdrop-blur-sm"
              />
              <Button
                className="w-full bg-gray-700 hover:bg-gray-600 text-white px-6 cursor-pointer border border-gray-600/50 font-medium shadow-lg hover:shadow-xl transform transition-all duration-200"
                size="sm"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800/50 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-1 text-gray-400 text-sm">
              <span>© 2025 Collabdraw. Made</span>
              <span>for creators worldwide.</span>
            </div>

            <div className="flex space-x-8">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors text-sm hover:underline decoration-purple-400"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors text-sm hover:underline decoration-purple-400"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors text-sm hover:underline decoration-purple-400"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}