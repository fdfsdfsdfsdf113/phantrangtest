"use client"; // Next.js directive for client-side rendering

import React, { useState, useEffect, useRef } from "react"; // React core and hooks
import { motion, AnimatePresence } from "framer-motion"; // Animation library
import {
  Eye,
  EyeOff,
  Github,
  Twitter,
  Mail,
  Lock,
  User,
  Cherry,
  ShieldUser,
} from "lucide-react"; // Icon set
import { cn } from "@/lib/utils"; // Utility for merging class names
import { adminApi } from "@/apis/admin.api"; // API calls for admin
import { useNavigate } from "react-router-dom"; // Navigation hook

// Animated Gradient Background Component
interface AnimatedGradientBackgroundProps {
  startingGap?: number; // Initial gradient size
  Breathing?: boolean; // Enable/disable breathing animation
  gradientColors?: string[]; // Colors for gradient stops
  gradientStops?: number[]; // Positions for gradient stops
  animationSpeed?: number; // Speed of breathing animation
  breathingRange?: number; // Range of breathing effect
  containerStyle?: React.CSSProperties; // Custom styles
  containerClassName?: string; // Custom class names
  topOffset?: number; // Offset for gradient
}

const AnimatedGradientBackground: React.FC<AnimatedGradientBackgroundProps> = ({
  startingGap = 125, // Default gradient size
  Breathing = true, // Breathing enabled by default
  gradientColors = [
    "#ffb6c1", // light pink
    "#ffcba4", // peach
    "#fffacd", // light yellow
    "#e0ffff", // light cyan
    "#e6e6fa", // lavender
    "#f5f5f5", // white smoke
    "#ffffff", //
  ],
  gradientStops = [35, 50, 60, 70, 80, 90, 100], // Default stops
  animationSpeed = 0.02, // Default speed
  breathingRange = 5, // Default range
  containerStyle = {}, // No extra style by default
  topOffset = 0, // No offset by default
  containerClassName = "", // No extra class by default
}) => {
  if (gradientColors.length !== gradientStops.length) {
    throw new Error(
      `GradientColors and GradientStops must have the same length.
   Received gradientColors length: ${gradientColors.length},
   gradientStops length: ${gradientStops.length}`
    ); // Ensure color and stop arrays match
  }

  const containerRef = useRef<HTMLDivElement | null>(null); // Ref for background div

  useEffect(() => {
    let animationFrame: number; // Animation frame id
    let width = startingGap; // Current gradient width
    let directionWidth = 1; // Direction of breathing

    const animateGradient = () => {
      if (width >= startingGap + breathingRange) directionWidth = -1; // Reverse at max
      if (width <= startingGap - breathingRange) directionWidth = 1; // Reverse at min

      if (!Breathing) directionWidth = 0; // Stop breathing if disabled
      width += directionWidth * animationSpeed; // Update width

      const gradientStopsString = gradientStops
        .map((stop, index) => `${gradientColors[index]} ${stop}%`)
        .join(", "); // Build gradient stops string

      const gradient = `radial-gradient(${width}% ${
        width + topOffset
      }% at 50% 20%, ${gradientStopsString})`; // CSS gradient

      if (containerRef.current) {
        containerRef.current.style.background = gradient; // Apply gradient
      }

      animationFrame = requestAnimationFrame(animateGradient); // Loop animation
    };

    animationFrame = requestAnimationFrame(animateGradient); // Start animation

    return () => cancelAnimationFrame(animationFrame); // Cleanup on unmount
  }, [
    startingGap,
    Breathing,
    gradientColors,
    gradientStops,
    animationSpeed,
    breathingRange,
    topOffset,
  ]);

  return (
    <motion.div
      key="animated-gradient-background"
      initial={{
        opacity: 0,
        scale: 1.5,
      }} // Start faded and scaled up
      animate={{
        opacity: 1,
        scale: 1,
        transition: {
          duration: 2,
          ease: [0.25, 0.1, 0.25, 1],
        },
      }} // Animate to visible and normal scale
      className={`absolute inset-0 overflow-hidden ${containerClassName}`}
    >
      <div
        ref={containerRef}
        style={containerStyle}
        className="absolute inset-0 transition-transform"
      />
    </motion.div>
  );
};

