import { useState, useEffect } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import { Sparkles, ArrowRight, User, Phone, Briefcase, ArrowLeft } from 'lucide-react'
import logo from '../assets/catalyst_logo.png'
import { useAuth } from '../context/AuthContext'

export default function AuthPage() {
    const navigate = useNavigate()
    const location = useLocation()
    const { login, user, loading: authLoading } = useAuth() || {}

    useEffect(() => {
        if (!authLoading && user) {
            navigate('/dashboard', { replace: true })
        }
    }, [user, authLoading, navigate])
    
    // Determine initial view based on path
    const [isLoginView, setIsLoginView] = useState(location.pathname !== '/signup')

    // --- Login State & Logic ---
    const [loginErrorMsg, setLoginErrorMsg] = useState("")
    const [loginInfoMsg, setLoginInfoMsg] = useState("")
    const [loading, setLoading] = useState(false)

    // --- Dev Login State & Logic ---
    const [devUsername, setDevUsername] = useState("")
    const [devPassword, setDevPassword] = useState("")
    const [devLoading, setDevLoading] = useState(false)
    const [devError, setDevError] = useState("")
    const [showDevLogin, setShowDevLogin] = useState(false)

    const handleDevLogin = async (e) => {
        e.preventDefault()
        setDevError("")
        setDevLoading(true)
        try {
            const res = await axios.post(
                'http://127.0.0.1:8000/api/auth/dev-login/',
                { username: devUsername, password: devPassword }
            )
            if (login) {
                login(res.data.user, res.data.access, res.data.refresh)
            } else {
                localStorage.setItem('access', res.data.access)
                localStorage.setItem('refresh', res.data.refresh)
                localStorage.setItem('user', JSON.stringify(res.data.user))
                navigate('/dashboard')
            }
        } catch (error) {
            setDevError(
                error.response?.data?.error ||
                error.response?.data?.message ||
                "Login failed. Check credentials or backend."
            )
        } finally {
            setDevLoading(false)
        }
    }

    const handleLoginSuccess = async (credentialResponse) => {
        setLoginErrorMsg("")
        setLoginInfoMsg("")
        setLoading(true)

        try {
            const res = await axios.post(
                'http://127.0.0.1:8000/api/auth/google/',
                {
                    token: credentialResponse.credential
                }
            )

            if (login) {
                login(res.data.user, res.data.access, res.data.refresh)
            } else {
                localStorage.setItem('access', res.data.access)
                localStorage.setItem('refresh', res.data.refresh)
                localStorage.setItem('user', JSON.stringify(res.data.user))
                navigate('/dashboard')
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
            if (error.response) {
                if (error.response.status === 403) {
                    setLoginInfoMsg(error.response.data.message || "Waiting for manager approval")
                } else {
                    setLoginErrorMsg(error.response.data.error || error.response.data.message || "Login failed")
                }
            } else {
                setLoginErrorMsg("Network error. Please make sure the backend is running.")
            }
        }
    }

    // --- Signup State & Logic ---
    const [formData, setFormData] = useState({
        name: "",
        mobile_number: "",
        role: "",
    })

    const roles = [
        { value: "social_media_executive", label: "Social Media Executive" },
        { value: "performance_marketer", label: "Performance Marketer" },
        { value: "content_head", label: "Content Head" },
        { value: "script_writer", label: "Script Writer" },
        { value: "copy_writer", label: "Copy Writer" },
        { value: "creator", label: "Creator" },
        { value: "video_editor", label: "Video Editor" },
    ]

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleGoogleSignup = async (credentialResponse) => {
        if (!formData.name.trim()) {
            alert("Please enter your full name first.")
            return
        }
        if (!formData.role) {
            alert("Please select a professional role first.")
            return
        }
        if (!formData.mobile_number) {
            alert("Please enter your mobile number first.")
            return
        }
        if (!/^\d+$/.test(formData.mobile_number)) {
            alert("Mobile number must contain only digits.")
            return
        }

        try {
            const res = await axios.post(
                "http://127.0.0.1:8000/api/auth/google/",
                {
                    token: credentialResponse.credential,
                    role: formData.role,
                    mobile_number: formData.mobile_number,
                }
            )

            console.log(res.data)
            alert("Signup successful! Waiting for manager approval.")
            setIsLoginView(true)
            navigate("/login", { replace: true })
        } catch (error) {
            console.log(error)
            alert(
                error.response?.data?.message ||
                error.response?.data?.error ||
                "Signup failed"
            )
        }
    }

    // Sync state with location path changes
    useEffect(() => {
        setIsLoginView(location.pathname !== '/signup')
    }, [location.pathname])

    const toggleView = (e) => {
        e.preventDefault()
        const newIsLogin = !isLoginView
        setIsLoginView(newIsLogin)
        // Optionally update URL without reloading
        navigate(newIsLogin ? '/login' : '/signup', { replace: true })
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-6 overflow-hidden relative">
            
            {/* Ambient Background Decorative Gradients */}
            <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[10%] right-[20%] w-[400px] h-[400px] rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none" />

            {/* Central Animated Container */}
            <div className="relative w-full max-w-md min-h-[680px] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] overflow-hidden border border-slate-100/60 z-10">
                
                {/* LOGIN PANEL */}
                <div 
                    className={`absolute inset-0 w-full h-full flex flex-col p-8 md:p-10 overflow-y-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
                        isLoginView ? 'translate-x-0 opacity-100 z-10 visible' : '-translate-x-[120%] opacity-0 z-0 invisible'
                    }`}
                >
                    <div className="w-full flex-grow flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-8 justify-center">
                            <img src={logo} alt="Logo" className="w-16 h-16 object-contain" />
                        </div>

                        <div className="mb-8 text-center">
                            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                                Welcome Back
                            </h2>
                            <p className="text-slate-500 mt-2 text-sm">
                                Access the Catalyst workspace using your corporate Google account.
                            </p>
                        </div>

                        {loginInfoMsg && (
                            <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200/60 text-amber-900 text-sm flex items-start gap-3">
                                <span className="text-lg leading-none">⚠️</span>
                                <div>
                                    <p className="font-bold">Approval Pending</p>
                                    <p className="text-xs text-amber-700/90 mt-0.5">{loginInfoMsg}</p>
                                </div>
                            </div>
                        )}

                        {loginErrorMsg && (
                            <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200/60 text-rose-900 text-sm flex items-start gap-3">
                                <span className="text-lg leading-none">❌</span>
                                <div>
                                    <p className="font-bold">Authentication Failed</p>
                                    <p className="text-xs text-rose-700/90 mt-0.5">{loginErrorMsg}</p>
                                </div>
                            </div>
                        )}

                        <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col items-center justify-center gap-5">
                            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Secure Google SSO</p>
                            
                            <div className="w-full flex justify-center py-2 transition-transform duration-200 hover:scale-[1.02]">
                                <GoogleLogin
                                    onSuccess={handleLoginSuccess}
                                    onError={() => setLoginErrorMsg("Google Authenticator failed. Please try again.")}
                                    theme="filled_blue"
                                    size="large"
                                    shape="pill"
                                    width="100%"
                                />
                            </div>
                            
                            <p className="text-[10px] text-slate-400 text-center leading-relaxed">
                                By continuing, you agree to the terms of use, privacy policies, and security logging protocols.
                            </p>
                        </div>

                        {/* DEV ONLY: Username/Password Login */}
                        <div className="mt-4">
                            <button
                                type="button"
                                onClick={() => { setShowDevLogin(v => !v); setDevError("") }}
                                className="w-full flex items-center justify-between px-4 py-2.5 rounded-2xl border border-dashed border-amber-300 bg-amber-50 text-amber-700 text-xs font-bold uppercase tracking-wider hover:bg-amber-100 transition-colors"
                            >
                                <span className="flex items-center gap-2">
                                    <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                                    Dev Login
                                </span>
                                <span className="text-amber-400">{showDevLogin ? '▲' : '▼'}</span>
                            </button>

                            {showDevLogin && (
                                <form
                                    onSubmit={handleDevLogin}
                                    className="mt-3 p-4 rounded-2xl border border-amber-200 bg-amber-50/60 flex flex-col gap-3"
                                >
                                    <p className="text-[10px] text-amber-600 font-semibold uppercase tracking-wider text-center">
                                        ⚠️ Development only — do not use in production
                                    </p>

                                    {devError && (
                                        <p className="text-xs text-rose-600 bg-rose-50 border border-rose-200 rounded-xl px-3 py-2 text-center">
                                            {devError}
                                        </p>
                                    )}

                                    <input
                                        id="dev-username"
                                        type="text"
                                        autoComplete="username"
                                        placeholder="Username"
                                        value={devUsername}
                                        onChange={e => setDevUsername(e.target.value)}
                                        required
                                        className="w-full border border-amber-200 bg-white rounded-xl px-4 py-2.5 text-slate-800 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 placeholder-slate-400 transition"
                                    />

                                    <input
                                        id="dev-password"
                                        type="password"
                                        autoComplete="current-password"
                                        placeholder="Password"
                                        value={devPassword}
                                        onChange={e => setDevPassword(e.target.value)}
                                        required
                                        className="w-full border border-amber-200 bg-white rounded-xl px-4 py-2.5 text-slate-800 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 placeholder-slate-400 transition"
                                    />

                                    <button
                                        id="dev-login-btn"
                                        type="submit"
                                        disabled={devLoading}
                                        className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-white text-sm font-bold transition-colors"
                                    >
                                        {devLoading ? 'Signing in…' : 'Sign in'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                    <div className="mt-8 text-center text-sm text-slate-500 border-t pt-6 border-slate-100 flex items-center justify-center gap-2">
                        <span>Don&apos;t have an account?</span>
                        <button
                            onClick={toggleView}
                            className="font-bold text-purple-600 hover:text-purple-700 transition-colors inline-flex items-center gap-1 hover:underline cursor-pointer"
                        >
                            Create Account <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>

                {/* SIGNUP PANEL */}
                <div 
                    className={`absolute inset-0 w-full h-full flex flex-col p-8 md:p-10 overflow-y-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
                        !isLoginView ? 'translate-x-0 opacity-100 z-10 visible' : 'translate-x-[120%] opacity-0 z-0 invisible'
                    }`}
                >
                    <div className="w-full flex-grow flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-8 justify-center">
                            <img src={logo} alt="Logo" className="w-16 h-16 object-contain" />
                        </div>

                        <div className="mb-8 text-center">
                            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                                Create Account
                            </h2>
                            <p className="text-slate-500 mt-2 text-sm">
                                Register your workspace profile.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-1.5">
                                    <User size={12} className="text-purple-500" /> Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    className="w-full border border-slate-200 bg-slate-50/50 rounded-2xl px-4 py-3 text-slate-900 text-sm outline-none transition duration-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10 placeholder-slate-400"
                                />
                            </div>

                            <div>
                                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-1.5">
                                    <Phone size={12} className="text-purple-500" /> Mobile Number
                                </label>
                                <input
                                    type="tel"
                                    name="mobile_number"
                                    value={formData.mobile_number}
                                    onChange={handleChange}
                                    placeholder="Enter your mobile number"
                                    className="w-full border border-slate-200 bg-slate-50/50 rounded-2xl px-4 py-3 text-slate-900 text-sm outline-none transition duration-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10 placeholder-slate-400"
                                />
                            </div>

                            <div>
                                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-1.5">
                                    <Briefcase size={12} className="text-purple-500" /> Professional Role
                                </label>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full border border-slate-200 bg-slate-50/50 rounded-2xl px-4 py-3 text-slate-900 text-sm outline-none transition duration-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10"
                                >
                                    <option value="">Choose your specialization</option>
                                    {roles.map((role) => (
                                        <option key={role.value} value={role.value}>
                                            {role.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-4 mt-2 shadow-sm flex flex-col items-center gap-3">
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Complete with Google SSO</p>
                                
                                <div className="w-full flex justify-center py-1 transition-transform duration-200 hover:scale-[1.02]">
                                    <GoogleLogin
                                        onSuccess={handleGoogleSignup}
                                        onError={() => console.log("Google Signup Failed")}
                                        text="signup_with"
                                        theme="filled_blue"
                                        size="large"
                                        shape="pill"
                                        width="100%"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 text-center text-sm text-slate-500 border-t pt-5 border-slate-100 flex items-center justify-center gap-2">
                        <button
                            onClick={toggleView}
                            className="font-bold text-slate-700 hover:text-purple-600 transition-colors inline-flex items-center gap-1.5 hover:underline cursor-pointer"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}
