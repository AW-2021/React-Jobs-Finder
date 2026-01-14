import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import loginBg from "../assets/images/login-bg.jpg";
import logo from "../assets/images/logo.png";
import { useAuth } from "../context/AuthContext";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signInUser } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear previous errors

    try {
      const result = await signInUser(email, password);

      if (result?.success) {
        navigate("/home");
      } else {
        setError(result?.error || "An error occurred");
      }
    } catch (err: any) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-6 py-12 lg:px-12">
        <div className="w-full max-w-[480px]">
          {/* Logo */}
          <div className="mb-8">
            <img src={logo} alt="Logo" className="w-16 border-2 border-indigo-700 rounded-full aspect-square" />
          </div>

          {/* Heading */}
          <h1 className="text-[2rem] font-bold text-[#111827] leading-[1.2] tracking-[-0.02em] mb-4">
            Welcome back !
          </h1>

          {/* Subheading */}
          <p className="text-[0.875rem] font-normal text-[#6B7280] leading-normal mb-8">
            Enter to get unlimited access to job information.
          </p>

          {/* Login Form */}
          <form onSubmit={handleSignIn} className="space-y-5">
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-[0.875rem] font-medium text-[#374151] mb-2"
              >
                Email <span className="text-[#EF4444]">*</span>
              </label>
              <input
                type="email"
                id="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 px-4 text-[0.875rem] border border-[#E5E7EB] rounded-lg bg-white placeholder:text-[#9CA3AF] placeholder:opacity-60 focus:border-[#6366F1] focus:outline-none focus:ring-[3px] focus:ring-[#6366F1]/5 transition-all duration-200"
              />
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-[0.875rem] font-medium text-[#374151] mb-2"
              >
                Password <span className="text-[#EF4444]">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 px-4 pr-12 text-[0.875rem] border border-[#E5E7EB] rounded-lg bg-white placeholder:text-[#9CA3AF] placeholder:opacity-60 focus:border-[#6366F1] focus:outline-none focus:ring-[3px] focus:ring-[#6366F1]/5 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#374151] transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <FaEyeSlash className="w-5 h-5" />
                  ) : (
                    <FaEye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            
            {/* Login Button */}
            <button
              type="submit"
              className="w-full h-12 px-6 mt-6 bg-[#6366F1] text-white text-[0.875rem] font-semibold rounded-lg border-none shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] hover:bg-[#4F46E5] hover:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] active:bg-[#4338CA] active:scale-[0.98] transition-all duration-200"
            >
              Sign In
            </button>

            {error && (
              <p className="text-red-600 text-center text-sm">{error}</p>
            )}

            {/* Registration Prompt */}
            <p className="text-center text-[0.875rem] text-[#6B7280] mt-4">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-[#6366F1] hover:text-[#4F46E5] hover:underline transition-colors"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right Panel - Decorative Background Image */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <img
          src={loginBg}
          alt="Decorative geometric pattern"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default SignInPage;
