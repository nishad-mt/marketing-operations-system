import {
  Users,
  ClipboardList,
  Clock3,
  TrendingUp,
} from "lucide-react";

import { useEffect, useState } from "react";
import api from "../../services/api";

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <p className="text-gray-500 text-sm">{title}</p>
        <div className="bg-gray-100 p-2 rounded-xl">{icon}</div>
      </div>
      <h2 className="text-3xl font-bold text-gray-900">{value}</h2>
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
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get("/auth/manager-dashboard-stats/");
      setStats({
        totalEmployees: res.data.totalEmployees,
        activeTasks: res.data.activeTasks,
        pendingReviews: res.data.pendingReviews,
        completedThisMonth: res.data.completedThisMonth,
      });
      setRecentTasks(res.data.recentTasks || []);
    } catch (e) {
      console.log("ERROR FETCHING STATS:", e);
    }
  };

  const fetchPendingUsers = async () => {
    try {
      const res = await api.get("/auth/pending-users/");
      setPendingApprovals(res.data);
    } catch (e) {
      console.log("ERROR:", e.response);
    }
  };

  const fetchEmployees = async () => {
    try {
      const res = await api.get("/auth/employees/");
      setEmployees(res.data);
    } catch (e) {
      console.log("ERROR FETCHING EMPLOYEES:", e);
    }
  };

  const approveUser = async (id) => {
    try {
      await api.patch(`/auth/approve/${id}/`, {});
      fetchPendingUsers();
      fetchEmployees();
    } catch (e) {
      console.log(e);
    }
  };

  const teamMembers = employees.filter((emp) => emp.role !== "manager");

  const roleLabelMap = {
    social_media_executive: "Social Media",
    performance_marketer: "Performance",
    content_head: "Content Head",
    script_writer: "Script Writer",
    copy_writer: "Copywriter",
    creator: "Creator",
    video_editor: "Video Editor",
    designer: "Designer",
  };

  const roleColorMap = {
    social_media_executive: "bg-sky-100 text-sky-700",
    performance_marketer: "bg-orange-100 text-orange-700",
    content_head: "bg-violet-100 text-violet-700",
    script_writer: "bg-emerald-100 text-emerald-700",
    copy_writer: "bg-teal-100 text-teal-700",
    creator: "bg-pink-100 text-pink-700",
    video_editor: "bg-indigo-100 text-indigo-700",
    designer: "bg-yellow-100 text-yellow-700",
  };

  const statusColorMap = {
    Pending: "bg-amber-100 text-amber-700",
    "In Progress": "bg-blue-100 text-blue-700",
    "In Review": "bg-purple-100 text-purple-700",
    Completed: "bg-green-100 text-green-700",
    Approved: "bg-emerald-100 text-emerald-700",
  };

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard title="Total Employees" value={stats.totalEmployees} icon={<Users size={20} />} />
        <StatCard title="Active Tasks" value={stats.activeTasks} icon={<ClipboardList size={20} />} />
        <StatCard title="Pending Reviews" value={stats.pendingReviews} icon={<Clock3 size={20} />} />
        <StatCard title="Completed This Month" value={stats.completedThisMonth} icon={<TrendingUp size={20} />} />
      </div>

      {/* Pending Approvals */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold">Pending Approvals</h2>
          <div className="bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full">
            {pendingApprovals.length} Pending
          </div>
        </div>
        <div className="space-y-4">
          {pendingApprovals.map((u) => (
            <div key={u.id} className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{u.name || u.email || "Unknown User"}</h3>
                  <p className="text-sm text-gray-500">{u.role}</p>
                </div>
                <button
                  onClick={() => approveUser(u.id)}
                  className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:opacity-90"
                >
                  Approve
                </button>
              </div>
            </div>
          ))}
          {pendingApprovals.length === 0 && (
            <p className="text-gray-400 text-sm italic">No pending approvals.</p>
          )}
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

      {/* Team Overview - Table */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold">Team Overview</h2>
          <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
            {teamMembers.length} member{teamMembers.length !== 1 ? "s" : ""}
          </span>
        </div>

        {teamMembers.length === 0 ? (
          <p className="text-gray-500 text-sm italic">No approved team members found.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100">
                  <th className="text-left px-4 py-3 font-semibold w-8">#</th>
                  <th className="text-left px-4 py-3 font-semibold">Name</th>
                  <th className="text-left px-4 py-3 font-semibold">Role</th>
                  <th className="text-left px-4 py-3 font-semibold">Department</th>
                  <th className="text-center px-4 py-3 font-semibold">Tasks</th>
                  <th className="text-left px-4 py-3 font-semibold">Assignments</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {teamMembers.map((emp, idx) => (
                  <tr key={emp.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="px-4 py-3.5 text-gray-400 font-medium text-xs">{idx + 1}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                          {(emp.name || emp.email || "?")[0].toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 leading-tight">{emp.name || "—"}</p>
                          <p className="text-xs text-gray-400">{emp.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                          roleColorMap[emp.role] || "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {roleLabelMap[emp.role] || emp.role}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-gray-600">{emp.department || "—"}</td>
                    <td className="px-4 py-3.5 text-center text-gray-700 font-medium">
                      {emp.taskCount ?? "—"}
                    </td>
                    <td className="px-4 py-3.5 text-gray-600">{emp.assignments || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManagerSection;