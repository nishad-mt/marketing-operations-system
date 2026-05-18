import { GoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { Link } from 'react-router-dom'

function LoginPage() {

    const handleSuccess = async (credentialResponse) => {

        try {

            const res = await axios.post(
                'http://127.0.0.1:8000/api/auth/google/',
                {
                    token: credentialResponse.credential
                }
            )

            console.log(res.data)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h1>Login</h1>

            <GoogleLogin
                onSuccess={handleSuccess}
                onError={() => console.log("Login Failed")}
            />

            <div className="mt-6 text-center text-sm text-gray-500">

                Don&apos;t have an account?{' '}

                <Link
                    to="/signup"
                    className="font-semibold text-black hover:underline"
                >
                    Signup
                </Link>

            </div>
        </div>
    )
}

export default LoginPage