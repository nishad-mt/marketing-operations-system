import React from 'react';
import { FileText, Edit, Video, Share2 } from 'lucide-react';

function ContentSection() {
  const contentItems = [
    { id: 1, title: 'Reel Script: Coding Hacks', type: 'Script', status: 'Approved' },
    { id: 2, title: 'Blog: Modern SEO Trends', type: 'Blog', status: 'Drafting' },
    { id: 3, title: 'Ad Copy: Admissions 2026', type: 'Copy', status: 'In Review' },
  ];

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
          <div className="text-sm font-semibold text-purple-800">Total Scripts</div>
          <div className="text-2xl font-bold text-purple-900 mt-1">12</div>
        </div>
        <div className="border border-indigo-100 bg-indigo-50/30 rounded-2xl p-4">
          <div className="text-sm font-semibold text-indigo-800">In Review</div>
          <div className="text-2xl font-bold text-indigo-900 mt-1">4</div>
        </div>
        <div className="border border-green-100 bg-green-50/30 rounded-2xl p-4">
          <div className="text-sm font-semibold text-green-800">Approved Today</div>
          <div className="text-2xl font-bold text-green-900 mt-1">3</div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900 text-sm">Recent Work</h3>
        {contentItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between border border-gray-100 rounded-2xl p-4 hover:bg-gray-50 transition duration-200">
            <div className="flex items-center gap-3">
              {item.type === 'Script' ? <Video className="text-gray-400" size={18} /> : <Edit className="text-gray-400" size={18} />}
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">{item.title}</h4>
                <p className="text-xs text-gray-500 mt-0.5">{item.type}</p>
              </div>
            </div>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
              item.status === 'Approved' ? 'bg-green-100 text-green-800' :
              item.status === 'Drafting' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
            }`}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContentSection;
