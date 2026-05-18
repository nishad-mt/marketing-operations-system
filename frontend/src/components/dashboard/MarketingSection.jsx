import React from 'react';
import { Megaphone, BarChart3, Target, Globe } from 'lucide-react';

function MarketingSection() {
  const marketingItems = [
    { id: 1, campaign: 'JEE Main Phase 2 Ad Set', platform: 'Meta Ads', status: 'Active', spend: '$1,200' },
    { id: 2, campaign: 'NEET Scholarship Post', platform: 'Instagram', status: 'Scheduled', spend: '$0' },
    { id: 3, campaign: 'B2B School Lead Gen Campaign', platform: 'LinkedIn Ads', status: 'Paused', spend: '$450' },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-emerald-100 p-2 rounded-xl text-emerald-600">
          <Megaphone size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Marketing & Performance Portal</h2>
          <p className="text-sm text-gray-500">Track and manage advertising campaigns and social media channels</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="border border-emerald-100 bg-emerald-50/30 rounded-2xl p-4">
          <div className="text-sm font-semibold text-emerald-800">Active Campaigns</div>
          <div className="text-2xl font-bold text-emerald-900 mt-1">4</div>
        </div>
        <div className="border border-blue-100 bg-blue-50/30 rounded-2xl p-4">
          <div className="text-sm font-semibold text-blue-800">Monthly Ad Spend</div>
          <div className="text-2xl font-bold text-blue-900 mt-1">$4,650</div>
        </div>
        <div className="border border-purple-100 bg-purple-50/30 rounded-2xl p-4">
          <div className="text-sm font-semibold text-purple-800">Total Leads</div>
          <div className="text-2xl font-bold text-purple-900 mt-1">1,480</div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900 text-sm">Campaign Performances</h3>
        {marketingItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between border border-gray-100 rounded-2xl p-4 hover:bg-gray-50 transition duration-200">
            <div className="flex items-center gap-3">
              <Globe className="text-gray-400" size={18} />
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">{item.campaign}</h4>
                <p className="text-xs text-gray-500 mt-0.5">{item.platform} • Budget Spent: {item.spend}</p>
              </div>
            </div>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
              item.status === 'Active' ? 'bg-green-100 text-green-800' :
              item.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MarketingSection;
