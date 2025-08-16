'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';

export default function PlanPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedTripType, setSelectedTripType] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [nights, setNights] = useState(2);
  const [hikers, setHikers] = useState(2);
  const [language, setLanguage] = useState('English');

  const regions = [
    {
      id: 'northern',
      name: 'Northern Thailand',
      icon: '🏔️',
      description: 'Mountains, hill tribes, and cooler climate',
      destinations: ['Chiang Mai', 'Chiang Rai', 'Mae Hong Son', 'Pai', 'Doi Inthanon']
    },
    {
      id: 'central',
      name: 'Central Thailand',
      icon: '🏛️',
      description: 'Historic sites, temples, and cultural heritage',
      destinations: ['Bangkok', 'Ayutthaya', 'Lopburi', 'Kanchanaburi', 'Erawan National Park']
    },
    {
      id: 'southern',
      name: 'Southern Thailand',
      icon: '🏝️',
      description: 'Islands, beaches, and tropical paradise',
      destinations: ['Phuket', 'Krabi', 'Koh Samui', 'Koh Phi Phi', 'Khao Sok National Park']
    }
  ];

  const tripTypes = [
    {
      id: 'hiking',
      name: 'Mountain Hiking',
      icon: '🥾',
      description: 'Challenging trails and summit views',
      difficulty: 'Intermediate'
    },
    {
      id: 'trekking',
      name: 'Multi-day Trekking',
      icon: '🎒',
      description: 'Extended wilderness adventures',
      difficulty: 'Advanced'
    },
    {
      id: 'nature',
      name: 'Nature Walking',
      icon: '🌿',
      description: 'Leisurely nature exploration',
      difficulty: 'Easy'
    },
    {
      id: 'waterfall',
      name: 'Waterfall Hunting',
      icon: '💧',
      description: 'Discover hidden waterfalls',
      difficulty: 'Beginner'
    },
    {
      id: 'cultural',
      name: 'Cultural Exploration',
      icon: '🏯',
      description: 'Historic sites and local culture',
      difficulty: 'Easy'
    },
    {
      id: 'adventure',
      name: 'Adventure Sports',
      icon: '🧗',
      description: 'Rock climbing and extreme sports',
      difficulty: 'Advanced'
    }
  ];

  const steps = [
    { id: 1, title: 'Region', icon: 'mapPin' },
    { id: 2, title: 'Trip Type', icon: 'mountain' },
    { id: 3, title: 'Destination', icon: 'navigation' },
    { id: 4, title: 'Planning', icon: 'calendar' },
    { id: 5, title: 'Timeline', icon: 'clock' },
    { id: 6, title: 'Budget', icon: 'dollar' },
    { id: 7, title: 'Quick Facts', icon: 'info' }
  ];

  const getDestinationsByRegionAndType = () => {
    const region = regions.find(r => r.id === selectedRegion);
    if (!region) return [];
    
    // Filter destinations based on trip type (simplified logic for now)
    return region.destinations;
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return selectedRegion !== "";
      case 2: return selectedTripType !== "";
      case 3: return selectedDestination !== "";
      case 4: return startDate !== "";
      default: return true;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card className="p-8 shadow-xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Region</h2>
              <p className="text-gray-600">Select the region of Thailand you'd like to explore</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {regions.map((region) => (
                <div
                  key={region.id}
                  onClick={() => setSelectedRegion(region.id)}
                  className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    selectedRegion === region.id
                      ? 'border-[var(--color-primary-500)] bg-[var(--color-primary-50)] shadow-md transform scale-105'
                      : 'border-gray-200 hover:border-[var(--color-primary-300)]'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-3">{region.icon}</div>
                    <h3 className="font-bold text-xl text-gray-900 mb-2">{region.name}</h3>
                    <p className="text-gray-600 text-sm">{region.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        );

      case 2:
        return (
          <Card className="p-8 shadow-xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Select Trip Type</h2>
              <p className="text-gray-600">What kind of adventure are you looking for?</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tripTypes.map((type) => (
                <div
                  key={type.id}
                  onClick={() => setSelectedTripType(type.id)}
                  className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    selectedTripType === type.id
                      ? 'border-[var(--color-primary-500)] bg-[var(--color-primary-50)] shadow-md transform scale-105'
                      : 'border-gray-200 hover:border-[var(--color-primary-300)]'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-3">{type.icon}</div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1">{type.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{type.description}</p>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      type.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                      type.difficulty === 'Easy' ? 'bg-blue-100 text-blue-700' :
                      type.difficulty === 'Intermediate' ? 'bg-orange-100 text-orange-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {type.difficulty}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        );

      case 3:
        return (
          <Card className="p-8 shadow-xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Destination</h2>
              <p className="text-gray-600">Pick your specific destination in {regions.find(r => r.id === selectedRegion)?.name}</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {getDestinationsByRegionAndType().map((dest) => (
                <div
                  key={dest}
                  onClick={() => setSelectedDestination(dest)}
                  className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    selectedDestination === dest
                      ? 'border-[var(--color-primary-500)] bg-[var(--color-primary-50)] shadow-md'
                      : 'border-gray-200 hover:border-[var(--color-primary-300)]'
                  }`}
                >
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{dest}</h3>
                  <p className="text-gray-600 text-sm">Perfect for {tripTypes.find(t => t.id === selectedTripType)?.name.toLowerCase()}</p>
                </div>
              ))}
            </div>
          </Card>
        );

      case 4:
        return (
          <Card className="p-8 shadow-xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Planning Details</h2>
              <p className="text-gray-600">Set your dates and group preferences</p>
            </div>
            
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary-500)] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setNights(Math.max(1, nights - 1))}
                      className="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold"
                    >
                      -
                    </button>
                    <span className="px-4 py-3 bg-gray-50 rounded-lg font-medium min-w-[120px] text-center">
                      {nights} night{nights > 1 ? 's' : ''}
                    </span>
                    <button 
                      onClick={() => setNights(nights + 1)}
                      className="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Group Size</label>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setHikers(Math.max(1, hikers - 1))}
                      className="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold"
                    >
                      -
                    </button>
                    <span className="px-4 py-3 bg-gray-50 rounded-lg font-medium min-w-[120px] text-center">
                      {hikers} hiker{hikers > 1 ? 's' : ''}
                    </span>
                    <button 
                      onClick={() => setHikers(hikers + 1)}
                      className="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Guide Language</label>
                  <select 
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary-500)] focus:border-transparent"
                  >
                    <option value="Thai">Thai</option>
                    <option value="English">English</option>
                    <option value="Both">Thai & English</option>
                  </select>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <Icon name="info" size={16} className="text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">
                    Guide is mandatory for {selectedDestination}. Local guides ensure safety and provide cultural insights.
                  </span>
                </div>
              </div>
            </div>
          </Card>
        );

      case 5:
        return (
          <Card className="p-8 shadow-xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Timeline</h2>
              <p className="text-gray-600">Your day-by-day adventure itinerary</p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <div className="space-y-4">
                {Array.from({ length: nights + 1 }, (_, i) => (
                  <div key={i} className="flex items-start gap-4 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                    <div className="flex-shrink-0 w-12 h-12 bg-[var(--color-primary-600)] text-white rounded-full flex items-center justify-center font-bold">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 mb-2">
                        Day {i + 1}: {i === 0 ? 'Arrival & Setup' : i === nights ? 'Return Journey' : 'Adventure Day'}
                      </h3>
                      <p className="text-gray-600">
                        {i === 0 ? 'Meet your guide, equipment check, and settle into accommodation' :
                         i === nights ? 'Pack up, final photos, and return to starting point' :
                         `Continue your ${tripTypes.find(t => t.id === selectedTripType)?.name.toLowerCase()} adventure`}
                      </p>
                      <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Icon name="clock" size={14} />
                          {i === 0 ? '2-3 hours' : i === nights ? '2-4 hours' : '6-8 hours'}
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon name="activity" size={14} />
                          {i === 0 ? 'Easy' : i === nights ? 'Easy' : tripTypes.find(t => t.id === selectedTripType)?.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        );

      case 6:
        return (
          <Card className="p-8 shadow-xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Budget Breakdown</h2>
              <p className="text-gray-600">Transparent pricing for your adventure</p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Professional Guide (mandatory)</span>
                  <span className="font-semibold">฿2,500</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Accommodation ({nights} night{nights > 1 ? 's' : ''})</span>
                  <span className="font-semibold">฿{(1200 * nights).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Transportation</span>
                  <span className="font-semibold">฿800</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Meals & Refreshments</span>
                  <span className="font-semibold">฿{(600 * (nights + 1)).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Equipment Rental</span>
                  <span className="font-semibold">฿400</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Park Fees & Permits</span>
                  <span className="font-semibold">฿200</span>
                </div>
                
                <div className="flex items-center justify-between py-4 font-bold text-lg bg-white rounded-lg px-4 border-2 border-[var(--color-primary-200)]">
                  <span>Total per person</span>
                  <span className="text-[var(--color-primary-600)]">฿{(2500 + 1200 * nights + 800 + 600 * (nights + 1) + 400 + 200).toLocaleString()}</span>
                </div>
                
                <div className="flex items-center justify-between py-4 font-bold text-xl bg-gradient-to-r from-[var(--color-primary-600)] to-[var(--color-primary-500)] text-white rounded-lg px-4">
                  <span>Total for {hikers} hikers</span>
                  <span>฿{((2500 + 1200 * nights + 800 + 600 * (nights + 1) + 400 + 200) * hikers).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </Card>
        );

      case 7:
        return (
          <Card className="p-8 shadow-xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Quick Facts</h2>
              <p className="text-gray-600">Your adventure summary</p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Trip Overview */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                    <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                      <Icon name="mapPin" size={20} className="text-[var(--color-primary-600)]" />
                      Trip Overview
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-gray-600">Destination:</span>
                        <p className="font-semibold">{selectedDestination}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Region:</span>
                        <p className="font-semibold">{regions.find(r => r.id === selectedRegion)?.name}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Trip Type:</span>
                        <p className="font-semibold">{tripTypes.find(t => t.id === selectedTripType)?.name}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Duration:</span>
                        <p className="font-semibold">{nights} night{nights > 1 ? 's' : ''}, {nights + 1} days</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                    <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                      <Icon name="users" size={20} className="text-green-600" />
                      Group Details
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-gray-600">Group Size:</span>
                        <p className="font-semibold">{hikers} hiker{hikers > 1 ? 's' : ''}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Guide:</span>
                        <p className="font-semibold">Professional guide (mandatory)</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Language:</span>
                        <p className="font-semibold">{language}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Start Date:</span>
                        <p className="font-semibold">{startDate || 'To be selected'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Budget & Actions */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                    <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                      <Icon name="dollar" size={20} className="text-purple-600" />
                      Budget Summary
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Per person:</span>
                        <span className="font-bold text-lg">฿{(2500 + 1200 * nights + 800 + 600 * (nights + 1) + 400 + 200).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-xl font-bold text-[var(--color-primary-600)]">
                        <span>Total cost:</span>
                        <span>฿{((2500 + 1200 * nights + 800 + 600 * (nights + 1) + 400 + 200) * hikers).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
                    <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                      <Icon name="info" size={20} className="text-amber-600" />
                      Important Notes
                    </h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>• Weather conditions may affect itinerary</p>
                      <p>• Physical fitness requirements apply</p>
                      <p>• Travel insurance recommended</p>
                      <p>• Flexible cancellation policy available</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button 
                      variant="primary" 
                      size="lg" 
                      className="w-full text-lg py-4 bg-gradient-to-r from-[var(--color-primary-600)] to-[var(--color-primary-500)] hover:from-[var(--color-primary-700)] hover:to-[var(--color-primary-600)] shadow-lg"
                    >
                      Book This Adventure
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="w-full text-lg py-4 border-2 border-[var(--color-primary-600)] text-[var(--color-primary-600)] hover:bg-[var(--color-primary-50)]"
                    >
                      Download PDF Itinerary
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Plan Your Adventure</h1>
          <p className="text-lg text-gray-600">Step-by-step planning for your perfect hiking experience</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-center">
            <div className="flex items-center space-x-4 bg-white rounded-full px-6 py-3 shadow-lg">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                    currentStep >= step.id 
                      ? 'bg-[var(--color-primary-600)] text-white shadow-lg' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    <Icon name={step.icon} size={20} />
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-1 mx-2 transition-all duration-300 ${
                      currentStep > step.id ? 'bg-[var(--color-primary-600)]' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mb-8">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="flex justify-center">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-8 py-3"
            >
              Previous
            </Button>
            
            <div className="text-center px-4">
              <span className="text-sm text-gray-500">
                Step {currentStep} of {steps.length}
              </span>
            </div>
            
            <Button
              variant="primary"
              onClick={nextStep}
              disabled={currentStep === steps.length || !canProceed()}
              className="px-8 py-3"
            >
              {currentStep === steps.length ? 'Complete' : 'Next'}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
