import React, { useEffect, useState } from 'react';
import { FileText } from 'lucide-react';
import api from '../../services/api';
import TaskList from '../tasks/TaskList';

function ContentSection() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await api.get('/tasks/');
      setTasks(response.data);
    } catch (error) {
      console.log("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await api.patch(`/tasks/${taskId}/update_status/`, { status: newStatus });
      fetchTasks();
    } catch (error) {
      console.log("Error updating task status:", error);
    }
  };

  const activeTasks = tasks.filter(t => t.status !== 'approved' && t.status !== 'rejected').length;
  const inReviewTasks = tasks.filter(t => t.status === 'in_review').length;
  const approvedTasks = tasks.filter(t => t.status === 'approved').length;

  return (
    <div className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-purple-100 p-2 rounded-xl text-purple-600">
          <FileText size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Content Department Portal</h2>
          <p className="text-sm text-gray-500">Manage scripts, blogs, and copywriting tasks</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="border border-purple-100 bg-purple-50/30 rounded-2xl p-4">
          <div className="text-sm font-semibold text-purple-800">Active Tasks</div>
          <div className="text-2xl font-bold text-purple-900 mt-1">{activeTasks}</div>
        </div>
        <div className="border border-indigo-100 bg-indigo-50/30 rounded-2xl p-4">
          <div className="text-sm font-semibold text-indigo-800">In Review</div>
          <div className="text-2xl font-bold text-indigo-900 mt-1">{inReviewTasks}</div>
        </div>
        <div className="border border-green-100 bg-green-50/30 rounded-2xl p-4">
          <div className="text-sm font-semibold text-green-800">Total Approved</div>
          <div className="text-2xl font-bold text-green-900 mt-1">{approvedTasks}</div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="font-semibold text-gray-900 text-lg mb-4">Department Tasks</h3>
        <TaskList 
            tasks={tasks} 
            loading={loading} 
            onStatusChange={handleStatusChange} 
            emptyMessage="No content tasks found." 
        />
      </div>
    </div>
  );
}

export default ContentSection;