// Floating Sakura Petals Component
const FloatingSakuraPetals: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null); // Ref for canvas

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }; // Make canvas full screen

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize); // Responsive resize

    class SakuraPetal {
      x: number; // X position
      y: number; // Y position
      size: number; // Petal size
      speedX: number; // Horizontal speed
      speedY: number; // Vertical speed
      opacity: number; // Opacity
      rotation: number; // Rotation angle
      rotationSpeed: number; // Rotation speed

      constructor() {
        this.x = Math.random() * canvas.width; // Random X
        this.y = -10; // Start above screen
        this.size = Math.random() * 8 + 4; // Random size
        this.speedX = (Math.random() - 0.5) * 2; // Random X speed
        this.speedY = Math.random() * 2 + 1; // Random Y speed
        this.opacity = Math.random() * 0.6 + 0.2; // Random opacity
        this.rotation = Math.random() * Math.PI * 2; // Random rotation
        this.rotationSpeed = (Math.random() - 0.5) * 0.1; // Random rotation speed
      }

      update() {
        this.x += this.speedX; // Move horizontally
        this.y += this.speedY; // Move vertically
        this.rotation += this.rotationSpeed; // Rotate

        if (this.y > canvas.height) {
          this.y = -10; // Reset to top if off bottom
          this.x = Math.random() * canvas.width; // Random X
        }
        if (this.x > canvas.width) this.x = 0; // Wrap right edge
        if (this.x < 0) this.x = canvas.width; // Wrap left edge
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y); // Move to petal position
        ctx.rotate(this.rotation); // Rotate petal
        ctx.globalAlpha = this.opacity; // Set opacity

        // Draw sakura petal shape (main color)
        ctx.fillStyle = "#FFB7C5";
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size, this.size * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();

        // Draw inner ellipse (darker color)
        ctx.fillStyle = "#FF69B4";
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size * 0.7, this.size * 0.4, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
    }

    const petals: SakuraPetal[] = [];
    const petalCount = 30; // Number of petals

    for (let i = 0; i < petalCount; i++) {
      petals.push(new SakuraPetal()); // Create petals
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

      petals.forEach((petal) => {
        petal.update(); // Move petal
        petal.draw(); // Draw petal
      });

      requestAnimationFrame(animate); // Loop animation
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize); // Cleanup
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

// Shining Text Component
interface ShiningTextProps {
  text: string; // Text to display
  className?: string; // Optional class
}

const ShiningText: React.FC<ShiningTextProps> = ({ text, className }) => {
  return (
    <motion.h1
      className={cn(
        "bg-[linear-gradient(110deg,#404040,35%,#fff,50%,#404040,75%,#404040)] bg-[length:200%_100%] bg-clip-text text-base font-regular text-transparent",
        className
      )} // Gradient text effect
      initial={{ backgroundPosition: "200% 0" }} // Start position
      animate={{ backgroundPosition: "-200% 0" }} // Animate shine
      transition={{
        repeat: Infinity,
        duration: 2,
        ease: "linear",
      }}
    >
      {text}
    </motion.h1>
  );
};

// Animated Form Field Component
interface FormFieldProps {
  type: string; // Input type
  placeholder: string; // Placeholder label
  value: string; // Input value
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Change handler
  icon: React.ReactNode; // Icon to display
  showToggle?: boolean; // Show password toggle
  onToggle?: () => void; // Toggle handler
  showPassword?: boolean; // Password visible
}

const AnimatedFormField: React.FC<FormFieldProps> = ({
  type,
  placeholder,
  value,
  onChange,
  icon,
  showToggle,
  onToggle,
  showPassword,
}) => {
  const [isFocused, setIsFocused] = useState(false); // Focus state
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 }); // Mouse for hover effect
  const [isHovering, setIsHovering] = useState(false); // Hover state

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }); // Track mouse for radial highlight
  };

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="relative overflow-hidden rounded-lg border border-pink-200/30 bg-white/10 backdrop-blur-sm transition-all duration-300 ease-in-out hover:border-pink-300/50"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-300 transition-colors duration-200 group-focus-within:text-pink-400">
          {icon}
        </div>

        <input
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full bg-transparent pl-10 pr-12 py-3 text-gray-900 font-medium placeholder:text-gray-500 focus:outline-none"
          placeholder=""
        />

        <label
          className={`absolute left-10 transition-all duration-200 ease-in-out pointer-events-none ${
            isFocused || value
              ? "top-[-50px] text-xs text-gray-800 font-semibold"
              : "top-1/2 -translate-y-1/2 text-sm text-gray-500"
          }`}
        >
          {placeholder}
        </label>

        {showToggle && (
          <button
            type="button"
            onClick={onToggle}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-pink-300 hover:text-pink-400 transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}

        {isHovering && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(200px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 182, 193, 0.2) 0%, transparent 70%)`,
            }}
          />
        )}
      </div>
    </motion.div>
  );
};

// Social Button Component
interface SocialButtonProps {
  icon: React.ReactNode; // Icon to display
  name: string; // Social name
}

const SocialButton: React.FC<SocialButtonProps> = ({ icon, name }) => {
  const [isHovered, setIsHovered] = useState(false); // Hover state

  return (
    <motion.button
      className="relative group p-3 rounded-lg border border-pink-200/30 bg-white/10 backdrop-blur-sm hover:bg-pink-100/20 transition-all duration-300 ease-in-out overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 transition-transform duration-500 ${
          isHovered ? "translate-x-0" : "-translate-x-full"
        }`}
      />
      <div className="relative text-pink-300 group-hover:text-pink-400 transition-colors">
        {icon}
      </div>
    </motion.button>
  );
};

