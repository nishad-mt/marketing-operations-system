import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { GoogleOAuthProvider } from '@react-oauth/google'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId="959382360342-p73vboo5vr47me9ec9401a2e3kv0ckv8.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </BrowserRouter>
)