import { Calendar, CheckCircle, Clock, FileText, User } from "lucide-react";

export default function TaskCard({ task, onStatusChange }) {
    const statusColors = {
        pending: "bg-amber-100 text-amber-800",
        in_progress: "bg-blue-100 text-blue-800",
        in_review: "bg-purple-100 text-purple-800",
        approved: "bg-emerald-100 text-emerald-800",
        rejected: "bg-rose-100 text-rose-800"
    };

    const statusLabels = {
        pending: "Pending",
        in_progress: "In Progress",
        in_review: "In Review",
        approved: "Approved",
        rejected: "Rejected"
    };

    return (
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-slate-800 text-lg">{task.title}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[task.status]}`}>
                    {statusLabels[task.status]}
                </span>
            </div>
            
            <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                {task.description || "No description provided."}
            </p>

            <div className="flex flex-wrap gap-4 text-xs text-slate-500 mb-4">
                <div className="flex items-center gap-1.5">
                    <User size={14} className="text-slate-400" />
                    <span>Assignee: {task.assigned_to_details?.first_name || "Unassigned"}</span>
                </div>
                {task.due_date && (
                    <div className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-slate-400" />
                        <span>Due: {new Date(task.due_date).toLocaleDateString()}</span>
                    </div>
                )}
                <div className="flex items-center gap-1.5">
                    <Clock size={14} className="text-slate-400" />
                    <span>Created: {new Date(task.created_at).toLocaleDateString()}</span>
                </div>
            </div>

            {onStatusChange && task.status !== 'approved' && (
                <div className="pt-4 border-t border-slate-100 flex gap-2">
                    {task.status === 'pending' && (
                        <button 
                            onClick={() => onStatusChange(task.id, 'in_progress')}
                            className="text-xs bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1.5 rounded-lg font-medium transition"
                        >
                            Start Work
                        </button>
                    )}
                    {task.status === 'in_progress' && (
                        <button 
                            onClick={() => onStatusChange(task.id, 'in_review')}
                            className="text-xs bg-purple-50 text-purple-600 hover:bg-purple-100 px-3 py-1.5 rounded-lg font-medium transition"
                        >
                            Submit for Review
                        </button>
                    )}
                    {(task.status === 'in_review' || task.status === 'rejected') && (
                        <>
                            <button 
                                onClick={() => onStatusChange(task.id, 'approved')}
                                className="text-xs bg-emerald-50 text-emerald-600 hover:bg-emerald-100 px-3 py-1.5 rounded-lg font-medium transition flex items-center gap-1"
                            >
                                <CheckCircle size={14}/> Approve
                            </button>
                            <button 
                                onClick={() => onStatusChange(task.id, 'rejected')}
                                className="text-xs bg-rose-50 text-rose-600 hover:bg-rose-100 px-3 py-1.5 rounded-lg font-medium transition"
                            >
                                Reject
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
