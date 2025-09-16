interface Coordinates {
  lat: number;
  lng: number;
}

interface RouteSegment {
  type: 'driving-car' | 'foot-walking' | 'cycling-regular' | 'flight';
  geometry: [number, number][];
  duration: number;
  distance: number;
}

export class RoutingService {
  private static instance: RoutingService;
  private cache = new Map<string, RouteSegment>();

  private constructor() {
    // No need for API key on client side since we're using backend API
  }

  public static getInstance(): RoutingService {
    if (!RoutingService.instance) {
      RoutingService.instance = new RoutingService();
    }
    return RoutingService.instance;
  }

  /**
   * Determines transport mode based on activity description
   */
  private getTransportMode(activity: string): 'driving-car' | 'foot-walking' | 'cycling-regular' | 'flight' {
    const activityLower = activity.toLowerCase();
    
    if (activityLower.includes('flight') || activityLower.includes('fly') || activityLower.includes('plane')) {
      return 'flight';
    }
    
    if (activityLower.includes('drive') || activityLower.includes('car') || activityLower.includes('rental')) {
      return 'driving-car';
    }
    
    if (activityLower.includes('bike') || activityLower.includes('cycle')) {
      return 'cycling-regular';
    }
    
    // Default to walking for hiking, walking, exploring activities
    return 'foot-walking';
  }

  /**
   * Calculates great circle path for flight routes
   */
  private calculateFlightPath(start: Coordinates, end: Coordinates): [number, number][] {
    const steps = 20;
    const points: [number, number][] = [];
    
    for (let i = 0; i <= steps; i++) {
      const fraction = i / steps;
      
      // Simple linear interpolation for demonstration
      // In production, use proper great circle calculation
      const lat = start.lat + (end.lat - start.lat) * fraction;
      const lng = start.lng + (end.lng - start.lng) * fraction;
      
      points.push([lng, lat]);
    }
    
    return points;
  }

  /**
   * Fetches route from our backend API (which calls OpenRouteService)
   */
  private async fetchRouteFromAPI(
    start: Coordinates, 
    end: Coordinates, 
    profile: 'driving-car' | 'foot-walking' | 'cycling-regular'
  ): Promise<RouteSegment | null> {
    try {
      const response = await fetch('/api/routing/route', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          start: { lat: start.lat, lng: start.lng },
          end: { lat: end.lat, lng: end.lng },
          profile
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Backend API error: ${response.status} - ${errorData.error}`);
      }

      const data = await response.json();
      
      if (data.success && data.geometry) {
        return {
          type: profile,
          geometry: data.geometry, // Already in lng,lat format from OpenRouteService
          duration: data.duration || 0,
          distance: data.distance || 0
        };
      }

      return null;
    } catch (error) {
      console.error('Error fetching route from backend API:', error);
      return null;
    }
  }

  /**
   * Gets route between two points with caching
   */
  public async getRoute(
    start: Coordinates, 
    end: Coordinates, 
    activity: string = ''
  ): Promise<[number, number][]> {
    const transportMode = this.getTransportMode(activity);
    const cacheKey = `${start.lat},${start.lng}-${end.lat},${end.lng}-${transportMode}`;

    // Check cache first
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!.geometry;
    }

    // Handle flight routes with great circle calculation
    if (transportMode === 'flight') {
      const flightPath = this.calculateFlightPath(start, end);
      const flightRoute: RouteSegment = {
        type: 'flight',
        geometry: flightPath,
        duration: 0,
        distance: 0
      };
      this.cache.set(cacheKey, flightRoute);
      return flightPath;
    }

    // Fetch from OpenRouteService API
    const routeData = await this.fetchRouteFromAPI(start, end, transportMode);
    
    if (routeData) {
      this.cache.set(cacheKey, routeData);
      return routeData.geometry;
    }

    // Fallback to straight line if API fails
    console.warn(`Routing failed for ${activity}, using straight line`);
    const straightLine: [number, number][] = [
      [start.lng, start.lat],
      [end.lng, end.lat]
    ];
    
    const fallbackRoute: RouteSegment = {
      type: transportMode,
      geometry: straightLine,
      duration: 0,
      distance: 0
    };
    this.cache.set(cacheKey, fallbackRoute);
    
    return straightLine;
  }

  /**
   * Gets multiple route segments for a trip timeline
   */
  public async getTripRoutes(
    coordinates: Coordinates[],
    activities: string[]
  ): Promise<[number, number][]> {
    const allRoutePoints: [number, number][] = [];

    for (let i = 0; i < coordinates.length - 1; i++) {
      const start = coordinates[i];
      const end = coordinates[i + 1];
      const activity = activities[i] || '';

      const routeSegment = await this.getRoute(start, end, activity);
      
      // Add all points except the first one (to avoid duplicates)
      if (i === 0) {
        allRoutePoints.push(...routeSegment);
      } else {
        allRoutePoints.push(...routeSegment.slice(1));
      }
    }

    return allRoutePoints;
  }

  /**
   * Clears the routing cache
   */
  public clearCache(): void {
    this.cache.clear();
  }
}

export default RoutingService.getInstance();