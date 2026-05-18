import { GoogleLogin } from '@react-oauth/google'
import axios from 'axios'

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
        </div>
    )
}

export default LoginPage