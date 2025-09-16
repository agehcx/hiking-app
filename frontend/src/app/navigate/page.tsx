'use client';

import { useState, useEffect } from "react";
import { TripMap } from "@/components/map/TripMap";
import { Icon } from "@/components/ui/Icon";
import { TripDetails } from "@/components/plan/TripDetails";
import { tripStore, type TripPlanData } from "@/lib/store/tripStore";

export default function NavigatePage() {
  const [currentDay, setCurrentDay] = useState(1);
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  const [tripData, setTripData] = useState<TripPlanData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'navigate' | 'preparation' | 'budget' | 'permits' | 'overview'>('navigate');

  useEffect(() => {
    // Load the latest trip plan from localStorage
    const latestTrip = tripStore.getLatestTripPlan();
    if (latestTrip) {
      setTripData(latestTrip);
    }
    setLoading(false);
  }, []);

  // Fallback to mock data if no trip plan is found
  const getMockTripData = () => ({
    tripOverview: "This 5-day cultural exploration trip from Chiang Mai to Doi Luang Chiang Dao offers a unique blend of cultural immersion and natural beauty. The journey begins in Chiang Mai, exploring its rich cultural heritage through temples and local markets, before heading to Doi Luang Chiang Dao, Thailand's third-highest peak, for a hike amidst stunning limestone landscapes.",
    trip_plan: {
      title: "5-day Cultural Exploration trip to Doi luang chiang dao",
      date: "2025-12-24 to 2025-12-28",
      timeline: [
        {
          day: 1,
          activities: [
            { t: "08:30", detail: "Pick up rental car in Chiang Mai" },
            { t: "09:30", detail: "Visit Wat Phra That Doi Suthep" },
            { t: "12:00", detail: "Lunch at local restaurant" },
            { t: "14:00", detail: "Explore Chiang Mai Night Bazaar" },
            { t: "18:00", detail: "Dinner and overnight at boutique hotel" }
          ]
        },
        {
          day: 2,
          activities: [
            { t: "08:00", detail: "Drive to Chiang Dao town" },
            { t: "10:00", detail: "Visit Chiang Dao Cave" },
            { t: "12:00", detail: "Lunch at local restaurant" },
            { t: "14:00", detail: "Check-in at accommodation near hiking trail" },
            { t: "18:00", detail: "Dinner and preparation for hike" }
          ]
        },
        {
          day: 3,
          activities: [
            { t: "06:00", detail: "Start hike to Doi Luang Chiang Dao summit" },
            { t: "12:00", detail: "Lunch at campsite" },
            { t: "14:00", detail: "Continue hike and set up camp" },
            { t: "18:00", detail: "Dinner and rest at campsite" }
          ]
        },
        {
          day: 4,
          activities: [
            { t: "05:00", detail: "Sunrise at summit" },
            { t: "08:00", detail: "Begin descent" },
            { t: "12:00", detail: "Lunch at trailhead" },
            { t: "14:00", detail: "Return to Chiang Dao town" },
            { t: "18:00", detail: "Dinner and overnight at boutique hotel" }
          ]
        },
        {
          day: 5,
          activities: [
            { t: "08:00", detail: "Drive back to Chiang Mai" },
            { t: "10:00", detail: "Visit local handicraft market" },
            { t: "12:00", detail: "Lunch and farewell dinner" },
            { t: "14:00", detail: "Return rental car" }
          ]
        }
      ],
      spots: [
        {
          name: "Wat Phra That Doi Suthep",
          time: "09:30-11:45",
          notes: "Iconic temple with stunning views",
          latitude: 18.79,
          longitude: 98.99
        },
        {
          name: "Chiang Dao Cave",
          time: "10:00-12:00",
          notes: "Explore limestone cave system",
          latitude: 19.3969,
          longitude: 98.8896
        },
        {
          name: "Doi Luang Chiang Dao Summit",
          time: "06:00-08:00",
          notes: "Panoramic views of surrounding landscape",
          latitude: 19.3969,
          longitude: 98.8896
        }
      ]
    }
  });

  // Use loaded trip data or fallback to mock data
  const displayData = tripData || getMockTripData();
  
  // Ensure spots have coordinates for the map, handling both formats
  const spotsWithCoords = displayData.trip_plan.spots.map(spot => ({
    ...spot,
    lat: (spot as { lat?: number; latitude?: number }).lat || (spot as { lat?: number; latitude?: number }).latitude || 19.3667, // Handle both lat and latitude fields
    lng: (spot as { lng?: number; longitude?: number }).lng || (spot as { lng?: number; longitude?: number }).longitude || 99.2167  // Handle both lng and longitude fields
  }));

  // Get current day's activities
  const currentDayData = displayData.trip_plan.timeline.find(day => day.day === currentDay);
  const currentActivities = currentDayData?.activities || [];
  const totalActivities = currentActivities.length;
  const currentActivity = currentActivities[currentActivityIndex];

  // Navigation functions
  const goToNextStep = () => {
    if (currentActivityIndex < totalActivities - 1) {
      setCurrentActivityIndex(currentActivityIndex + 1);
    } else if (currentDay < displayData.trip_plan.timeline.length) {
      setCurrentDay(currentDay + 1);
      setCurrentActivityIndex(0);
    }
  };

  const goToPreviousStep = () => {
    if (currentActivityIndex > 0) {
      setCurrentActivityIndex(currentActivityIndex - 1);
    } else if (currentDay > 1) {
      setCurrentDay(currentDay - 1);
      const prevDayData = displayData.trip_plan.timeline.find(day => day.day === currentDay - 1);
      setCurrentActivityIndex((prevDayData?.activities.length || 1) - 1);
    }
  };

  // Calculate total steps
  const getCurrentStep = () => {
    let currentStepNumber = 0;
    
    for (const day of displayData.trip_plan.timeline) {
      if (day.day < currentDay) {
        currentStepNumber += day.activities.length;
      } else if (day.day === currentDay) {
        currentStepNumber += currentActivityIndex + 1;
        break;
      }
    }
    
    const totalStepsInTrip = displayData.trip_plan.timeline.reduce((sum, day) => sum + day.activities.length, 0);
    return { current: currentStepNumber, total: totalStepsInTrip };
  };

  const stepInfo = getCurrentStep();

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading trip data...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-16">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center gap-2">
          <Icon
            name="compass"
            size={20}
            className="text-[var(--color-primary-600)]"
          />
          <h1 className="text-xl font-bold text-[var(--color-foreground)]">
            Navigate
          </h1>
        </div>
      </div>

      {/* Trip Overview Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {displayData.trip_plan.title}
          </h1>
          <p className="text-gray-600 mb-4">{displayData.tripOverview}</p>
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
              📅 {displayData.trip_plan.date}
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
              📍 {spotsWithCoords.length} locations
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full">
              ⏱️ Step {stepInfo.current} of {stepInfo.total}
            </span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex overflow-x-auto scrollbar-hide">
            {[
              { id: 'navigate' as const, label: 'Navigate', icon: 'compass' },
              { id: 'preparation' as const, label: 'Preparation', icon: 'package' },
              { id: 'budget' as const, label: 'Budget', icon: 'credit-card' },
              { id: 'permits' as const, label: 'Permits & Safety', icon: 'shield' },
              { id: 'overview' as const, label: 'Overview', icon: 'map' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-3 border-b-2 transition-colors whitespace-nowrap text-sm sm:text-base ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                <span className="font-medium hidden sm:block">{tab.label}</span>
                <span className="font-medium sm:hidden">
                  {tab.label === 'Permits & Safety' ? 'Permits' : tab.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'navigate' && (
          <div className="space-y-6">
            {!tripData && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-amber-700">
                  <Icon name="alert-triangle" size={16} />
                  <span className="font-medium">No saved trip plan found</span>
                </div>
                <p className="text-sm text-amber-600 mt-1">
                  Showing sample data. <a href="/plan" className="underline">Create your trip plan</a> for a personalized experience.
                </p>
              </div>
            )}

            {/* Mobile Layout */}
            <div className="lg:hidden space-y-4">
              {/* Map Container - Mobile (Clean, no overlays) */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden relative z-10">
                <div className="h-80 sm:h-96">
                  <TripMap
                    spots={spotsWithCoords}
                    timeline={displayData.trip_plan.timeline}
                    currentDay={currentDay}
                    currentActivityIndex={currentActivityIndex}
                    currentProgressIndex={stepInfo.current - 1}
                  />
                </div>
              </div>

              {/* Progress Bar - Mobile */}
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Progress</span>
                  <span className="text-sm text-gray-500">{stepInfo.current} / {stepInfo.total}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(stepInfo.current / stepInfo.total) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Trip Progress - Mobile */}
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <Icon name="map-pin" className="w-5 h-5 text-red-600" />
                  Trip Progress
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Current Location:</span>
                    <span className="font-semibold text-red-600">
                      Step {stepInfo.current} of {stepInfo.total}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-red-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(stepInfo.current / stepInfo.total) * 100}%` }}
                    ></div>
                  </div>
                  {currentActivity && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-xs font-mono text-red-700">{currentActivity.t}</span>
                      </div>
                      <p className="text-sm text-red-900">You should be: {currentActivity.detail}</p>
                      <div className="text-xs text-red-600 mt-1">
                        📍 Expected position on route
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Current Step Progress - Mobile */}
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-bold">Day {currentDay} - Step {stepInfo.current} of {stepInfo.total}</h2>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={goToPreviousStep}
                      disabled={currentDay === 1 && currentActivityIndex === 0}
                      className="p-2 text-gray-600 disabled:opacity-50"
                    >
                      <Icon name="chevron-left" size={16} />
                    </button>
                    <button
                      onClick={goToNextStep}
                      disabled={stepInfo.current >= stepInfo.total}
                      className="p-2 text-blue-600 disabled:opacity-50"
                    >
                      <Icon name="chevron-right" size={16} />
                    </button>
                  </div>
                </div>

                {/* Current Activity */}
                {currentActivity && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-xs font-mono text-blue-700">{currentActivity.t}</span>
                    </div>
                    <p className="text-sm text-blue-900">{currentActivity.detail}</p>
                  </div>
                )}
              </div>

              {/* Day Timeline - Mobile */}
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-lg">Day {currentDay} Timeline</h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentDay(Math.max(1, currentDay - 1))}
                      disabled={currentDay === 1}
                      className="p-1 text-gray-600 disabled:opacity-50"
                    >
                      <Icon name="chevron-left" size={16} />
                    </button>
                    <span className="text-sm text-gray-500">
                      {currentDay} / {displayData.trip_plan.timeline.length}
                    </span>
                    <button
                      onClick={() => setCurrentDay(Math.min(displayData.trip_plan.timeline.length, currentDay + 1))}
                      disabled={currentDay === displayData.trip_plan.timeline.length}
                      className="p-1 text-gray-600 disabled:opacity-50"
                    >
                      <Icon name="chevron-right" size={16} />
                    </button>
                  </div>
                </div>

                {/* Activities List - Mobile */}
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {currentActivities.map((activity, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-3 p-3 rounded-lg border text-sm ${
                        index === currentActivityIndex
                          ? "bg-blue-100 border-blue-300"
                          : index < currentActivityIndex
                          ? "bg-green-50 border-green-200 opacity-75"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="font-mono text-xs w-12 flex-shrink-0">
                        {activity.t}
                      </div>
                      <div className="flex-1">
                        {activity.detail}
                      </div>
                      {index === currentActivityIndex && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                      )}
                      {index < currentActivityIndex && (
                        <Icon name="check" size={12} className="text-green-600 flex-shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:block">
              <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                {/* Map Column */}
                <div className="xl:col-span-3">
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden relative z-10">
                    {/* Current Step Progress - Desktop */}
                    <div className="p-4 bg-gray-50 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <h2 className="text-lg font-bold">Day {currentDay} - Step {stepInfo.current} of {stepInfo.total}</h2>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={goToPreviousStep}
                              disabled={currentDay === 1 && currentActivityIndex === 0}
                              className="flex items-center gap-2 px-3 py-1.5 bg-gray-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors text-sm"
                            >
                              <Icon name="chevron-left" size={14} />
                              Previous
                            </button>
                            <button
                              onClick={goToNextStep}
                              disabled={stepInfo.current >= stepInfo.total}
                              className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors text-sm"
                            >
                              Next
                              <Icon name="chevron-right" size={14} />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Current Activity Display */}
                      {currentActivity && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-3">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="font-mono text-sm text-blue-700">{currentActivity.t}</span>
                            <span className="text-xs text-gray-500">Day {currentDay}</span>
                          </div>
                          <p className="text-sm text-blue-900">{currentActivity.detail}</p>
                        </div>
                      )}
                    </div>

                    {/* Map */}
                    <div className="h-[32rem] xl:h-[36rem]">
                      <TripMap
                        spots={spotsWithCoords}
                        timeline={displayData.trip_plan.timeline}
                        currentDay={currentDay}
                        currentActivityIndex={currentActivityIndex}
                        currentProgressIndex={stepInfo.current - 1}
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column - Trip Progress & Day Timeline */}
                <div className="space-y-6 xl:col-span-1">
                  {/* Trip Progress - Desktop */}
                  <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                      <Icon name="map-pin" className="w-5 h-5 text-red-600" />
                      Trip Progress
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Current Location:</span>
                        <span className="font-semibold text-red-600">
                          Step {stepInfo.current} of {stepInfo.total}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-red-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(stepInfo.current / stepInfo.total) * 100}%` }}
                        ></div>
                      </div>
                      {currentActivity && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            <span className="text-xs font-mono text-red-700">{currentActivity.t}</span>
                          </div>
                          <p className="text-sm text-red-900">You should be: {currentActivity.detail}</p>
                          <div className="text-xs text-red-600 mt-1">
                            📍 Expected position on route
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-lg">Day {currentDay} Timeline</h3>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setCurrentDay(Math.max(1, currentDay - 1))}
                          disabled={currentDay === 1}
                          className="p-1 text-gray-600 disabled:opacity-50"
                        >
                          <Icon name="chevron-left" size={16} />
                        </button>
                        <span className="text-sm text-gray-500">
                          {currentDay} / {displayData.trip_plan.timeline.length}
                        </span>
                        <button
                          onClick={() => setCurrentDay(Math.min(displayData.trip_plan.timeline.length, currentDay + 1))}
                          disabled={currentDay === displayData.trip_plan.timeline.length}
                          className="p-1 text-gray-600 disabled:opacity-50"
                        >
                          <Icon name="chevron-right" size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Activities List */}
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {currentActivities.map((activity, index) => (
                        <div
                          key={index}
                          className={`flex items-center gap-3 p-3 rounded-lg border text-sm cursor-pointer ${
                            index === currentActivityIndex
                              ? "bg-blue-100 border-blue-300"
                              : index < currentActivityIndex
                              ? "bg-green-50 border-green-200 opacity-75"
                              : "bg-gray-50 border-gray-200"
                          }`}
                          onClick={() => setCurrentActivityIndex(index)}
                        >
                          <div className="font-mono text-xs w-12 flex-shrink-0">
                            {activity.t}
                          </div>
                          <div className="flex-1">
                            {activity.detail}
                          </div>
                          {index === currentActivityIndex && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                          )}
                          {index < currentActivityIndex && (
                            <Icon name="check" size={12} className="text-green-600 flex-shrink-0" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <h3 className="font-bold text-lg mb-3">Trip Stats</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Total Distance:</span>
                        <span className="font-semibold">~45 km</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Duration:</span>
                        <span className="font-semibold">5 days</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Spots to Visit:</span>
                        <span className="font-semibold">
                          {spotsWithCoords.length}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Difficulty:</span>
                        <span className="font-semibold text-orange-600">
                          Intermediate
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <h3 className="font-bold text-lg mb-3">Map Legend</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                        <span>Starting Point</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                        <span>Current Location</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                        <span>Visited</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                        <span>Upcoming</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-1 bg-blue-500"></div>
                        <span>Route Path</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Preparation Tab */}
        {activeTab === 'preparation' && tripData?.preparation && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Icon name="package" className="w-5 h-5 text-purple-600" />
                Preparation Guide
              </h3>
              <p className="text-gray-600 mb-6">{tripData.preparation.overview}</p>
              
              <div className="space-y-6">
                {tripData.preparation.items.map((category, index) => (
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
                  <strong>Timeline:</strong> {tripData.preparation.timeline}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Budget Tab */}
        {activeTab === 'budget' && (
          <div className="space-y-6">
            {tripData?.trip_plan?.budget ? (
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Icon name="credit-card" className="w-5 h-5 text-green-600" />
                  Budget Breakdown
                </h3>
                
                {/* Budget Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-700">฿{tripData.trip_plan.budget.total.toLocaleString()}</div>
                    <div className="text-sm text-green-600">Total Budget</div>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-700">฿{Math.round(tripData.trip_plan.budget.total / 2).toLocaleString()}</div>
                    <div className="text-sm text-blue-600">Per Person (2 people)</div>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <div className="text-2xl font-bold text-purple-700">6 Days</div>
                    <div className="text-sm text-purple-600">Duration</div>
                  </div>
                </div>

                {/* Budget Categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">By Category</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-blue-500 rounded"></div>
                          <span className="text-gray-700">Accommodation</span>
                        </div>
                        <span className="font-semibold">฿{tripData.trip_plan.budget.accommodation?.toLocaleString() || '0'} ({Math.round(((tripData.trip_plan.budget.accommodation || 0) / tripData.trip_plan.budget.total) * 100)}%)</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-green-500 rounded"></div>
                          <span className="text-gray-700">Meals & Dining</span>
                        </div>
                        <span className="font-semibold">฿{tripData.trip_plan.budget.meals?.toLocaleString() || '0'} ({Math.round(((tripData.trip_plan.budget.meals || 0) / tripData.trip_plan.budget.total) * 100)}%)</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                          <span className="text-gray-700">Transportation</span>
                        </div>
                        <span className="font-semibold">฿{tripData.trip_plan.budget.transport?.toLocaleString() || '0'} ({Math.round(((tripData.trip_plan.budget.transport || 0) / tripData.trip_plan.budget.total) * 100)}%)</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-purple-500 rounded"></div>
                          <span className="text-gray-700">Activities</span>
                        </div>
                        <span className="font-semibold">฿{tripData.trip_plan.budget.activities?.toLocaleString() || '0'} ({Math.round(((tripData.trip_plan.budget.activities || 0) / tripData.trip_plan.budget.total) * 100)}%)</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-red-500 rounded"></div>
                          <span className="text-gray-700">Entrance Fees</span>
                        </div>
                        <span className="font-semibold">฿{tripData.trip_plan.budget.entrance?.toLocaleString() || '0'} ({Math.round(((tripData.trip_plan.budget.entrance || 0) / tripData.trip_plan.budget.total) * 100)}%)</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Budget Tips</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-2">
                        <Icon name="check" className="w-4 h-4 text-green-500 mt-0.5" />
                        <span className="text-gray-600">Book accommodations 2-3 weeks in advance for better rates</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Icon name="check" className="w-4 h-4 text-green-500 mt-0.5" />
                        <span className="text-gray-600">Local restaurants cost 50-70% less than tourist areas</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Icon name="check" className="w-4 h-4 text-green-500 mt-0.5" />
                        <span className="text-gray-600">Group bookings can reduce per-person costs</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Icon name="check" className="w-4 h-4 text-green-500 mt-0.5" />
                        <span className="text-gray-600">Set aside 10-15% for unexpected expenses</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Daily Average */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-gray-800">Daily Average</h4>
                      <p className="text-sm text-gray-600">Total budget divided by trip duration</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-700">฿{Math.round(tripData.trip_plan.budget.total / 6).toLocaleString()}</div>
                      <div className="text-sm text-gray-600">per day</div>
                    </div>
                  </div>
                </div>

                {/* Emergency Fund */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <h4 className="font-semibold text-amber-800 mb-2">💡 Recommended Emergency Fund</h4>
                  <p className="text-sm text-amber-700">
                    Consider setting aside an additional <strong>฿{Math.round(tripData.trip_plan.budget.total * 0.15).toLocaleString()}</strong> (15% of total budget) for unexpected expenses like weather delays, medical needs, or spontaneous activities.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Icon name="credit-card" className="w-5 h-5 text-green-600" />
                  Budget Information
                </h3>
                <p className="text-gray-600 mb-4">Budget details will be available when trip plan includes budget breakdown.</p>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-sm text-gray-600">
                    No budget data available for this trip plan.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Permits & Safety Tab */}
        {activeTab === 'permits' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Icon name="shield" className="w-5 h-5 text-blue-600" />
                Permits & Safety Information
              </h3>
              <p className="text-gray-600 mb-4">
                Permits and safety information will be available when your trip plan includes these details.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> Always check current permit requirements and safety guidelines for your destination before traveling.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Trip Details Tab */}
        {activeTab === 'overview' && tripData && (
          <div className="space-y-6">
            <TripDetails tripData={tripData} />
          </div>
        )}

        {/* Fallback content for when no trip data is available */}
        {!tripData && (activeTab === 'preparation' || activeTab === 'budget' || activeTab === 'permits' || activeTab === 'overview') && (
          <div className="space-y-6">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 text-center">
              <Icon name="alert-triangle" className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-amber-800 mb-2">No Trip Plan Available</h3>
              <p className="text-amber-700 mb-4">
                Create a trip plan to access detailed preparation guides, budget breakdowns, and safety information.
              </p>
              <a 
                href="/plan" 
                className="inline-flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
              >
                <Icon name="plus" size={16} />
                Create Trip Plan
              </a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}