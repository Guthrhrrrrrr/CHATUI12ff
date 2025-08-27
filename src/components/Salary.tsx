import React, { useState, useEffect } from 'react';
import { Edit2, Save, X, Calendar, DollarSign } from 'lucide-react';

interface SalaryData {
  currentSalary: number;
  nextSalaryDate: string;
  nextSalaryAmount: number;
  totalEarnings: number;
  lastUpdate: string;
}

const Salary: React.FC = () => {
  const [salaryData, setSalaryData] = useState<SalaryData>({
    currentSalary: 45000,
    nextSalaryDate: '2025-08-25',
    nextSalaryAmount: 3500,
    totalEarnings: 170000,
    lastUpdate: new Date().toISOString().split('T')[0]
  });
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValues, setTempValues] = useState<Partial<SalaryData>>({});

  useEffect(() => {
    const savedSalaryData = localStorage.getItem('shippy_salary');
    if (savedSalaryData) {
      setSalaryData(JSON.parse(savedSalaryData));
    } else {
      localStorage.setItem('shippy_salary', JSON.stringify(salaryData));
    }
  }, []);

  const saveSalaryData = (updatedData: SalaryData) => {
    setSalaryData(updatedData);
    localStorage.setItem('shippy_salary', JSON.stringify(updatedData));
  };

  const handleEdit = (field: string) => {
    setEditingField(field);
    setTempValues({ [field]: salaryData[field as keyof SalaryData] });
  };

  const handleSave = (field: string) => {
    if (tempValues[field as keyof SalaryData] !== undefined) {
      const updatedData = {
        ...salaryData,
        [field]: tempValues[field as keyof SalaryData],
        lastUpdate: new Date().toISOString().split('T')[0]
      };
      saveSalaryData(updatedData);
    }
    setEditingField(null);
    setTempValues({});
  };

  const handleCancel = () => {
    setEditingField(null);
    setTempValues({});
  };

  const getDaysUntilNextSalary = () => {
    const today = new Date();
    const nextSalary = new Date(salaryData.nextSalaryDate);
    const diffTime = nextSalary.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntilSalary = getDaysUntilNextSalary();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Salary Management</h2>
        <p className="text-gray-600">Manage salary information and track earnings from Shippy.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="h-8 w-8" />
            {editingField === 'totalEarnings' ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleSave('totalEarnings')}
                  className="text-white hover:text-green-200 transition-colors duration-200"
                >
                  <Save className="h-4 w-4" />
                </button>
                <button
                  onClick={handleCancel}
                  className="text-white hover:text-green-200 transition-colors duration-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleEdit('totalEarnings')}
                className="text-white hover:text-green-200 transition-colors duration-200"
              >
                <Edit2 className="h-4 w-4" />
              </button>
            )}
          </div>
          <div>
            <p className="text-green-100 text-sm mb-1">Total Earnings</p>
            {editingField === 'totalEarnings' ? (
              <input
                type="number"
                value={tempValues.totalEarnings || ''}
                onChange={(e) => setTempValues({ ...tempValues, totalEarnings: parseFloat(e.target.value) || 0 })}
                className="bg-transparent text-2xl font-bold text-white border-b border-green-200 focus:outline-none focus:border-white w-full"
                autoFocus
              />
            ) : (
              <p className="text-2xl font-bold">₹{salaryData.totalEarnings.toLocaleString()}</p>
            )}
            <p className="text-green-100 text-sm mt-1">From Shippy</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="h-8 w-8" />
            {editingField === 'currentSalary' ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleSave('currentSalary')}
                  className="text-white hover:text-blue-200 transition-colors duration-200"
                >
                  <Save className="h-4 w-4" />
                </button>
                <button
                  onClick={handleCancel}
                  className="text-white hover:text-blue-200 transition-colors duration-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleEdit('currentSalary')}
                className="text-white hover:text-blue-200 transition-colors duration-200"
              >
                <Edit2 className="h-4 w-4" />
              </button>
            )}
          </div>
          <div>
            <p className="text-blue-100 text-sm mb-1">Current Salary</p>
            {editingField === 'currentSalary' ? (
              <input
                type="number"
                value={tempValues.currentSalary || ''}
                onChange={(e) => setTempValues({ ...tempValues, currentSalary: parseFloat(e.target.value) || 0 })}
                className="bg-transparent text-2xl font-bold text-white border-b border-blue-200 focus:outline-none focus:border-white w-full"
                autoFocus
              />
            ) : (
              <p className="text-2xl font-bold">₹{salaryData.currentSalary.toLocaleString()}</p>
            )}
            <p className="text-blue-100 text-sm mt-1">Monthly</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Calendar className="h-8 w-8" />
            {editingField === 'nextSalaryDate' ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleSave('nextSalaryDate')}
                  className="text-white hover:text-purple-200 transition-colors duration-200"
                >
                  <Save className="h-4 w-4" />
                </button>
                <button
                  onClick={handleCancel}
                  className="text-white hover:text-purple-200 transition-colors duration-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleEdit('nextSalaryDate')}
                className="text-white hover:text-purple-200 transition-colors duration-200"
              >
                <Edit2 className="h-4 w-4" />
              </button>
            )}
          </div>
          <div>
            <p className="text-purple-100 text-sm mb-1">Next Salary</p>
            {editingField === 'nextSalaryDate' ? (
              <input
                type="date"
                value={tempValues.nextSalaryDate || ''}
                onChange={(e) => setTempValues({ ...tempValues, nextSalaryDate: e.target.value })}
                className="bg-transparent text-xl font-bold text-white border-b border-purple-200 focus:outline-none focus:border-white w-full mb-2"
                autoFocus
              />
            ) : (
              <p className="text-xl font-bold">
                {new Date(salaryData.nextSalaryDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            )}
            <p className="text-lg font-semibold text-purple-100 mt-1">₹{salaryData.nextSalaryAmount.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="h-8 w-8" />
            {editingField === 'nextSalaryAmount' ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleSave('nextSalaryAmount')}
                  className="text-white hover:text-indigo-200 transition-colors duration-200"
                >
                  <Save className="h-4 w-4" />
                </button>
                <button
                  onClick={handleCancel}
                  className="text-white hover:text-indigo-200 transition-colors duration-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleEdit('nextSalaryAmount')}
                className="text-white hover:text-indigo-200 transition-colors duration-200"
              >
                <Edit2 className="h-4 w-4" />
              </button>
            )}
          </div>
          <div>
            <p className="text-indigo-100 text-sm mb-1">Next Salary Amount</p>
            {editingField === 'nextSalaryAmount' ? (
              <input
                type="number"
                value={tempValues.nextSalaryAmount || ''}
                onChange={(e) => setTempValues({ ...tempValues, nextSalaryAmount: parseFloat(e.target.value) || 0 })}
                className="bg-transparent text-2xl font-bold text-white border-b border-indigo-200 focus:outline-none focus:border-white w-full"
                autoFocus
              />
            ) : (
              <p className="text-2xl font-bold">₹{salaryData.nextSalaryAmount.toLocaleString()}</p>
            )}
            <p className="text-indigo-100 text-sm mt-1">Editable Amount</p>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center mb-4">
            <Calendar className="h-8 w-8" />
          </div>
          <div>
            <p className="text-orange-100 text-sm mb-1">Days Until Salary</p>
            <p className="text-2xl font-bold">
              {daysUntilSalary > 0 ? daysUntilSalary : 'Due Today!'}
            </p>
            <p className="text-orange-100 text-sm mt-1">
              {daysUntilSalary > 0 ? 'Days remaining' : 'Payment due'}
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl p-6 text-white">
          <div className="flex items-center mb-4">
            <DollarSign className="h-8 w-8" />
          </div>
          <div>
            <p className="text-teal-100 text-sm mb-1">Salary Progress</p>
            <p className="text-2xl font-bold">
              {Math.round(((30 - Math.max(daysUntilSalary, 0)) / 30) * 100)}%
            </p>
            <p className="text-teal-100 text-sm mt-1">Monthly Progress</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Salary History</h3>
          <div className="space-y-4">
            {[
              { month: 'July 2025', amount: 3500, status: 'Paid', date: '2025-07-25' },
              { month: 'June 2025', amount: 3500, status: 'Paid', date: '2025-06-25' },
              { month: 'May 2025', amount: 3500, status: 'Paid', date: '2025-05-25' },
              { month: 'April 2025', amount: 3500, status: 'Paid', date: '2025-04-25' },
            ].map((record, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{record.month}</p>
                  <p className="text-sm text-gray-500">Paid on {record.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">₹{record.amount.toLocaleString()}</p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {record.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Salary Information</h3>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-2">Current Salary Details</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-blue-700">Base Salary:</span>
                  <span className="text-sm font-medium text-blue-900">₹{salaryData.currentSalary.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-blue-700">Next Salary:</span>
                  <span className="text-sm font-medium text-blue-900">₹{salaryData.nextSalaryAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-blue-700">Next Date:</span>
                  <span className="text-sm font-medium text-blue-900">
                    {new Date(salaryData.nextSalaryDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-blue-700">Currency:</span>
                  <span className="text-sm font-medium text-blue-900">INR (₹)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-blue-700">Payment Cycle:</span>
                  <span className="text-sm font-medium text-blue-900">Monthly</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-900 mb-2">Earnings Summary</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-green-700">Total from Shippy:</span>
                  <span className="text-sm font-medium text-green-900">₹{salaryData.totalEarnings.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-green-700">Average Monthly:</span>
                  <span className="text-sm font-medium text-green-900">₹{Math.round(salaryData.totalEarnings / 5).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-green-700">Last Updated:</span>
                  <span className="text-sm font-medium text-green-900">
                    {new Date(salaryData.lastUpdate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Salary;