// Main Login Component
const AnimeJapanLoginForm: React.FC = () => {
  const [email, setEmail] = useState(""); // Email state
  const [password, setPassword] = useState(""); // Password state
  const [name, setName] = useState(""); // Name state (sign up)
  const [showPassword, setShowPassword] = useState(false); // Password visibility
  const [isSignUp, setIsSignUp] = useState(false); // Sign up mode
  const [isSubmitting, setIsSubmitting] = useState(false); // Submission state
  const [rememberMe, setRememberMe] = useState(false); // Remember me checkbox
  const [role, setRole] = useState("Staff"); // User role (default to Staff)

  const navigate1 = useNavigate(); // Navigation hook

  // Handle form submit for login/signup
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (isSignUp) {
        await adminApi.registerAdmin({ username: name, email, password, role }); // Register API
        alert("Đăng ký thành công! Mời bạn đăng nhập."); // Success message
        setIsSignUp(false); // Switch to login
      } else {
        const res = await adminApi.loginAdmin({ email, password }); // Login API
        localStorage.setItem("accessToken", res.accessToken); // Store token
        alert("Đăng nhập thành công!"); // Success message
        console.log("Login payload:", { email, password });

        navigate1("/"); // Redirect to home
      }
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || "Đã có lỗi xảy ra!"); // Error message
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  // Toggle between login and signup
  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setEmail("");
    setPassword("");
    setName("");
    setShowPassword(false);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <AnimatedGradientBackground /> {/* Animated background */}
      <FloatingSakuraPetals /> {/* Sakura petals animation */}
      <div className="absolute inset-0 flex items-center justify-center z-10 p-4">
        <motion.div
          className="relative z-10 w-full max-w-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="bg-white/20 backdrop-blur-2xl backdrop-brightness-125 border border-white/30 rounded-2xl p-8 shadow-2xl">
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-200/30 rounded-full mb-4">
                <Cherry className="w-8 h-8 text-pink-400" /> {/* Logo icon */}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {isSignUp ? "アカウント作成" : "おかえりなさい"} {/* Title */}
              </h1>
              <ShiningText
                text={
                  isSignUp ? "Sign up to get started" : "Sign in to continue"
                }
                className="text-gray-600"
              />
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatePresence mode="wait">
                {isSignUp && (
                  <motion.div
                    key="name-field"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <AnimatedFormField
                      type="text"
                      placeholder="(Full Name)"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      icon={<User size={18} />}
                    />
                  </motion.div>
                )}

                {isSignUp && (
                  <motion.div
                    key="role-field"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative group">
                      <div className="relative overflow-hidden rounded-lg border border-pink-200/30 bg-white/10 backdrop-blur-sm transition-all duration-300 ease-in-out hover:border-pink-300/50">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-300 transition-colors duration-200 group-focus-within:text-pink-400">
                          <ShieldUser size={18} />
                        </div>

                        <select
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          className="w-full bg-transparent text-gray-900 font-medium py-3 pl-10 pr-4 appearance-none focus:outline-none"
                        >
                          <option value="Staff" className="text-black">
                            Staff
                          </option>
                          <option value="Admin" className="text-black">
                            Admin
                          </option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatedFormField
                type="email"
                placeholder="(Email)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail size={18} />}
              />

              <AnimatedFormField
                type={showPassword ? "text" : "password"}
                placeholder="(Password)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock size={18} />}
                showToggle
                onToggle={() => setShowPassword(!showPassword)}
                showPassword={showPassword}
              />

              <motion.div
                className="flex items-center justify-between"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-pink-500 bg-white/20 border-pink-300 rounded focus:ring-pink-500 focus:outline-none"
                  />
                  <span className="text-sm text-gray-500">
                    Duy trì đăng nhập {/* Remember me label */}
                  </span>
                </label>

                {!isSignUp && (
                  <button
                    type="button"
                    className="text-sm text-pink-500 hover:text-pink-600 transition-colors"
                  >
                    👉 Quên mật khẩu? {/* Forgot password */}
                  </button>
                )}
              </motion.div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full relative group bg-gradient-to-r from-pink-400 to-purple-400 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 ease-in-out hover:from-pink-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <span
                  className={`transition-opacity duration-200 ${
                    isSubmitting ? "opacity-0" : "opacity-100"
                  }`}
                >
                  {isSignUp ? "Tạo tài khoản" : "Đăng nhập"} {/* Button text */}
                </span>

                {isSubmitting && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
              </motion.button>
            </form>

            <motion.div
              className="mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-pink-200/30" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-transparent text-gray-500">
                    Or {/* Divider */}
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <SocialButton icon={<Github size={20} />} name="GitHub" />
                <SocialButton icon={<Twitter size={20} />} name="Twitter" />
                <SocialButton icon={<Mail size={20} />} name="Google" />
              </div>
            </motion.div>

            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <p className="text-sm text-gray-600">
                {isSignUp
                  ? "Bạn đã có tài khoản?  "
                  : "Nếu bạn chưa có tài khoản？"}{" "}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="text-pink-500 hover:text-pink-600 font-medium transition-colors"
                >
                  {isSignUp ? "Log In" : "Sign Up"} {/* Switch mode */}
                </button>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AnimeJapanLoginForm; // Export main component
