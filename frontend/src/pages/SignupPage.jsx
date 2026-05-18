import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Sparkles, ShieldCheck, User, Phone, Briefcase, ArrowLeft } from "lucide-react";

export default function SignupPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    mobile_number: "",
    role: "",
  });

  const roles = [
    {
      value: "social_media_executive",
      label: "Social Media Executive",
    },
    {
      value: "performance_marketer",
      label: "Performance Marketer",
    },
    {
      value: "content_head",
      label: "Content Head",
    },
    {
      value: "script_writer",
      label: "Script Writer",
    },
    {
      value: "copy_writer",
      label: "Copy Writer",
    },
    {
      value: "creator",
      label: "Creator",
    },
    {
      value: "video_editor",
      label: "Video Editor",
    },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGoogleSignup = async (credentialResponse) => {
    if (!formData.name.trim()) {
      alert("Please enter your full name first.");
      return;
    }

    if (!formData.role) {
      alert("Please select a professional role first.");
      return;
    }

    if (!formData.mobile_number) {
      alert("Please enter your mobile number first.");
      return;
    }

    if (!/^\d+$/.test(formData.mobile_number)) {
      alert("Mobile number must contain only digits.");
      return;
    }

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/auth/google/",
        {
          token: credentialResponse.credential,
          role: formData.role,
          mobile_number: formData.mobile_number,
        }
      );

      console.log(res.data);
      alert("Signup successful! Waiting for manager approval.");
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Signup failed"
      );
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-slate-50">
      {/* Left Screen - Premium Brand Experience & Visual Narrative */}
      <div className="hidden lg:flex lg:w-7/12 bg-slate-950 text-white p-12 flex-col justify-between relative overflow-hidden">
        {/* Decorative Glowing Gradients */}
        <div className="absolute top-[-20%] right-[-10%] w-[80%] h-[60%] rounded-full bg-gradient-to-br from-purple-600/30 to-indigo-600/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[50%] rounded-full bg-gradient-to-tr from-emerald-600/20 to-purple-600/20 blur-[80px] pointer-events-none" />

        {/* Brand Header */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="bg-gradient-to-tr from-purple-600 to-indigo-600 p-2.5 rounded-2xl shadow-lg shadow-purple-500/20 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              Catalyst
            </span>
            <span className="block text-[10px] uppercase tracking-widest text-purple-400 font-bold">
              Marketing Operations
            </span>
          </div>
        </div>

        {/* Central Visual Showcase */}
        <div className="my-auto relative z-10 max-w-xl">
          <h1 className="text-5xl font-extrabold tracking-tight leading-[1.1] text-white">
            Join the Catalyst{" "}
            <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">
              Growth Engine
            </span>
          </h1>
          <p className="text-slate-400 mt-6 text-base leading-relaxed">
            Collaborate with high-performance content strategists, visual artists, copywriters, and search advertisers. Get access to task pipelines, centralized assets, and calendars.
          </p>

          {/* Interactive Feature List */}
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3 text-sm text-slate-350 bg-white/5 border border-white/15 p-3.5 rounded-2xl backdrop-blur-sm">
              <span className="bg-purple-500/20 text-purple-400 p-1.5 rounded-xl font-bold">1</span>
              <span>Select your professional role specialization.</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-350 bg-white/5 border border-white/15 p-3.5 rounded-2xl backdrop-blur-sm">
              <span className="bg-indigo-500/20 text-indigo-400 p-1.5 rounded-xl font-bold">2</span>
              <span>Authenticate securely via corporate Google account.</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-350 bg-white/5 border border-white/15 p-3.5 rounded-2xl backdrop-blur-sm">
              <span className="bg-emerald-500/20 text-emerald-400 p-1.5 rounded-xl font-bold">3</span>
              <span>Await instant manager dashboard activation approval.</span>
            </div>
          </div>
        </div>

        {/* Footer Meta */}
        <div className="flex items-center gap-6 text-xs text-slate-500 relative z-10">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-purple-500" /> Organizational Onboarding
          </span>
          <span>•</span>
          <span>Secure Sign-up</span>
        </div>
      </div>

      {/* Right Screen - Visual Form Portal */}
      <div className="w-full lg:w-5/12 flex items-center justify-center px-6 py-12 md:p-16 bg-white overflow-y-auto">
        <div className="w-full max-w-md my-auto">
          {/* Mobile Brand Header */}
          <div className="flex lg:hidden items-center justify-center gap-2 mb-8">
            <div className="bg-gradient-to-tr from-purple-600 to-indigo-600 p-2 rounded-xl text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl text-slate-900 tracking-tight">Catalyst</span>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Create Account
            </h2>
            <p className="text-slate-500 mt-2 text-sm">
              Register your professional workspace profiles using corporate Google credentials.
            </p>
          </div>

          {/* Form Fields container */}
          <div className="space-y-5">
            {/* Full Name input */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-2">
                <User size={13} className="text-purple-500" /> Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 text-sm outline-none transition duration-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10 placeholder-slate-400"
              />
            </div>

            {/* Mobile Number input */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-2">
                <Phone size={13} className="text-purple-500" /> Mobile Number
              </label>
              <input
                type="tel"
                name="mobile_number"
                value={formData.mobile_number}
                onChange={handleChange}
                placeholder="Enter your mobile number"
                className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 text-sm outline-none transition duration-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10 placeholder-slate-400"
              />
            </div>

            {/* Select Role selection */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-2">
                <Briefcase size={13} className="text-purple-500" /> Professional Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 text-sm outline-none transition duration-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10 bg-white"
              >
                <option value="">Choose your specialization</option>
                {roles.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Google Signup trigger */}
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-5 mt-6 shadow-sm flex flex-col items-center gap-4">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Complete with Google SSO</p>
              
              <div className="w-full flex justify-center py-1 transition-transform duration-200 hover:scale-[1.02]">
                <GoogleLogin
                  onSuccess={handleGoogleSignup}
                  onError={() => console.log("Google Signup Failed")}
                  text="signup_with"
                  theme="filled_blue"
                  size="large"
                  shape="pill"
                  width="320px"
                />
              </div>
            </div>
          </div>

          {/* Switch View Trigger */}
          <div className="mt-8 text-center text-sm text-slate-500 border-t pt-6 border-slate-100 flex items-center justify-center gap-2">
            <Link
              to="/login"
              className="font-bold text-slate-700 hover:text-purple-600 transition-colors inline-flex items-center gap-1.5 hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}