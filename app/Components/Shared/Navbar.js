"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth, useAuthActions } from "@/app/hooks/useRedux";
import { toast } from "react-toastify";
import { FiMenu, FiX, FiUser, FiLogOut, FiHome, FiBook } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const router = useRouter();

  const { user, isAuthenticated } = useAuth();
  const { logout, getMe } = useAuthActions();

  useEffect(() => {
    if (!user && isAuthenticated) {
      getMe();
    }
  }, [user, isAuthenticated, getMe]);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error) {
      toast.error(error.message || "Logout failed");
    }
  };

  const getDashboardLink = () => {
    if (!user) return "/login";
    if (user.role === "admin") return "/admin/dashboard";
    if (user.role === "instructor") return "/instructor/dashboard";
    return "/student/dashboard";
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <FiBook className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-primary-600">
                CourseMaster
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/courses"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              Courses
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  href={getDashboardLink()}
                  className="text-gray-700 hover:text-primary-600 transition-colors"
                >
                  Dashboard
                </Link>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <FiUser className="w-4 h-4 text-primary-600" />
                    </div>
                    <span>{user?.name}</span>
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                      <div className="px-4 py-2 border-b">
                        <p className="text-sm font-medium">{user?.name}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                        <span className="inline-block mt-1 px-2 py-1 text-xs bg-primary-100 text-primary-800 rounded-full">
                          {user?.role}
                        </span>
                      </div>
                      <Link
                        href={getDashboardLink()}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <FiHome className="w-4 h-4 mr-2" />
                        Dashboard
                      </Link>
                      <Link
                        href="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <FiUser className="w-4 h-4 mr-2" />
                        Profile
                      </Link>
                      <button
                        onClick={() => {
                          setUserMenuOpen(false);
                          handleLogout();
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        <FiLogOut className="w-4 h-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-primary-600 transition-colors"
                >
                  Login
                </Link>
                <Link href="/register" className="btn-primary">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 hover:text-primary-600"
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
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-primary-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/courses"
                className="text-gray-700 hover:text-primary-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Courses
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    href={getDashboardLink()}
                    className="text-gray-700 hover:text-primary-600 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <div className="pt-4 border-t">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                    <div className="flex space-x-2 mt-2">
                      <button
                        onClick={handleLogout}
                        className="text-sm text-red-600 hover:text-red-800"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link
                    href="/login"
                    className="text-gray-700 hover:text-primary-600 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="btn-primary text-center"
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
