import { Link } from "react-router-dom";

function DashboardLayout({ children, user }) {

  return (

    <div className="min-h-screen bg-gray-100 flex">

      {/* Sidebar */}

      <aside className="w-64 bg-white shadow-md hidden md:flex flex-col">

        <div className="p-6 border-b">

          <h1 className="text-2xl font-bold">
            Catalyst
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Marketing Operations
          </p>

        </div>


        <nav className="flex-1 p-4 space-y-2">

          <Link
            to="/dashboard"
            className="block px-4 py-3 rounded-xl hover:bg-gray-100 transition"
          >
            Dashboard
          </Link>

          <Link
            to="/tasks"
            className="block px-4 py-3 rounded-xl hover:bg-gray-100 transition"
          >
            Tasks
          </Link>

          <Link
            to="/calendar"
            className="block px-4 py-3 rounded-xl hover:bg-gray-100 transition"
          >
            Content Calendar
          </Link>

          <Link
            to="/reviews"
            className="block px-4 py-3 rounded-xl hover:bg-gray-100 transition"
          >
            Reviews
          </Link>

        </nav>


        <div className="p-4 border-t">

          <div className="flex items-center gap-3">

            <img
              src={user?.profile_picture}
              alt="profile"
              className="w-11 h-11 rounded-full"
            />

            <div>

              <h3 className="font-semibold text-sm">
                {user?.name}
              </h3>

              <p className="text-xs text-gray-500">
                {user?.role}
              </p>

            </div>

          </div>

        </div>

      </aside>


      {/* Main Content */}

      <main className="flex-1">

        {/* Top Navbar */}

        <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold">
              Dashboard
            </h2>

            <p className="text-gray-500 text-sm">
              Welcome back
            </p>

          </div>


          <button className="bg-black text-white px-5 py-2 rounded-xl hover:opacity-90 transition">
            Logout
          </button>

        </header>


        {/* Page Content */}

        <div className="p-6">

          {children}

        </div>

      </main>

    </div>
  );
}

export default DashboardLayout;