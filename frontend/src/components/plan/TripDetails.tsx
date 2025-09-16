'use client';

import { Icon } from "@/components/ui/Icon";

interface TripDetailsProps {
  tripData: {
    tripOverview: string;
    query_params?: {
      start_place: string;
      destination: string;
      travelDates: string;
      duration: number;
      groupSize: number;
      interests: string[];
      budgetTier: string;
      trip_price: number;
      stayPref: string;
      transportPref: string;
      theme: string;
    };
    trip_plan: {
      title: string;
      date: string;
      timeline: Array<{
        day: number;
        activities: Array<{
          t: string;
          detail: string;
        }>;
      }>;
      spots: Array<{
        name: string;
        latitude?: number;
        longitude?: number;
        lat?: number;
        lng?: number;
        time: string;
        notes: string;
      }>;
      budget?: {
        transport: number;
        entrance: number;
        meals: number;
        accommodation: number;
        activities: number;
        total: number;
      };
      permits?: {
        needed: boolean;
        notes: string;
        seasonal?: string;
      };
      safety?: {
        registration: string;
        checkins: string;
        sos: string;
        contacts: {
          ranger?: { name: string; phone: string; };
          hospital?: { name: string; phone: string; };
          police?: { name: string; phone: string; };
        };
      };
    };
    preparation?: {
      overview: string;
      items: Array<{
        category: string;
        items: string[];
        notes: string;
      }>;
      timeline: string;
    };
  };
}

export function TripDetails({ tripData }: TripDetailsProps) {
  const { tripOverview, trip_plan, preparation, query_params } = tripData;

  return (
    <div className="space-y-8">
      {/* Trip Overview */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Icon name="map" className="w-5 h-5 text-blue-600" />
          Trip Overview
        </h3>
        <p className="text-gray-600 leading-relaxed">{tripOverview}</p>
      </div>

      {/* Trip Details */}
      {query_params && (
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Icon name="info" className="w-5 h-5 text-blue-600" />
            Trip Details
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <span className="font-medium text-gray-700">Duration:</span>
              <span className="ml-2 text-gray-600">{query_params.duration} days</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Group Size:</span>
              <span className="ml-2 text-gray-600">{query_params.groupSize} people</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Budget:</span>
              <span className="ml-2 text-gray-600">{query_params.budgetTier}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Transportation:</span>
              <span className="ml-2 text-gray-600">{query_params.transportPref}</span>
            </div>
          </div>
          {query_params.interests && query_params.interests.length > 0 && (
            <div className="mt-4">
              <span className="font-medium text-gray-700">Interests:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {query_params.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Budget Breakdown */}
      {trip_plan.budget && (
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Icon name="credit-card" className="w-5 h-5 text-green-600" />
            Budget Breakdown
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Transportation</span>
              <span className="font-medium">฿{trip_plan.budget.transport.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Accommodation</span>
              <span className="font-medium">฿{trip_plan.budget.accommodation.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Meals</span>
              <span className="font-medium">฿{trip_plan.budget.meals.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Activities</span>
              <span className="font-medium">฿{trip_plan.budget.activities.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Entrance Fees</span>
              <span className="font-medium">฿{trip_plan.budget.entrance.toLocaleString()}</span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between items-center text-lg font-bold">
                <span className="text-gray-800">Total</span>
                <span className="text-green-600">฿{trip_plan.budget.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preparation */}
      {preparation && (
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Icon name="package" className="w-5 h-5 text-purple-600" />
            Preparation Guide
          </h3>
          <p className="text-gray-600 mb-6">{preparation.overview}</p>
          
          <div className="space-y-6">
            {preparation.items.map((category, index) => (
              <div key={index} className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-bold text-gray-800 mb-2">{category.category}</h4>
                <ul className="space-y-1 mb-3">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-gray-600 flex items-center gap-2">
                      <Icon name="check" className="w-4 h-4 text-green-500" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-gray-500 italic">{category.notes}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Timeline:</strong> {preparation.timeline}
            </p>
          </div>
        </div>
      )}

      {/* Permits & Safety */}
      {(trip_plan.permits || trip_plan.safety) && (
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Icon name="shield" className="w-5 h-5 text-red-600" />
            Safety & Permits
          </h3>
          
          {trip_plan.permits && (
            <div className="mb-6">
              <h4 className="font-bold text-gray-800 mb-2">Permits Required</h4>
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 mb-2">
                  <strong>Status:</strong> {trip_plan.permits.needed ? 'Required' : 'Not Required'}
                </p>
                <p className="text-red-700">{trip_plan.permits.notes}</p>
                {trip_plan.permits.seasonal && (
                  <p className="text-red-600 text-sm mt-2">
                    <strong>Best time:</strong> {trip_plan.permits.seasonal}
                  </p>
                )}
              </div>
            </div>
          )}

          {trip_plan.safety && (
            <div>
              <h4 className="font-bold text-gray-800 mb-2">Safety Information</h4>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-800"><strong>Registration:</strong> {trip_plan.safety.registration}</p>
                </div>
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800"><strong>Check-ins:</strong> {trip_plan.safety.checkins}</p>
                </div>
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800"><strong>Emergency:</strong> {trip_plan.safety.sos}</p>
                </div>
                
                {trip_plan.safety.contacts && (
                  <div className="grid md:grid-cols-3 gap-3 mt-4">
                    {trip_plan.safety.contacts.ranger && (
                      <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                        <p className="font-medium text-gray-800">{trip_plan.safety.contacts.ranger.name}</p>
                        <p className="text-gray-600">{trip_plan.safety.contacts.ranger.phone}</p>
                      </div>
                    )}
                    {trip_plan.safety.contacts.hospital && (
                      <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                        <p className="font-medium text-gray-800">{trip_plan.safety.contacts.hospital.name}</p>
                        <p className="text-gray-600">{trip_plan.safety.contacts.hospital.phone}</p>
                      </div>
                    )}
                    {trip_plan.safety.contacts.police && (
                      <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                        <p className="font-medium text-gray-800">{trip_plan.safety.contacts.police.name}</p>
                        <p className="text-gray-600">{trip_plan.safety.contacts.police.phone}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Timeline */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Icon name="calendar" className="w-5 h-5 text-indigo-600" />
          Daily Timeline
        </h3>
        <div className="space-y-6">
          {trip_plan.timeline.map((day) => (
            <div key={day.day} className="border-l-4 border-indigo-500 pl-4">
              <h4 className="font-bold text-gray-800 mb-3">Day {day.day}</h4>
              <div className="space-y-2">
                {day.activities.map((activity, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <span className="text-sm font-medium text-indigo-600 min-w-[60px]">
                      {activity.t}
                    </span>
                    <span className="text-gray-600">{activity.detail}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Locations */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Icon name="map-pin" className="w-5 h-5 text-red-600" />
          Key Locations
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {trip_plan.spots.map((spot, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-bold text-gray-800 mb-2">{spot.name}</h4>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Time:</strong> {spot.time}
              </p>
              <p className="text-sm text-gray-600">{spot.notes}</p>
              {(spot.latitude || spot.lat) && (
                <p className="text-xs text-gray-500 mt-2">
                  📍 {spot.latitude || spot.lat}, {spot.longitude || spot.lng}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}