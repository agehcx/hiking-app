'use client';

import { useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { type TripPlanData } from '@/lib/store/tripStore';

interface TripDetailsProps {
  tripData: TripPlanData;
}

export function TripDetails({ tripData }: TripDetailsProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'info' },
    { id: 'budget', label: 'Budget', icon: 'dollar-sign' },
    { id: 'preparation', label: 'Preparation', icon: 'luggage' },
    { id: 'permits', label: 'Permits & Safety', icon: 'shield' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6 border-b">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-t-lg transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white border-b-2 border-blue-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Icon name={tab.icon as 'info' | 'dollar-sign' | 'luggage' | 'shield'} className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{tripData.trip_plan.title}</h3>
              <p className="text-gray-600 leading-relaxed">{tripData.tripOverview}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Trip Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="font-medium">{tripData.query_params.duration} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Group Size:</span>
                    <span className="font-medium">{tripData.query_params.groupSize} people</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Budget Tier:</span>
                    <span className="font-medium">{tripData.query_params.budgetTier}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Theme:</span>
                    <span className="font-medium">{tripData.query_params.theme}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Preferences</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Accommodation:</span>
                    <span className="font-medium">{tripData.query_params.stayPref}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Transport:</span>
                    <span className="font-medium">{tripData.query_params.transportPref}</span>
                  </div>
                  <div className="mt-3">
                    <span className="text-gray-600">Interests:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {tripData.query_params.interests.map(interest => (
                        <span key={interest} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'budget' && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800">Total Budget</h3>
              <p className="text-3xl font-bold text-blue-600">฿{tripData.trip_plan.budget.total.toLocaleString()}</p>
              <p className="text-gray-600">for {tripData.query_params.groupSize} people</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(tripData.trip_plan.budget)
                .filter(([key]) => key !== 'total')
                .map(([category, amount]) => {
                  const percentage = ((amount / tripData.trip_plan.budget.total) * 100).toFixed(1);
                  return (
                    <div key={category} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium capitalize">{category.replace('_', ' ')}</span>
                        <span className="font-bold">฿{amount.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{percentage}% of total budget</p>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {activeTab === 'preparation' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Preparation Overview</h3>
              <p className="text-gray-600 leading-relaxed mb-4">{tripData.preparation.overview}</p>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <div className="flex items-center">
                  <Icon name="clock" className="w-5 h-5 text-yellow-600 mr-2" />
                  <p className="text-yellow-800 font-medium">
                    Recommended timeline: {tripData.preparation.timeline}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {tripData.preparation.items.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-3">{item.category}</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-sm font-medium text-gray-600 mb-2">Items needed:</h5>
                      <ul className="space-y-1">
                        {item.items.map((subItem, subIndex) => (
                          <li key={subIndex} className="flex items-center text-sm">
                            <Icon name="check" className="w-4 h-4 text-green-600 mr-2" />
                            {subItem}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-gray-600 mb-2">Notes:</h5>
                      <p className="text-sm text-gray-700 leading-relaxed">{item.notes}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'permits' && (
          <div className="space-y-6">
            {/* Permits Section */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Icon name="file-text" className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-bold text-gray-800">Permits Required</h3>
              </div>
              {tripData.trip_plan.permits.needed ? (
                <div className="space-y-2">
                  <div className="bg-red-50 border border-red-200 rounded p-3">
                    <p className="text-red-800 font-medium">⚠️ Permits Required</p>
                    <p className="text-red-700 text-sm mt-1">{tripData.trip_plan.permits.notes}</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded p-3">
                    <p className="text-blue-800 font-medium">🌤️ Best Season</p>
                    <p className="text-blue-700 text-sm mt-1">{tripData.trip_plan.permits.seasonal}</p>
                  </div>
                </div>
              ) : (
                <div className="bg-green-50 border border-green-200 rounded p-3">
                  <p className="text-green-800 font-medium">✅ No special permits required</p>
                </div>
              )}
            </div>

            {/* Safety Information */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Icon name="shield" className="w-5 h-5 text-red-600 mr-2" />
                <h3 className="text-lg font-bold text-gray-800">Safety Information</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 p-3 rounded">
                  <h4 className="font-medium text-gray-800 mb-2">Registration</h4>
                  <p className="text-sm text-gray-700">{tripData.trip_plan.safety.registration}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <h4 className="font-medium text-gray-800 mb-2">Check-ins</h4>
                  <p className="text-sm text-gray-700">{tripData.trip_plan.safety.checkins}</p>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded p-3 mb-4">
                <h4 className="font-medium text-red-800 mb-2">Emergency</h4>
                <p className="text-red-700 text-sm">Call {tripData.trip_plan.safety.sos} for emergencies</p>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 mb-3">Emergency Contacts</h4>
                <div className="grid md:grid-cols-3 gap-3">
                  {Object.entries(tripData.trip_plan.safety.contacts).map(([type, contact]) => (
                    <div key={type} className="border border-gray-200 rounded p-3">
                      <h5 className="font-medium text-gray-800 capitalize mb-1">{type}</h5>
                      <p className="text-sm text-gray-700 mb-1">{contact.name}</p>
                      <p className="text-sm font-mono text-blue-600">{contact.phone}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}