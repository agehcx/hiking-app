'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';

// Define types for API response
interface Activity {
  t: string;
  detail: string;
}

interface TimelineDay {
  day: number;
  activities: Activity[];
}

interface Spot {
  name: string;
  time: string;
  notes: string;
}

interface Budget {
  total: number;
  [key: string]: number;
}

interface SafetyContact {
  name: string;
  phone: string;
}

interface Safety {
  registration: string;
  checkins: string;
  sos: string;
  contacts: Record<string, SafetyContact>;
}

interface TripPlan {
  title: string;
  timeline: TimelineDay[];
  spots: Spot[];
  budget: Budget;
  safety: Safety;
}

interface TripPlanResponse {
  tripOverview: string;
  trip_plan: TripPlan;
}

export default function PlanPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedTripType, setSelectedTripType] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startPlace, setStartPlace] = useState('');
  const [nights, setNights] = useState(2);
  const [hikers, setHikers] = useState(2);
  const [interests, setInterests] = useState<string[]>([]);
  const [budgetTier, setBudgetTier] = useState('');
  const [stayPref, setStayPref] = useState('');
  const [transportPref, setTransportPref] = useState('');
  const [generatedJSON, setGeneratedJSON] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [tripPlanResponse, setTripPlanResponse] = useState<TripPlanResponse | null>(null);
  const [apiError, setApiError] = useState<string>('');

  const availableInterests = [
    'Cultural sites',
    'Local cuisine', 
    'Art and architecture',
    'Nature photography',
    'Wildlife watching',
    'Adventure sports',
    'Temple visits',
    'Night markets',
    'Local festivals',
    'Traditional crafts'
  ];

  const budgetTiers = [
    { id: 'budget', name: 'Budget', icon: '💰', description: 'Basic accommodations and local transport' },
    { id: 'mid-range', name: 'Mid-range', icon: '🏨', description: 'Comfortable hotels and guided experiences' },
    { id: 'luxury', name: 'Luxury', icon: '✨', description: 'Premium accommodations and exclusive experiences' }
  ];

  const stayPreferences = [
    { id: 'hostels', name: 'Hostels', icon: '🏠' },
    { id: 'guesthouses', name: 'Guesthouses', icon: '🏡' },
    { id: 'boutique-hotels', name: 'Boutique hotels', icon: '🏨' },
    { id: 'resorts', name: 'Resorts', icon: '🏖️' },
    { id: 'homestays', name: 'Homestays', icon: '🏘️' }
  ];

  const transportPreferences = [
    { id: 'local-transport', name: 'Local transport', icon: '🚌' },
    { id: 'rental-car', name: 'Rental car', icon: '🚗' },
    { id: 'private-driver', name: 'Private driver', icon: '🚙' },
    { id: 'motorbike', name: 'Motorbike', icon: '🏍️' }
  ];

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
    { id: 5, title: 'Preferences', icon: 'settings' },
    { id: 6, title: 'Budget', icon: 'dollar' },
    { id: 7, title: 'Generate', icon: 'send' }
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
      case 4: return startDate !== "" && endDate !== "" && startPlace !== "";
      case 5: return interests.length > 0 && budgetTier !== "" && stayPref !== "" && transportPref !== "";
      case 6: return true;
      default: return true;
    }
  };

  const calculateEndDate = (start: string, nights: number) => {
    if (!start) return '';
    const startDateObj = new Date(start);
    const endDateObj = new Date(startDateObj);
    endDateObj.setDate(startDateObj.getDate() + nights);
    return endDateObj.toISOString().split('T')[0];
  };

  const generateTripJSON = async () => {
    const tripData = {
      start_place: startPlace,
      destination: selectedDestination,
      travelDates: `${startDate} to ${endDate}`,
      duration: nights + 1,
      groupSize: hikers,
      interests: interests,
      budgetTier: budgetTiers.find(t => t.id === budgetTier)?.name || budgetTier,
      trip_price: (2500 + 1200 * nights + 800 + 600 * (nights + 1) + 400 + 200) * hikers,
      stayPref: stayPreferences.find(s => s.id === stayPref)?.name || stayPref,
      transportPref: transportPreferences.find(t => t.id === transportPref)?.name || transportPref,
      theme: tripTypes.find(t => t.id === selectedTripType)?.name || selectedTripType
    };
    
    setGeneratedJSON(JSON.stringify(tripData, null, 2));
    
    // Call the API with retry logic
    setIsLoading(true);
    setApiError('');
    setTripPlanResponse(null);
    
    const MAX_RETRIES = 3;
    const RETRY_DELAY = 2000; // 2 seconds
    
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
        
        const response = await fetch('https://taspol-pan-sea.hf.space/v1/generateTripPlan', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(tripData),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setTripPlanResponse(data);
        setIsLoading(false);
        return tripData; // Success - exit the function
        
      } catch (error) {
        console.error(`Attempt ${attempt} failed:`, error);
        
        // If this is the last attempt, set the error and stop trying
        if (attempt === MAX_RETRIES) {
          setApiError(
            error instanceof Error 
              ? `Failed after ${MAX_RETRIES} attempts: ${error.message}` 
              : `Failed to generate trip plan after ${MAX_RETRIES} attempts`
          );
          setIsLoading(false);
          break;
        }
        
        // Wait before retrying (exponential backoff)
        const delay = RETRY_DELAY * Math.pow(2, attempt - 1);
        setApiError(`Attempt ${attempt} failed, retrying in ${delay/1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    return tripData;
  };

  const toggleInterest = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card className="p-8 shadow-xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Region</h2>
              <p className="text-gray-600">Select the region of Thailand you&apos;d like to explore</p>
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
              <p className="text-gray-600">Set your dates, starting point, and group preferences</p>
            </div>
            
            <div className="max-w-2xl mx-auto space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Starting Place</label>
                <input
                  type="text"
                  value={startPlace}
                  onChange={(e) => setStartPlace(e.target.value)}
                  placeholder="e.g., กรุงเทพ, เชียงใหม่"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary-500)] focus:border-transparent"
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => {
                      setStartDate(e.target.value);
                      setEndDate(calculateEndDate(e.target.value, nights));
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary-500)] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary-500)] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => {
                        const newNights = Math.max(1, nights - 1);
                        setNights(newNights);
                        if (startDate) setEndDate(calculateEndDate(startDate, newNights));
                      }}
                      className="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold"
                    >
                      -
                    </button>
                    <span className="px-4 py-3 bg-gray-50 rounded-lg font-medium min-w-[120px] text-center">
                      {nights} night{nights > 1 ? 's' : ''}
                    </span>
                    <button 
                      onClick={() => {
                        const newNights = nights + 1;
                        setNights(newNights);
                        if (startDate) setEndDate(calculateEndDate(startDate, newNights));
                      }}
                      className="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Travel Preferences</h2>
              <p className="text-gray-600">Tell us about your interests and preferences</p>
            </div>
            
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Interests */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">What interests you?</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {availableInterests.map((interest) => (
                    <button
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      className={`p-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
                        interests.includes(interest)
                          ? 'border-[var(--color-primary-500)] bg-[var(--color-primary-50)] text-[var(--color-primary-700)]'
                          : 'border-gray-200 hover:border-[var(--color-primary-300)] text-gray-700'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget Tier */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Budget Level</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {budgetTiers.map((tier) => (
                    <div
                      key={tier.id}
                      onClick={() => setBudgetTier(tier.id)}
                      className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                        budgetTier === tier.id
                          ? 'border-[var(--color-primary-500)] bg-[var(--color-primary-50)] shadow-md'
                          : 'border-gray-200 hover:border-[var(--color-primary-300)]'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-3xl mb-3">{tier.icon}</div>
                        <h4 className="font-bold text-lg text-gray-900 mb-2">{tier.name}</h4>
                        <p className="text-gray-600 text-sm">{tier.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Accommodation & Transport */}
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Accommodation</h3>
                  <div className="space-y-3">
                    {stayPreferences.map((stay) => (
                      <button
                        key={stay.id}
                        onClick={() => setStayPref(stay.id)}
                        className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 flex items-center gap-3 ${
                          stayPref === stay.id
                            ? 'border-[var(--color-primary-500)] bg-[var(--color-primary-50)]'
                            : 'border-gray-200 hover:border-[var(--color-primary-300)]'
                        }`}
                      >
                        <span className="text-2xl">{stay.icon}</span>
                        <span className="font-medium">{stay.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Transportation</h3>
                  <div className="space-y-3">
                    {transportPreferences.map((transport) => (
                      <button
                        key={transport.id}
                        onClick={() => setTransportPref(transport.id)}
                        className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 flex items-center gap-3 ${
                          transportPref === transport.id
                            ? 'border-[var(--color-primary-500)] bg-[var(--color-primary-50)]'
                            : 'border-gray-200 hover:border-[var(--color-primary-300)]'
                        }`}
                      >
                        <span className="text-2xl">{transport.icon}</span>
                        <span className="font-medium">{transport.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
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
            {isLoading ? (
              // Loading Screen
              <div className="text-center py-16">
                <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-[var(--color-primary-600)] mb-4"></div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Generating Your Trip Plan</h2>
                <p className="text-gray-600 mb-8">Our AI is crafting the perfect itinerary just for you...</p>
                <div className="max-w-md mx-auto">
                  <div className="bg-gray-200 rounded-full h-2 mb-4">
                    <div className="bg-gradient-to-r from-[var(--color-primary-600)] to-[var(--color-primary-500)] h-2 rounded-full animate-pulse" style={{width: '75%'}}></div>
                  </div>
                  <p className="text-sm text-gray-500">This may take a few moments...</p>
                </div>
              </div>
            ) : tripPlanResponse ? (
              // Trip Plan Response Display
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">🎉 Your Trip Plan is Ready!</h2>
                  <p className="text-gray-600">{tripPlanResponse.trip_plan?.title}</p>
                </div>

                {/* Trip Overview */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                  <h3 className="font-bold text-xl text-gray-900 mb-4 flex items-center gap-2">
                    <Icon name="info" size={24} className="text-[var(--color-primary-600)]" />
                    Trip Overview
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{tripPlanResponse.tripOverview}</p>
                </div>

                {/* Timeline */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="font-bold text-xl text-gray-900 mb-6 flex items-center gap-2">
                    <Icon name="calendar" size={24} className="text-[var(--color-primary-600)]" />
                    Daily Itinerary
                  </h3>
                  <div className="space-y-6">
                    {tripPlanResponse.trip_plan?.timeline?.map((day: TimelineDay) => (
                      <div key={day.day} className="border-l-4 border-[var(--color-primary-500)] pl-6">
                        <h4 className="font-bold text-lg text-gray-900 mb-3">Day {day.day}</h4>
                        <div className="space-y-2">
                          {day.activities?.map((activity: Activity, index: number) => (
                            <div key={index} className="flex items-start gap-3 py-2">
                              <span className="text-sm font-medium text-[var(--color-primary-600)] min-w-[60px]">
                                {activity.t}
                              </span>
                              <span className="text-gray-700">{activity.detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Budget Breakdown */}
                {tripPlanResponse.trip_plan?.budget && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                    <h3 className="font-bold text-xl text-gray-900 mb-4 flex items-center gap-2">
                      <Icon name="dollar" size={24} className="text-green-600" />
                      Budget Breakdown
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {Object.entries(tripPlanResponse.trip_plan.budget).map(([key, value]: [string, number]) => (
                        key !== 'total' && (
                          <div key={key} className="flex justify-between items-center py-2 border-b border-green-200">
                            <span className="capitalize text-gray-700">{key}:</span>
                            <span className="font-semibold">฿{value.toLocaleString()}</span>
                          </div>
                        )
                      ))}
                      <div className="md:col-span-2 flex justify-between items-center py-3 border-t-2 border-green-300 font-bold text-lg">
                        <span>Total:</span>
                        <span className="text-green-600">฿{tripPlanResponse.trip_plan.budget.total?.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Key Spots */}
                {tripPlanResponse.trip_plan?.spots && (
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                    <h3 className="font-bold text-xl text-gray-900 mb-4 flex items-center gap-2">
                      <Icon name="mapPin" size={24} className="text-purple-600" />
                      Key Destinations
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {tripPlanResponse.trip_plan.spots.map((spot: Spot, index: number) => (
                        <div key={index} className="bg-white rounded-lg p-4 border">
                          <h4 className="font-semibold text-gray-900 mb-2">{spot.name}</h4>
                          <p className="text-sm text-gray-600 mb-1">Time: {spot.time}</p>
                          <p className="text-sm text-gray-700">{spot.notes}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Safety Information */}
                {tripPlanResponse.trip_plan?.safety && (
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
                    <h3 className="font-bold text-xl text-gray-900 mb-4 flex items-center gap-2">
                      <Icon name="shield" size={24} className="text-amber-600" />
                      Safety Information
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-700 mb-2">{tripPlanResponse.trip_plan.safety.registration}</p>
                        <p className="text-sm text-gray-700 mb-2">{tripPlanResponse.trip_plan.safety.checkins}</p>
                        <p className="text-sm font-medium text-red-600">Emergency: {tripPlanResponse.trip_plan.safety.sos}</p>
                      </div>
                      {tripPlanResponse.trip_plan.safety.contacts && (
                        <div className="grid md:grid-cols-3 gap-4 mt-4">
                          {Object.entries(tripPlanResponse.trip_plan.safety.contacts).map(([key, contact]: [string, SafetyContact]) => (
                            <div key={key} className="bg-white rounded-lg p-3 border">
                              <h5 className="font-semibold text-sm text-gray-900 mb-1">{contact.name}</h5>
                              <p className="text-sm text-gray-600">{contact.phone}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4 justify-center">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="px-8 py-4"
                  >
                    Download Itinerary
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    onClick={() => {
                      setTripPlanResponse(null);
                      setGeneratedJSON('');
                    }}
                    className="px-8 py-4"
                  >
                    Plan Another Trip
                  </Button>
                </div>
              </div>
            ) : (
              // Initial Step 7 Content
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Generate Trip Plan</h2>
                  <p className="text-gray-600">Ready to create your personalized trip itinerary</p>
                </div>
                
                <div className="max-w-4xl mx-auto space-y-8">
                  {/* Trip Summary */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                    <h3 className="font-bold text-lg text-gray-900 mb-4">Trip Summary</h3>
                    <div className="grid md:grid-cols-2 gap-6 text-sm">
                      <div className="space-y-2">
                        <div><span className="text-gray-600">From:</span> <span className="font-semibold">{startPlace}</span></div>
                        <div><span className="text-gray-600">To:</span> <span className="font-semibold">{selectedDestination}</span></div>
                        <div><span className="text-gray-600">Dates:</span> <span className="font-semibold">{startDate} to {endDate}</span></div>
                        <div><span className="text-gray-600">Duration:</span> <span className="font-semibold">{nights + 1} days</span></div>
                      </div>
                      <div className="space-y-2">
                        <div><span className="text-gray-600">Group Size:</span> <span className="font-semibold">{hikers} people</span></div>
                        <div><span className="text-gray-600">Budget:</span> <span className="font-semibold">{budgetTiers.find(t => t.id === budgetTier)?.name}</span></div>
                        <div><span className="text-gray-600">Theme:</span> <span className="font-semibold">{tripTypes.find(t => t.id === selectedTripType)?.name}</span></div>
                        <div><span className="text-gray-600">Total Cost:</span> <span className="font-semibold">฿{((2500 + 1200 * nights + 800 + 600 * (nights + 1) + 400 + 200) * hikers).toLocaleString()}</span></div>
                      </div>
                    </div>
                  </div>

                  {/* Interests & Preferences */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                      <h3 className="font-bold text-lg text-gray-900 mb-4">Your Interests</h3>
                      <div className="flex flex-wrap gap-2">
                        {interests.map((interest) => (
                          <span key={interest} className="px-3 py-1 bg-white rounded-full text-sm font-medium border">
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                      <h3 className="font-bold text-lg text-gray-900 mb-4">Preferences</h3>
                      <div className="space-y-2 text-sm">
                        <div><span className="text-gray-600">Stay:</span> <span className="font-semibold">{stayPreferences.find(s => s.id === stayPref)?.name}</span></div>
                        <div><span className="text-gray-600">Transport:</span> <span className="font-semibold">{transportPreferences.find(t => t.id === transportPref)?.name}</span></div>
                      </div>
                    </div>
                  </div>

                  {/* Error Display */}
                  {apiError && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                      <h3 className="font-bold text-lg text-red-800 mb-2">Error</h3>
                      <p className="text-red-700">{apiError}</p>
                    </div>
                  )}

                  {/* JSON Output */}
                  {generatedJSON && (
                    <div className="bg-gray-900 rounded-xl p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-lg text-white">Generated Trip Data (JSON)</h3>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigator.clipboard.writeText(generatedJSON)}
                          className="text-white border-gray-600 hover:bg-gray-800"
                        >
                          Copy JSON
                        </Button>
                      </div>
                      <pre className="text-green-400 text-sm overflow-x-auto whitespace-pre-wrap">
                        {generatedJSON}
                      </pre>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button 
                      variant="primary" 
                      size="lg" 
                      onClick={generateTripJSON}
                      disabled={isLoading}
                      className="w-full text-lg py-4 bg-gradient-to-r from-[var(--color-primary-600)] to-[var(--color-primary-500)] hover:from-[var(--color-primary-700)] hover:to-[var(--color-primary-600)] shadow-lg"
                    >
                      {isLoading ? 'Generating...' : 'Generate Trip Plan'}
                    </Button>
                  </div>
                </div>
              </div>
            )}
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
              onClick={() => {
                if (currentStep === steps.length) {
                  generateTripJSON();
                } else {
                  nextStep();
                }
              }}
              disabled={!canProceed()}
              className="px-8 py-3"
            >
              {currentStep === steps.length ? 'Generate JSON' : 'Next'}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
