import React from 'react';
import { Palette, Image, Film, Sparkles } from 'lucide-react';

function CreativeSection() {
  const creativeItems = [
    { id: 1, title: 'Ad Banner: NEET Prep Campaign', type: 'Design', status: 'Completed' },
    { id: 2, title: 'Reel: JEE Strategy Video', type: 'Video', status: 'Rendering' },
    { id: 3, title: 'Thumbnail: Django Tutorial', type: 'Thumbnail', status: 'In Review' },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-pink-100 p-2 rounded-xl text-pink-600">
          <Palette size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Creative Department Portal</h2>
          <p className="text-sm text-gray-500">Manage designs, video editing, and animations</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="border border-pink-100 bg-pink-50/30 rounded-2xl p-4">
          <div className="text-sm font-semibold text-pink-800">Designs Active</div>
          <div className="text-2xl font-bold text-pink-900 mt-1">8</div>
        </div>
        <div className="border border-rose-100 bg-rose-50/30 rounded-2xl p-4">
          <div className="text-sm font-semibold text-rose-800">Videos Rendering</div>
          <div className="text-2xl font-bold text-rose-900 mt-1">2</div>
        </div>
        <div className="border border-amber-100 bg-amber-50/30 rounded-2xl p-4">
          <div className="text-sm font-semibold text-amber-850">Awaiting Feedback</div>
          <div className="text-2xl font-bold text-amber-900 mt-1">5</div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900 text-sm">Recent Visual Assets</h3>
        {creativeItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between border border-gray-100 rounded-2xl p-4 hover:bg-gray-50 transition duration-200">
            <div className="flex items-center gap-3">
              {item.type === 'Video' ? <Film className="text-gray-400" size={18} /> : <Image className="text-gray-400" size={18} />}
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">{item.title}</h4>
                <p className="text-xs text-gray-500 mt-0.5">{item.type}</p>
              </div>
            </div>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
              item.status === 'Completed' ? 'bg-green-100 text-green-800' :
              item.status === 'Rendering' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
            }`}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CreativeSection;
