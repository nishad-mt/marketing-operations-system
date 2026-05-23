import {
  Users,
  ClipboardList,
  Clock3,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

import { useEffect, useState } from "react";
import api from "../../services/api";

function StatCard({ title, value, icon }) {
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
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [stats, setStats] = useState({
    totalEmployees: 0,
    activeTasks: 0,
    pendingReviews: 0,
    completedThisMonth: 0,
  });
  const [recentTasks, setRecentTasks] = useState([]);

  useEffect(() => {
    fetchPendingUsers();
    fetchStats();
    fetchEmployees();

    const intervalId = setInterval(() => {
      fetchPendingUsers();
      fetchStats();
      fetchEmployees();
    }, 10000); // Poll every 10 seconds

    return () => clearInterval(intervalId);
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get("/auth/manager-dashboard-stats/");
      setStats({
        totalEmployees: response.data.totalEmployees,
        activeTasks: response.data.activeTasks,
        pendingReviews: response.data.pendingReviews,
        completedThisMonth: response.data.completedThisMonth,
      });
      setRecentTasks(response.data.recentTasks || []);
    } catch (error) {
      console.log("ERROR FETCHING STATS:", error);
    }
  };

  const fetchPendingUsers = async () => {
    try {
      const response = await api.get("/auth/pending-users/");
      setPendingApprovals(response.data);
    } catch(error){
      console.log("ERROR:", error.response);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await api.get("/auth/employees/");
      setEmployees(response.data);
    } catch(error) {
      console.log("ERROR FETCHING EMPLOYEES:", error);
    }
  };

  const approveUser = async(id) => {
    try{
      await api.patch(`/auth/approve/${id}/`, {});
      fetchPendingUsers();
      fetchEmployees();
    }catch(error){
      console.log(error);
    }
  };

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
                    {user.name || user.email || "Unknown User"}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {user.role}
                  </p>

                </div>


                <button

                  onClick={()=>
                    approveUser(user.id)
                  }

                  className="
                  bg-black
                  text-white
                  px-4
                  py-2
                  rounded-lg
                  text-sm
                  hover:opacity-90
                  "

                >

                  Approve

                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* Recent Tasks */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold">Recent Tasks</h2>
        </div>
        
        <div className="space-y-4">
          {recentTasks.map((task) => (
            <div
              key={task.id}
              className="border border-gray-200 rounded-xl p-4 flex items-center justify-between"
            >
              <div>
                <h3 className="font-semibold text-gray-900">{task.title}</h3>
                <p className="text-sm text-gray-500">{task.department}</p>
              </div>
              <div className="text-sm font-medium bg-gray-100 px-3 py-1 rounded-full text-gray-700">
                {task.status}
              </div>
            </div>
          ))}
          {recentTasks.length === 0 && (
            <p className="text-gray-500 text-sm">No recent tasks available.</p>
          )}
        </div>
      </div>

      {/* Team Overview */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold">Team Overview</h2>
        </div>
        
        <div className="space-y-4">
          {employees.map((emp) => (
            <div key={emp.id} className="border border-gray-200 rounded-xl p-5">
              <div className="flex justify-between items-start border-b border-gray-100 pb-3 mb-3">
                <div>
                  <h3 className="font-bold text-gray-900">{emp.name}</h3>
                  <p className="text-sm text-gray-500 capitalize">{emp.role.replace(/_/g, ' ')} • {emp.department || "No Department"}</p>
                </div>
                <div className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full font-medium">
                  {emp.active_tasks?.length || 0} Active Tasks
                </div>
              </div>
              
              <div className="space-y-2">
                {emp.active_tasks && emp.active_tasks.length > 0 ? (
                  emp.active_tasks.map(task => (
                    <div key={task.id} className="flex justify-between items-center text-sm bg-gray-50 p-2 rounded-lg">
                      <span className="font-medium text-gray-700">{task.title}</span>
                      <div className="flex gap-3 text-xs text-gray-500">
                        <span>{task.status}</span>
                        {task.due_date && <span>Due: {new Date(task.due_date).toLocaleDateString()}</span>}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-400 italic">No active tasks assigned.</p>
                )}
              </div>
            </div>
          ))}
          {employees.length === 0 && (
            <p className="text-gray-500 text-sm">No approved employees found.</p>
          )}
        </div>
      </div>

    </div>
  );
}

export default ManagerSection;