'use client';

// Types for trip data matching the new API format
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
  latitude: number;
  longitude: number;
  time: string;
  notes: string;
}

interface Budget {
  transport: number;
  entrance: number;
  meals: number;
  accommodation: number;
  activities: number;
  total: number;
}

interface Permits {
  needed: boolean;
  notes: string;
  seasonal: string;
}

interface SafetyContact {
  name: string;
  phone: string;
}

interface Safety {
  registration: string;
  checkins: string;
  sos: string;
  contacts: {
    ranger: SafetyContact;
    hospital: SafetyContact;
    police: SafetyContact;
  };
}

interface PreparationItem {
  category: string;
  items: string[];
  notes: string;
}

interface Preparation {
  overview: string;
  items: PreparationItem[];
  timeline: string;
}

interface QueryParams {
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
}

interface RetrievedData {
  place_id: string;
  place_name: string;
  score: number;
}

interface TripPlan {
  title: string;
  date: string;
  timeline: TimelineDay[];
  spots: Spot[];
  budget: Budget;
  permits: Permits;
  safety: Safety;
}

interface Meta {
  status: string;
  timestamp: string;
  attempt: number;
}

export interface TripPlanData {
  tripOverview: string;
  query_params: QueryParams;
  retrieved_data?: RetrievedData[];
  trip_plan: TripPlan;
  preparation: Preparation;
  meta?: Meta;
  // Local storage fields
  id?: string;
  createdAt?: string;
  updatedAt?: string;
}

class TripStore {
  private storageKey = 'hiking-app-trips';

  // Save trip plan to localStorage
  saveTripPlan(tripPlan: TripPlanData): string {
    if (typeof window === 'undefined') return '';
    
    const id = this.generateId();
    const now = new Date().toISOString();
    
    const tripData: TripPlanData = {
      ...tripPlan,
      id,
      createdAt: now,
      updatedAt: now
    };

    try {
      const existingTrips = this.getAllTrips();
      const updatedTrips = [...existingTrips, tripData];
      localStorage.setItem(this.storageKey, JSON.stringify(updatedTrips));
      return id;
    } catch (error) {
      console.error('Error saving trip plan:', error);
      return '';
    }
  }

  // Get all trip plans
  getAllTrips(): TripPlanData[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading trip plans:', error);
      return [];
    }
  }

  // Get specific trip plan by ID
  getTripPlan(id: string): TripPlanData | null {
    const trips = this.getAllTrips();
    return trips.find(trip => trip.id === id) || null;
  }

  // Get the most recent trip plan
  getLatestTripPlan(): TripPlanData | null {
    const trips = this.getAllTrips();
    if (trips.length === 0) return null;
    
    return trips.sort((a, b) => {
      const aTime = a.updatedAt || a.createdAt || '';
      const bTime = b.updatedAt || b.createdAt || '';
      return new Date(bTime).getTime() - new Date(aTime).getTime();
    })[0];
  }

  // Update existing trip plan
  updateTripPlan(id: string, updates: Partial<TripPlanData>): boolean {
    if (typeof window === 'undefined') return false;
    
    try {
      const trips = this.getAllTrips();
      const index = trips.findIndex(trip => trip.id === id);
      
      if (index === -1) return false;
      
      trips[index] = {
        ...trips[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      
      localStorage.setItem(this.storageKey, JSON.stringify(trips));
      return true;
    } catch (error) {
      console.error('Error updating trip plan:', error);
      return false;
    }
  }

  // Delete trip plan
  deleteTripPlan(id: string): boolean {
    if (typeof window === 'undefined') return false;
    
    try {
      const trips = this.getAllTrips();
      const filteredTrips = trips.filter(trip => trip.id !== id);
      localStorage.setItem(this.storageKey, JSON.stringify(filteredTrips));
      return true;
    } catch (error) {
      console.error('Error deleting trip plan:', error);
      return false;
    }
  }

  // Clear all trip plans
  clearAllTrips(): boolean {
    if (typeof window === 'undefined') return false;
    
    try {
      localStorage.removeItem(this.storageKey);
      return true;
    } catch (error) {
      console.error('Error clearing trip plans:', error);
      return false;
    }
  }

  // Generate a unique ID
  private generateId(): string {
    return `trip_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Format trip plan for chat context with comprehensive information
  formatTripForChat(tripData: TripPlanData): string {
    const { trip_plan, tripOverview, query_params, preparation } = tripData;
    
    let context = `Current Trip Plan: ${trip_plan.title}\n\n`;
    context += `Overview: ${tripOverview}\n\n`;
    
    // Add trip details
    context += `Trip Details:\n`;
    context += `- Destination: ${query_params.start_place} to ${query_params.destination}\n`;
    context += `- Dates: ${query_params.travelDates}\n`;
    context += `- Duration: ${query_params.duration} days\n`;
    context += `- Group Size: ${query_params.groupSize} people\n`;
    context += `- Budget: ${query_params.budgetTier} (฿${query_params.trip_price.toLocaleString()})\n`;
    context += `- Theme: ${query_params.theme}\n`;
    context += `- Interests: ${query_params.interests.join(', ')}\n\n`;
    
    // Add timeline information
    context += `Itinerary:\n`;
    trip_plan.timeline.forEach(day => {
      context += `Day ${day.day}:\n`;
      day.activities.forEach(activity => {
        context += `  ${activity.t} - ${activity.detail}\n`;
      });
      context += '\n';
    });
    
    // Add key spots
    if (trip_plan.spots && trip_plan.spots.length > 0) {
      context += `Key Destinations:\n`;
      trip_plan.spots.forEach(spot => {
        context += `- ${spot.name} (${spot.time}): ${spot.notes}\n`;
      });
      context += '\n';
    }
    
    // Add budget breakdown
    if (trip_plan.budget) {
      context += `Budget Breakdown:\n`;
      context += `- Transport: ฿${trip_plan.budget.transport.toLocaleString()}\n`;
      context += `- Accommodation: ฿${trip_plan.budget.accommodation.toLocaleString()}\n`;
      context += `- Meals: ฿${trip_plan.budget.meals.toLocaleString()}\n`;
      context += `- Activities: ฿${trip_plan.budget.activities.toLocaleString()}\n`;
      context += `- Entrance Fees: ฿${trip_plan.budget.entrance.toLocaleString()}\n`;
      context += `- Total: ฿${trip_plan.budget.total.toLocaleString()}\n\n`;
    }
    
    // Add permits and safety info
    if (trip_plan.permits && trip_plan.permits.needed) {
      context += `Permits Required: ${trip_plan.permits.notes}\n`;
      context += `Best Season: ${trip_plan.permits.seasonal}\n\n`;
    }
    
    // Add preparation info
    if (preparation) {
      context += `Preparation Needed:\n`;
      context += `${preparation.overview}\n\n`;
      preparation.items.forEach(item => {
        context += `${item.category}: ${item.items.join(', ')}\n`;
        context += `Notes: ${item.notes}\n\n`;
      });
    }
    
    return context;
  }
}

export const tripStore = new TripStore();
export default tripStore;
