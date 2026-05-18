import { useState } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Sparkles, Terminal, ShieldCheck, Activity, ArrowRight } from 'lucide-react'

function LoginPage() {
    const navigate = useNavigate()
    const [errorMsg, setErrorMsg] = useState("")
    const [infoMsg, setInfoMsg] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSuccess = async (credentialResponse) => {
        setErrorMsg("")
        setInfoMsg("")
        setLoading(true)

        try {
            const res = await axios.post(
                'http://127.0.0.1:8000/api/auth/google/',
                {
                    token: credentialResponse.credential
                }
            )

            localStorage.setItem('access', res.data.access)
            localStorage.setItem('refresh', res.data.refresh)
            localStorage.setItem('user', JSON.stringify(res.data.user))

            navigate('/dashboard')
        } catch (error) {
            console.log(error)
            setLoading(false)
            if (error.response) {
                if (error.response.status === 403) {
                    setInfoMsg(error.response.data.message || "Waiting for manager approval")
                } else {
                    setErrorMsg(error.response.data.error || error.response.data.message || "Login failed")
                }
            } else {
                setErrorMsg("Network error. Please make sure the backend is running.")
            }
        }
    }

    return (
        <div className="min-h-screen w-full flex flex-col md:flex-row bg-slate-50">
            {/* Left Screen - Premium Brand Experience & Dashboard Preview */}
            <div className="hidden lg:flex lg:w-7/12 bg-slate-950 text-white p-12 flex-col justify-between relative overflow-hidden">
                {/* Decorative Glowing Gradients */}
                <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[60%] rounded-full bg-gradient-to-tr from-purple-600/30 to-indigo-600/10 blur-[100px] pointer-events-none" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[50%] rounded-full bg-gradient-to-br from-emerald-600/20 to-purple-600/20 blur-[80px] pointer-events-none" />

                {/* Brand Header */}
                <div className="flex items-center gap-3 relative z-10">
                    <div className="bg-gradient-to-tr from-purple-600 to-indigo-600 p-2.5 rounded-2xl shadow-lg shadow-purple-500/20 flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-white animate-pulse" />
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
                        The Intelligence Layer for{" "}
                        <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">
                            Marketing Teams
                        </span>
                    </h1>
                    <p className="text-slate-400 mt-6 text-base leading-relaxed">
                        Streamline your entire creative production workflow, review campaign performance metrics, and orchestrate omnichannel assets inside a unified, beautiful command center.
                    </p>

                    {/* Floating Dashboard Mini Metric Card */}
                    <div className="mt-10 p-5 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl flex items-center justify-between transition-transform duration-300 hover:scale-[1.02]">
                        <div className="flex items-center gap-4">
                            <div className="bg-emerald-500/10 p-3 rounded-2xl text-emerald-400">
                                <Activity className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Active Campaigns</p>
                                <h3 className="text-2xl font-bold text-white mt-0.5">18 Operations</h3>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
                                +14.2% Growth
                            </span>
                        </div>
                    </div>
                </div>

                {/* Footer Meta */}
                <div className="flex items-center gap-6 text-xs text-slate-500 relative z-10">
                    <span className="flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-purple-500" /> Authorized Access Only
                    </span>
                    <span>•</span>
                    <span>v2.4.0</span>
                </div>
            </div>

            {/* Right Screen - Clean Modern Auth Portal */}
            <div className="w-full lg:w-5/12 flex items-center justify-center px-6 py-12 md:p-16 bg-white">
                <div className="w-full max-w-md">
                    {/* Mobile Brand Header */}
                    <div className="flex lg:hidden items-center justify-center gap-2 mb-8">
                        <div className="bg-gradient-to-tr from-purple-600 to-indigo-600 p-2 rounded-xl text-white">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-xl text-slate-900 tracking-tight">Catalyst</span>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                            Sign In
                        </h2>
                        <p className="text-slate-500 mt-2 text-sm">
                            Access the global Catalyst workspace using your corporate Google account.
                        </p>
                    </div>

                    {/* Notification Dialogues */}
                    {infoMsg && (
                        <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200/60 text-amber-900 text-sm flex items-start gap-3">
                            <span className="text-lg leading-none">⚠️</span>
                            <div>
                                <p className="font-bold">Approval Pending</p>
                                <p className="text-xs text-amber-700/90 mt-0.5">{infoMsg}</p>
                            </div>
                        </div>
                    )}

                    {errorMsg && (
                        <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200/60 text-rose-900 text-sm flex items-start gap-3">
                            <span className="text-lg leading-none">❌</span>
                            <div>
                                <p className="font-bold">Authentication Failed</p>
                                <p className="text-xs text-rose-700/90 mt-0.5">{errorMsg}</p>
                            </div>
                        </div>
                    )}

                    {/* Google Login Component wrapper */}
                    <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col items-center justify-center gap-5">
                        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Secure Google SSO</p>
                        
                        <div className="w-full flex justify-center py-2 transition-transform duration-200 hover:scale-[1.02]">
                            <GoogleLogin
                                onSuccess={handleSuccess}
                                onError={() => setErrorMsg("Google Authenticator failed. Please try again.")}
                                theme="filled_blue"
                                size="large"
                                shape="pill"
                                width="320px"
                            />
                        </div>
                        
                        <p className="text-[10px] text-slate-400 text-center max-w-xs leading-relaxed">
                            By continuing, you agree to the organizational terms of use, privacy policies, and security logging protocols.
                        </p>
                    </div>

                    {/* Switch View Trigger */}
                    <div className="mt-8 text-center text-sm text-slate-500 border-t pt-6 border-slate-100 flex items-center justify-center gap-2">
                        <span>Don&apos;t have an account?</span>
                        <Link
                            to="/signup"
                            className="font-bold text-purple-600 hover:text-purple-700 transition-colors inline-flex items-center gap-1 hover:underline"
                        >
                            Create Account <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage