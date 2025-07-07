"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Navbar as ResizableNavbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
} from "@/components/ui/resizable-navbar";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Logo from "@/components/Logo";
import { api } from "@/lib/api";

const NAV_ITEMS = [
  { name: "Features", link: "/#features" },
  { name: "Benefits", link: "/#benefits" },
  { name: "Testimonials", link: "/#testimonials" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await api.get("/api/auth/logout");
      toast.success("Logged out successfully.");
    } catch (e) {
      toast.error("Logout failed. Please try again later.");
    }
    router.push("/signin");
  };

  return (
    <ResizableNavbar className="top-6">
      <NavBody>
        <Link
          className="flex items-center space-x-2 cursor-pointer z-50"
          href="/"
        >
          <Logo />
          <span className="text-2xl font-bold text-white">
            CollabDraw
          </span>
        </Link>
        <NavItems items={NAV_ITEMS} className="text-gray-300 hover:text-white" />
        <div className="flex items-center space-x-4 z-50">
          {isLoggedIn ? (
            <>
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  className="text-white border-gray-600/50 hover:text-white hover:bg-gray-700/70 hover:border-gray-500 cursor-pointer bg-transparent"
                >
                  Dashboard
                </Button>
              </Link>
              <Button
                className="bg-gray-700 hover:bg-gray-600 text-white px-6 cursor-pointer border border-gray-600/50"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/signin">
                <Button
                  variant="ghost"
                  className="text-gray-300 hover:text-white hover:bg-gray-800/50 cursor-pointer"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-gray-700 hover:bg-gray-600 text-white px-6 cursor-pointer border border-gray-600/50">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </NavBody>
      <MobileNav>
        <MobileNavHeader>
          <Link className="flex items-center space-x-2 cursor-pointer" href="/">
            <Logo />
            <span className="text-2xl font-bold text-white">
              CollabDraw
            </span>
          </Link>
          <MobileNavToggle
            isOpen={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          />
        </MobileNavHeader>
        <MobileNavMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.name}
              href={item.link}
              className="block px-4 py-2 text-lg text-gray-300 hover:text-white"
              onClick={() => setMobileOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="flex flex-col gap-2 mt-4 w-full">
            {isLoggedIn ? (
              <>
                <Link href="/dashboard">
                  <Button
                    variant="outline"
                    className="w-full text-white border-gray-600/50 hover:text-white hover:bg-gray-700/70 cursor-pointer bg-transparent"
                  >
                    Dashboard
                  </Button>
                </Link>
                <Button
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white px-6 cursor-pointer border border-gray-600/50"
                  onClick={() => {
                    setMobileOpen(false);
                    handleLogout();
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/signin" passHref legacyBehavior>
                  <div>
                    <Button
                      variant="ghost"
                      className="w-full text-gray-300 hover:text-white hover:bg-gray-800/50 cursor-pointer"
                    >
                      Sign In
                    </Button>
                  </div>
                </Link>
                <Link href="/signup" passHref legacyBehavior>
                  <div>
                    <Button className="w-full bg-gray-700 hover:bg-gray-600 text-white px-6 cursor-pointer border border-gray-600/50">
                      Sign Up
                    </Button>
                  </div>
                </Link>
              </>
            )}
          </div>
        </MobileNavMenu>
      </MobileNav>
    </ResizableNavbar>
  );
};

export default Navbar;