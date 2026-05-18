import {
  Users,
  ClipboardList,
  Clock3,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";


function StatCard({
  title,
  value,
  icon,
}) {

  return (

    <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">

      <div className="flex items-center justify-between mb-4">

        <p className="text-gray-500 text-sm">
          {title}
        </p>

        <div className="bg-gray-100 p-2 rounded-xl">
          {icon}
        </div>

      </div>

      <h2 className="text-3xl font-bold text-gray-900">
        {value}
      </h2>

    </div>
  );
}


function ManagerSection() {

  // Temporary mock data
  // Later fetch from backend

  const stats = {

    totalEmployees: 24,

    activeTasks: 18,

    pendingReviews: 6,

    completedThisMonth: 42,
  };


  const pendingApprovals = [

    {
      id: 1,
      name: "Rahul",
      role: "Script Writer",
    },

    {
      id: 2,
      name: "Ameen",
      role: "Video Editor",
    },
  ];


  const recentTasks = [

    {
      id: 1,
      title: "NEET Reel Campaign",
      department: "Content",
      status: "Pending Review",
    },

    {
      id: 2,
      title: "JEE Poster Design",
      department: "Creative",
      status: "In Progress",
    },

    {
      id: 3,
      title: "Admissions Copywriting",
      department: "Marketing",
      status: "Completed",
    },
  ];


  return (

    <div className="space-y-8">

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

        <StatCard
          title="Total Employees"
          value={stats.totalEmployees}
          icon={<Users size={20} />}
        />

        <StatCard
          title="Active Tasks"
          value={stats.activeTasks}
          icon={<ClipboardList size={20} />}
        />

        <StatCard
          title="Pending Reviews"
          value={stats.pendingReviews}
          icon={<Clock3 size={20} />}
        />

        <StatCard
          title="Completed This Month"
          value={stats.completedThisMonth}
          icon={<TrendingUp size={20} />}
        />

      </div>


      {/* Main Grid */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Pending Approvals */}

        <div className="bg-white rounded-2xl shadow-sm p-6">

          <div className="flex items-center justify-between mb-5">

            <h2 className="text-xl font-semibold">
              Pending Approvals
            </h2>

            <div className="bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full">
              {pendingApprovals.length} Pending
            </div>

          </div>


          <div className="space-y-4">

            {pendingApprovals.map((user) => (

              <div
                key={user.id}
                className="border border-gray-200 rounded-xl p-4"
              >

                <div className="flex items-center justify-between">

                  <div>

                    <h3 className="font-semibold text-gray-900">
                      {user.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {user.role}
                    </p>

                  </div>


                  <button className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:opacity-90">

                    Approve

                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>


        {/* Recent Tasks */}

        <div className="bg-white rounded-2xl shadow-sm p-6 xl:col-span-2">

          <div className="flex items-center justify-between mb-5">

            <h2 className="text-xl font-semibold">
              Recent Tasks
            </h2>

            <button className="text-sm font-medium hover:underline">
              View All
            </button>

          </div>


          <div className="space-y-4">

            {recentTasks.map((task) => (

              <div
                key={task.id}
                className="border border-gray-200 rounded-xl p-4 flex items-center justify-between"
              >

                <div>

                  <h3 className="font-semibold text-gray-900">
                    {task.title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {task.department}
                  </p>

                </div>


                <div>

                  {task.status ===
                    "Pending Review" && (

                    <div className="flex items-center gap-2 text-orange-500 text-sm">

                      <Clock3 size={16} />

                      Pending Review

                    </div>
                  )}


                  {task.status ===
                    "In Progress" && (

                    <div className="flex items-center gap-2 text-blue-500 text-sm">

                      <ClipboardList size={16} />

                      In Progress

                    </div>
                  )}


                  {task.status ===
                    "Completed" && (

                    <div className="flex items-center gap-2 text-green-600 text-sm">

                      <CheckCircle2 size={16} />

                      Completed

                    </div>
                  )}

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

export default ManagerSection;