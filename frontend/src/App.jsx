import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

import AuthPage from './pages/AuthPage'
import DashboardPage from './pages/DashboardPage'
import TasksPage from './pages/TasksPage'

function App() {

  return (
    <AuthProvider>
      <Routes>

        <Route
          path="/"
          element={<AuthPage />}
        />

        <Route
          path="/login"
          element={<AuthPage />}
        />

        <Route
          path="/signup"
          element={<AuthPage />}
        />

        <Route
          path="/dashboard"
          element={<DashboardPage />}
        />

        <Route
          path="/tasks"
          element={<TasksPage />}
        />

      </Routes>
    </AuthProvider>
  )
}

export default App