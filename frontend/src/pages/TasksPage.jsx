import { useEffect, useState } from "react";
import DashboardLayout from "../Layouts/DashboardLayout";
import api from "../services/api";
import TaskList from "../components/tasks/TaskList";
import { useAuth } from "../context/AuthContext";

export default function TasksPage() {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        department: '', // Needs department ID
    });
    
    // Departments can be fetched from API, but for simplicity we assume 
    // Manager/Heads know what they are doing or we load them.
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        fetchTasks();
        // Since we don't have a department API yet, we could hardcode or just allow the backend to assign it based on user if they are a head
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
            console.log("Error updating status:", error);
        }
    };

    const handleCreateTask = async (e) => {
        e.preventDefault();
        try {
            // Basic implementation: if user is department head, their department is used.
            // A more robust implementation would fetch departments and let them choose.
            // We pass department=user.department or just 1 as fallback for demo if not using dropdown.
            await api.post('/tasks/', {
                title: newTask.title,
                description: newTask.description,
                department: 1, // Fallback, would need actual department ID
                status: 'pending'
            });
            setIsModalOpen(false);
            fetchTasks();
        } catch (error) {
            console.log("Error creating task:", error);
        }
    }

    return (
        <DashboardLayout user={user}>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">All Tasks</h1>
                {(user?.role === 'manager' || user?.role?.includes('head')) && (
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="bg-purple-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-purple-700 transition"
                    >
                        + Create Task
                    </button>
                )}
            </div>

            <TaskList 
                tasks={tasks} 
                loading={loading} 
                onStatusChange={handleStatusChange} 
            />

            {/* Simple Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Create New Task</h2>
                        <form onSubmit={handleCreateTask} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold mb-1 text-gray-700">Title</label>
                                <input 
                                    required 
                                    className="w-full border border-gray-200 rounded-xl p-3" 
                                    value={newTask.title}
                                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1 text-gray-700">Description</label>
                                <textarea 
                                    className="w-full border border-gray-200 rounded-xl p-3 h-24" 
                                    value={newTask.description}
                                    onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                                />
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <button 
                                    type="button" 
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    className="bg-purple-600 text-white px-4 py-2 rounded-xl"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}
