import React, { useState } from 'react';
import { DollarSign, Package, TrendingUp, Calendar, Users } from 'lucide-react';

interface OverviewProps {
  onNavigate: (tab: string) => void;
}

const Overview: React.FC<OverviewProps> = ({ onNavigate }) => {
  // Auto-update next salary date if current date has passed
  const getNextSalaryDate = () => {
    const today = new Date();
    const nextSalary = new Date('2025-08-25');
    if (today > nextSalary) {
      const newDate = new Date(today);
      newDate.setMonth(newDate.getMonth() + 1);
      newDate.setDate(25);
      return newDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
    return nextSalary.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Auto-update total earnings based on time
  const getTotalEarnings = () => {
    const baseEarnings = 170000;
    const today = new Date();
    const startDate = new Date('2025-01-01');
    const monthsPassed = (today.getFullYear() - startDate.getFullYear()) * 12 + (today.getMonth() - startDate.getMonth());
    return baseEarnings + (monthsPassed * 3500);
  };

  // Auto-update total products based on time
  const getTotalProducts = () => {
    const baseProducts = 847;
    const today = new Date();
    const dayOfMonth = today.getDate();
    return baseProducts + Math.floor(dayOfMonth * 2.5); // Simulate product growth
  };

  // Auto-update monthly growth
  const getMonthlyGrowth = () => {
    const today = new Date();
  const stats = [
    {
      title: 'Total Earnings',
      value: '₹1,70,000',
      subtitle: 'From Shippy',
      icon: DollarSign,
      color: 'bg-green-500',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Total Products',
      value: '847',
      subtitle: 'In Stock',
      icon: Package,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Monthly Growth',
      value: '+23.4%',
      subtitle: 'This Month',
      icon: TrendingUp,
      color: 'bg-purple-500',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Next Salary',
      value: '₹3,500',
      subtitle: 'Aug 25, 2025',
      icon: Calendar,
      color: 'bg-orange-500',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h2>
        <p className="text-gray-600">Welcome back! Here's what's happening with Shippy today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`${stat.bgColor} rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className={`text-2xl font-bold ${stat.textColor} mb-1`}>{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: 'Added new T-shirt stock', time: '2 hours ago', type: 'success' },
              { action: 'Updated shoe prices', time: '4 hours ago', type: 'info' },
              { action: 'Processed salary payment', time: '1 day ago', type: 'success' },
              { action: 'Added new watch collection', time: '2 days ago', type: 'info' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`h-3 w-3 rounded-full ${
                  activity.type === 'success' ? 'bg-green-400' : 'bg-blue-400'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => onNavigate('products')}
              className="p-4 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors duration-200 transform hover:scale-105"
            >
              <Package className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-blue-600">Add Product</p>
            </button>
            <button 
              onClick={() => onNavigate('salary')}
              className="p-4 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors duration-200 transform hover:scale-105"
            >
              <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-green-600">Update Salary</p>
            </button>
            <button 
              onClick={() => alert('Reports feature coming soon!')}
              className="p-4 bg-purple-50 rounded-lg border border-purple-200 hover:bg-purple-100 transition-colors duration-200 transform hover:scale-105"
            >
              <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-purple-600">View Reports</p>
            </button>
            <button 
              onClick={() => alert('Schedule feature coming soon!')}
              className="p-4 bg-orange-50 rounded-lg border border-orange-200 hover:bg-orange-100 transition-colors duration-200 transform hover:scale-105"
            >
              <Calendar className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-orange-600">Schedule</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;