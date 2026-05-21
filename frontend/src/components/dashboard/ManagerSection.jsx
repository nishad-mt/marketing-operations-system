import {
  Users,
  ClipboardList,
  Clock3,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

import { useEffect, useState } from "react";
import axios from "axios";


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
  const [stats, setStats] = useState({
    totalEmployees: 0,
    activeTasks: 0,
    pendingReviews: 0,
    completedThisMonth: 0,
  });
  const [recentTasks, setRecentTasks] = useState([]);

  const token = localStorage.getItem("access");

  useEffect(() => {
    fetchPendingUsers();
    fetchStats();

    const intervalId = setInterval(() => {
      fetchPendingUsers();
      fetchStats();
    }, 10000); // Poll every 10 seconds

    return () => clearInterval(intervalId);
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/auth/manager-dashboard-stats/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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

    const response = await axios.get(

      "http://127.0.0.1:8000/api/auth/pending-users/",

      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    );

    console.log("API RESPONSE:", response.data);

    setPendingApprovals(response.data);

  } catch(error){

    console.log("ERROR:", error.response);
  }
};


  const approveUser = async(id)=>{

    try{

      await axios.patch(

        `http://127.0.0.1:8000/api/auth/approve/${id}/`,

        {},

        {
          headers:{
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      fetchPendingUsers();

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

    </div>
  );
}

export default ManagerSection;