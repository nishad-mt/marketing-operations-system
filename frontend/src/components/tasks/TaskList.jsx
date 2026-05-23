import TaskCard from "./TaskCard";

export default function TaskList({ tasks, loading, onStatusChange, emptyMessage = "No tasks found." }) {
    if (loading) {
        return (
            <div className="flex justify-center py-10 text-slate-400">
                <p>Loading tasks...</p>
            </div>
        );
    }

    if (!tasks || tasks.length === 0) {
        return (
            <div className="flex justify-center py-10 bg-slate-50 border border-dashed border-slate-200 rounded-2xl text-slate-400">
                <p>{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map(task => (
                <TaskCard 
                    key={task.id} 
                    task={task} 
                    onStatusChange={onStatusChange} 
                />
            ))}
        </div>
    );
}
