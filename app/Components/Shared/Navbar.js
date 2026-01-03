"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  FiMenu,
  FiX,
  FiUser,
  FiLogOut,
  FiHome,
  FiBook,
  FiSearch,
  FiShoppingCart,
  FiChevronDown,
  FiBell,
  FiMessageSquare,
  FiSettings,
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi";

// Mock hooks for demonstration
const useAuth = () => ({
  user: { name: "John Doe", email: "john@example.com", role: "student" },
  isAuthenticated: true,
});

const useAuthActions = () => ({
  logout: async () => {},
  getMe: async () => {},
});

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const userMenuRef = useRef(null);
  const searchRef = useRef(null);

  const { user, isAuthenticated } = useAuth();
  const { logout, getMe } = useAuthActions();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!user && isAuthenticated) {
      getMe();
    }
  }, [user, isAuthenticated, getMe]);

  const handleLogout = async () => {
    try {
      await logout();
      alert("Logged out successfully");
    } catch (error) {
      alert(error.message || "Logout failed");
    }
  };

  const getDashboardLink = () => {
    if (!user) return "/login";
    if (user.role === "admin") return "/admin/dashboard";
    if (user.role === "instructor") return "/instructor/dashboard";
    return "/student/dashboard";
  };

  return (
    <>
      {/* Blurred Background Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        />
      )}

      <nav
        className={`fixed top-4 left-4 right-4 z-50 transition-all duration-500 ${
          scrolled
            ? "glassmorphism-scrolled shadow-2xl rounded-[2rem]"
            : "glassmorphism-default rounded-[2.5rem]"
        }`}
      >
        {/* Animated Border Gradient */}
        <div className="absolute inset-0 rounded-[inherit] p-[1px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-rose-400/20 via-pink-400/20 to-purple-400/20 rounded-[inherit]"></div>
        </div>

        <div className="relative container mx-auto px-4 lg:px-6">
          <div className="flex justify-between items-center h-20">
            {/* Logo with Glow Effect */}
            <Link
              href="/"
              className="flex items-center space-x-3 group relative"
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 to-pink-600 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-all duration-300"></div>
                <div className="relative w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl flex items-center justify-center shadow-2xl group-hover:shadow-rose-500/30 transition-all duration-300 group-hover:scale-105">
                  <HiSparkles className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full animate-pulse ring-2 ring-white"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
                  CourseMaster
                </span>
                <span className="text-xs text-gray-600/80 -mt-1 tracking-wider">
                  LEARN & GROW
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1 bg-white/60 backdrop-blur-sm rounded-2xl px-2 py-1">
              <Link
                href="/"
                className="px-5 py-2.5 text-gray-800 hover:text-rose-700 font-medium transition-all duration-300 rounded-xl hover:bg-white/40 relative group"
              >
                <span className="relative z-10">Home</span>
                <div className="absolute inset-0 bg-gradient-to-r from-rose-500/0 via-rose-500/10 to-pink-500/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <Link
                href="/courses"
                className="px-5 py-2.5 text-gray-800 hover:text-rose-700 font-medium transition-all duration-300 rounded-xl hover:bg-white/40 relative group"
              >
                <span className="relative z-10">Courses</span>
                <div className="absolute inset-0 bg-gradient-to-r from-rose-500/0 via-rose-500/10 to-pink-500/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <Link
                href="/about"
                className="px-5 py-2.5 text-gray-800 hover:text-rose-700 font-medium transition-all duration-300 rounded-xl hover:bg-white/40 relative group"
              >
                <span className="relative z-10">About</span>
                <div className="absolute inset-0 bg-gradient-to-r from-rose-500/0 via-rose-500/10 to-pink-500/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <Link
                href="/contact"
                className="px-5 py-2.5 text-gray-800 hover:text-rose-700 font-medium transition-all duration-300 rounded-xl hover:bg-white/40 relative group"
              >
                <span className="relative z-10">Contact</span>
                <div className="absolute inset-0 bg-gradient-to-r from-rose-500/0 via-rose-500/10 to-pink-500/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>

            {/* Right Section */}
            <div className="hidden lg:flex items-center space-x-3">
              {/* Search with Glassmorphism */}
              <div className="relative" ref={searchRef}>
                <div
                  className={`flex items-center overflow-hidden transition-all duration-300 ${
                    searchOpen ? "w-64" : "w-12"
                  }`}
                >
                  <div className="relative flex items-center w-full">
                    <input
                      type="text"
                      placeholder="Search courses..."
                      className={`w-full pl-12 pr-4 py-2.5 bg-white/60 backdrop-blur-sm border border-white/30 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500/30 transition-all duration-300 ${
                        searchOpen ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    <button
                      onClick={() => setSearchOpen(!searchOpen)}
                      className="absolute left-3 p-2 text-gray-700 hover:text-rose-700 hover:bg-white/60 rounded-lg transition-all duration-200"
                    >
                      <FiSearch className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {isAuthenticated ? (
                <>
                  {/* User Menu */}
                  <div className="relative" ref={userMenuRef}>
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center space-x-3 px-3 py-2 rounded-xl hover:bg-white/30 transition-all duration-200 group relative"
                    >
                      <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                        <div className="relative w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center ring-2 ring-white/50 group-hover:ring-white/80 transition-all duration-300">
                          <span className="text-white font-semibold text-sm">
                            {user?.name?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <FiChevronDown
                        className={`w-4 h-4 text-gray-700 transition-transform duration-200 ${
                          userMenuOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {userMenuOpen && (
                      <div className="absolute right-0 mt-3 w-80 bg-white/40 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/40 overflow-hidden animate-in fade-in slide-in-from-top-5 duration-200">
                        {/* User Info Header */}
                        <div className="bg-gradient-to-br from-rose-500/10 via-pink-500/10 to-purple-500/10 px-6 py-5 border-b border-white/30">
                          <div className="flex items-center space-x-4">
                            <div className="relative">
                              <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full blur-md opacity-30"></div>
                              <div className="relative w-14 h-14 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center ring-3 ring-white/50 shadow-lg">
                                <span className="text-white font-bold text-xl">
                                  {user?.name?.charAt(0).toUpperCase()}
                                </span>
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-gray-900 truncate">
                                {user?.name}
                              </p>
                              <p className="text-xs text-gray-600 truncate">
                                {user?.email}
                              </p>
                              <div className="mt-2">
                                <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-white/60 text-rose-700 rounded-full shadow-sm border border-white/50 backdrop-blur-sm">
                                  {user?.role?.charAt(0).toUpperCase() +
                                    user?.role?.slice(1)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Menu Items */}
                        <div className="py-2">
                          <a
                            href={getDashboardLink()}
                            className="flex items-center px-5 py-3.5 text-sm text-gray-800 hover:bg-white/50 hover:text-rose-700 transition-all duration-200 group"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <div className="w-10 h-10 bg-white/50 rounded-xl flex items-center justify-center mr-3 group-hover:bg-white/80 transition-all duration-200">
                              <FiHome className="w-4 h-4 text-gray-700 group-hover:text-rose-600" />
                            </div>
                            <div className="flex flex-col">
                              <span className="font-medium">Dashboard</span>
                              <span className="text-xs text-gray-500 mt-0.5">
                                View your progress
                              </span>
                            </div>
                          </a>
                          <a
                            href="/profile"
                            className="flex items-center px-5 py-3.5 text-sm text-gray-800 hover:bg-white/50 hover:text-rose-700 transition-all duration-200 group"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <div className="w-10 h-10 bg-white/50 rounded-xl flex items-center justify-center mr-3 group-hover:bg-white/80 transition-all duration-200">
                              <FiUser className="w-4 h-4 text-gray-700 group-hover:text-rose-600" />
                            </div>
                            <div className="flex flex-col">
                              <span className="font-medium">My Profile</span>
                              <span className="text-xs text-gray-500 mt-0.5">
                                Edit your information
                              </span>
                            </div>
                          </a>
                          <a
                            href="/my-courses"
                            className="flex items-center px-5 py-3.5 text-sm text-gray-800 hover:bg-white/50 hover:text-rose-700 transition-all duration-200 group"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <div className="w-10 h-10 bg-white/50 rounded-xl flex items-center justify-center mr-3 group-hover:bg-white/80 transition-all duration-200">
                              <FiBook className="w-4 h-4 text-gray-700 group-hover:text-rose-600" />
                            </div>
                            <div className="flex flex-col">
                              <span className="font-medium">My Courses</span>
                              <span className="text-xs text-gray-500 mt-0.5">
                                Continue learning
                              </span>
                            </div>
                          </a>
                          <a
                            href="/settings"
                            className="flex items-center px-5 py-3.5 text-sm text-gray-800 hover:bg-white/50 hover:text-rose-700 transition-all duration-200 group"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <div className="w-10 h-10 bg-white/50 rounded-xl flex items-center justify-center mr-3 group-hover:bg-white/80 transition-all duration-200">
                              <FiSettings className="w-4 h-4 text-gray-700 group-hover:text-rose-600" />
                            </div>
                            <div className="flex flex-col">
                              <span className="font-medium">Settings</span>
                              <span className="text-xs text-gray-500 mt-0.5">
                                Preferences & privacy
                              </span>
                            </div>
                          </a>
                        </div>

                        {/* Logout */}
                        <div className="border-t border-white/30 py-2 bg-gradient-to-b from-white/40 to-white/20">
                          <button
                            onClick={() => {
                              setUserMenuOpen(false);
                              handleLogout();
                            }}
                            className="flex items-center w-full px-5 py-3.5 text-sm text-red-600 hover:bg-red-500/10 transition-all duration-200 group"
                          >
                            <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center mr-3 group-hover:bg-red-500/20 transition-all duration-200">
                              <FiLogOut className="w-4 h-4 text-red-600" />
                            </div>
                            <div className="flex flex-col">
                              <span className="font-medium">Logout</span>
                              <span className="text-xs text-red-500/70 mt-0.5">
                                Sign out of your account
                              </span>
                            </div>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-3">
                  <a
                    href="/login"
                    className="px-5 py-2.5 text-gray-800 hover:text-rose-700 font-medium transition-all duration-300 rounded-xl hover:bg-white/30"
                  >
                    Login
                  </a>
                  <a
                    href="/register"
                    className="px-6 py-2.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-rose-500/30 transition-all duration-300 transform hover:scale-105 relative group overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative flex items-center">
                      <HiSparkles className="w-4 h-4 mr-2" />
                      Sign Up
                    </span>
                  </a>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2.5 text-gray-800 hover:text-rose-700 hover:bg-white/30 rounded-xl transition-all duration-300"
            >
              {isOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation - Glassmorphism Panel */}
          <div
            className={`lg:hidden fixed left-4 right-4 z-50 transition-all duration-500 ease-out ${
              isOpen
                ? "top-24 opacity-100 visible"
                : "top-20 opacity-0 invisible"
            }`}
          >
            <div className="glassmorphism-default rounded-2xl shadow-2xl border border-white/40 overflow-hidden animate-in fade-in slide-in-from-top-5 duration-300">
              <div className="flex flex-col p-4">
                <Link
                  href="/"
                  className="px-4 py-3.5 text-gray-800 hover:text-rose-700 hover:bg-white/30 font-medium transition-all duration-300 rounded-xl mb-1"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/courses"
                  className="px-4 py-3.5 text-gray-800 hover:text-rose-700 hover:bg-white/30 font-medium transition-all duration-300 rounded-xl mb-1"
                  onClick={() => setIsOpen(false)}
                >
                  Courses
                </Link>
                <Link
                  href="/about"
                  className="px-4 py-3.5 text-gray-800 hover:text-rose-700 hover:bg-white/30 font-medium transition-all duration-300 rounded-xl mb-1"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="px-4 py-3.5 text-gray-800 hover:text-rose-700 hover:bg-white/30 font-medium transition-all duration-300 rounded-xl mb-4"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>

                {isAuthenticated ? (
                  <>
                    <a
                      href={getDashboardLink()}
                      className="px-4 py-3.5 text-gray-800 hover:text-rose-700 hover:bg-white/30 font-medium transition-all duration-300 rounded-xl mb-4"
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </a>

                    {/* User Info Card */}
                    <div className="mb-4 p-4 bg-gradient-to-br from-rose-500/10 via-pink-500/10 to-purple-500/10 rounded-xl border border-white/30">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="relative">
                          <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full blur-md opacity-30"></div>
                          <div className="relative w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center ring-2 ring-white/50">
                            <span className="text-white font-bold">
                              {user?.name?.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {user?.name}
                          </p>
                          <p className="text-xs text-gray-600 truncate">
                            {user?.email}
                          </p>
                        </div>
                      </div>
                      <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-white/60 text-rose-700 rounded-full shadow-sm border border-white/50">
                        {user?.role?.charAt(0).toUpperCase() +
                          user?.role?.slice(1)}
                      </span>

                      <div className="mt-4 pt-4 border-t border-white/30 flex space-x-2">
                        <a
                          href="/profile"
                          className="flex-1 px-3 py-2.5 bg-white/40 text-gray-800 text-sm font-medium rounded-lg hover:bg-white/60 transition-all duration-300 text-center"
                          onClick={() => setIsOpen(false)}
                        >
                          Profile
                        </a>
                        <button
                          onClick={() => {
                            setIsOpen(false);
                            handleLogout();
                          }}
                          className="flex-1 px-3 py-2.5 bg-red-500/10 text-red-600 text-sm font-medium rounded-lg hover:bg-red-500/20 transition-all duration-300"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col space-y-3">
                    <Link
                      href="/login"
                      className="px-4 py-3.5 text-center text-gray-800 hover:text-rose-700 font-medium border border-white/40 rounded-xl hover:bg-white/30 transition-all duration-300"
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="px-4 py-3.5 text-center bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-rose-500/30 transition-all duration-300"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Add these styles to your global CSS or Tailwind config */}
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default Navbar;
