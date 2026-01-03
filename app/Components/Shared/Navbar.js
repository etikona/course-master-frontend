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
} from "react-icons/fi";

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
  const userMenuRef = useRef(null);

  const { user, isAuthenticated } = useAuth();
  const { logout, getMe } = useAuthActions();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-rose-100"
          : "bg-white shadow-md"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-11 h-11 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <FiBook className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-400 rounded-full animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                CourseMaster
              </span>
              <span className="text-xs text-gray-500 -mt-1">Learn & Grow</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link
              href="/"
              className="px-4 py-2 text-gray-700 hover:text-rose-600 font-medium transition-colors rounded-lg hover:bg-rose-50"
            >
              Home
            </Link>
            <a
              href="/courses"
              className="px-4 py-2 text-gray-700 hover:text-rose-600 font-medium transition-colors rounded-lg hover:bg-rose-50"
            >
              Courses
            </a>
            <a
              href="/about"
              className="px-4 py-2 text-gray-700 hover:text-rose-600 font-medium transition-colors rounded-lg hover:bg-rose-50"
            >
              About
            </a>
            <a
              href="/contact"
              className="px-4 py-2 text-gray-700 hover:text-rose-600 font-medium transition-colors rounded-lg hover:bg-rose-50"
            >
              Contact
            </a>
          </div>

          {/* Right Section */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Search */}
            <button className="p-2.5 text-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all duration-200">
              <FiSearch className="w-5 h-5" />
            </button>

            {isAuthenticated ? (
              <>
                {/* Cart */}
                <button className="relative p-2.5 text-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all duration-200">
                  <FiShoppingCart className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
                </button>

                {/* Dashboard Link */}
                <a
                  href={getDashboardLink()}
                  className="px-4 py-2 text-gray-700 hover:text-rose-600 font-medium transition-colors rounded-lg hover:bg-rose-50"
                >
                  Dashboard
                </a>

                {/* User Menu */}
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-rose-50 transition-all duration-200 group"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center ring-2 ring-rose-100 group-hover:ring-rose-200 transition-all">
                      <span className="text-white font-semibold text-sm">
                        {user?.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <FiChevronDown
                      className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
                        userMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                      {/* User Info Header */}
                      <div className="bg-gradient-to-br from-rose-50 to-pink-50 px-5 py-4 border-b border-rose-100">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center ring-2 ring-white shadow-lg">
                            <span className="text-white font-bold text-lg">
                              {user?.name?.charAt(0).toUpperCase()}
                            </span>
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
                        <div className="mt-3">
                          <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-white text-rose-700 rounded-full shadow-sm border border-rose-200">
                            {user?.role?.charAt(0).toUpperCase() +
                              user?.role?.slice(1)}
                          </span>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        <a
                          href={getDashboardLink()}
                          className="flex items-center px-5 py-3 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition-colors group"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-rose-100 transition-colors">
                            <FiHome className="w-4 h-4 text-gray-600 group-hover:text-rose-600" />
                          </div>
                          <span className="font-medium">Dashboard</span>
                        </a>
                        <a
                          href="/profile"
                          className="flex items-center px-5 py-3 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition-colors group"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-rose-100 transition-colors">
                            <FiUser className="w-4 h-4 text-gray-600 group-hover:text-rose-600" />
                          </div>
                          <span className="font-medium">My Profile</span>
                        </a>
                        <a
                          href="/my-courses"
                          className="flex items-center px-5 py-3 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition-colors group"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-rose-100 transition-colors">
                            <FiBook className="w-4 h-4 text-gray-600 group-hover:text-rose-600" />
                          </div>
                          <span className="font-medium">My Courses</span>
                        </a>
                      </div>

                      {/* Logout */}
                      <div className="border-t border-gray-100 py-2">
                        <button
                          onClick={() => {
                            setUserMenuOpen(false);
                            handleLogout();
                          }}
                          className="flex items-center w-full px-5 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors group"
                        >
                          <div className="w-9 h-9 bg-red-50 rounded-lg flex items-center justify-center mr-3 group-hover:bg-red-100 transition-colors">
                            <FiLogOut className="w-4 h-4 text-red-600" />
                          </div>
                          <span className="font-medium">Logout</span>
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
                  className="px-5 py-2.5 text-gray-700 hover:text-rose-600 font-medium transition-colors rounded-lg hover:bg-rose-50"
                >
                  Login
                </a>
                <a
                  href="/register"
                  className="px-6 py-2.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:from-rose-600 hover:to-pink-700 transition-all duration-200 transform hover:scale-105"
                >
                  Sign Up
                </a>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
          >
            {isOpen ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden pb-6 border-t border-gray-100 animate-in slide-in-from-top duration-200">
            <div className="flex flex-col space-y-1 mt-4">
              <Link
                href="/"
                className="px-4 py-3 text-gray-700 hover:text-rose-600 hover:bg-rose-50 font-medium transition-colors rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/courses"
                className="px-4 py-3 text-gray-700 hover:text-rose-600 hover:bg-rose-50 font-medium transition-colors rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                Courses
              </Link>
              <a
                href="/about"
                className="px-4 py-3 text-gray-700 hover:text-rose-600 hover:bg-rose-50 font-medium transition-colors rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                About
              </a>
              <a
                href="/contact"
                className="px-4 py-3 text-gray-700 hover:text-rose-600 hover:bg-rose-50 font-medium transition-colors rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </a>

              {isAuthenticated ? (
                <>
                  <a
                    href={getDashboardLink()}
                    className="px-4 py-3 text-gray-700 hover:text-rose-600 hover:bg-rose-50 font-medium transition-colors rounded-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </a>

                  {/* User Info Card */}
                  <div className="mt-4 mx-4 p-4 bg-linear-to-br from-rose-50 to-pink-50 rounded-xl border border-rose-100">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 bg-linear-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold">
                          {user?.name?.charAt(0).toUpperCase()}
                        </span>
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
                    <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-white text-rose-700 rounded-full shadow-sm border border-rose-200">
                      {user?.role?.charAt(0).toUpperCase() +
                        user?.role?.slice(1)}
                    </span>

                    <div className="mt-4 pt-4 border-t border-rose-200 flex space-x-2">
                      <a
                        href="/profile"
                        className="flex-1 px-3 py-2 bg-white text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors text-center"
                        onClick={() => setIsOpen(false)}
                      >
                        Profile
                      </a>
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          handleLogout();
                        }}
                        className="flex-1 px-3 py-2 bg-red-50 text-red-600 text-sm font-medium rounded-lg hover:bg-red-100 transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col space-y-2 mt-4 mx-4">
                  <Link
                    href="/login"
                    className="px-4 py-3 text-center text-gray-700 hover:text-rose-600 font-medium border border-gray-300 rounded-lg hover:border-rose-300 hover:bg-rose-50 transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="px-4 py-3 text-center bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:from-rose-600 hover:to-pink-700 transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
