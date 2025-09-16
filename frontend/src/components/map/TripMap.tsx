'use client';

import { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import map components to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });
const Polyline = dynamic(() => import('react-leaflet').then(mod => mod.Polyline), { ssr: false });

interface TripSpot {
  name: string;
  time: string;
  notes: string;
  // Support both coordinate formats
  lat?: number;
  lng?: number;
  latitude?: number;
  longitude?: number;
}

interface TimelineDay {
  day: number;
  activities: Array<{
    t: string;
    detail: string;
  }>;
}

interface TripMapProps {
  spots: TripSpot[];
  timeline: TimelineDay[];
  currentDay?: number;
  currentActivityIndex?: number;
  onProgressChange?: (stepIndex: number) => void;
  currentProgressIndex?: number;
}

// Mock coordinates for the locations (in real app, these would come from a geocoding service)
const locationCoordinates: { [key: string]: [number, number] } = {
  'Bangkok': [13.7563, 100.5018],
  'Chiang Mai': [18.7883, 98.9853],
  'Phrao District Homestay': [19.3667, 99.2167],
  'Community Library': [19.3670, 99.2170],
  'Trekking Trails': [19.3700, 99.2200],
  'Phrao Night Market': [19.3665, 99.2165]
};

export function TripMap({ 
  spots, 
  timeline, 
  currentDay = 1, 
  currentActivityIndex = 0,
  onProgressChange,
  currentProgressIndex = 0
}: TripMapProps) {
  const [isClient, setIsClient] = useState(false);
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const [L, setL] = useState<typeof import('leaflet') | null>(null);
  
  // Use external progress index if provided, otherwise fall back to internal state
  const progressIndex = currentProgressIndex;

  useEffect(() => {
    setIsClient(true);
    
    // Dynamically import and configure Leaflet on client side only
    if (typeof window !== 'undefined') {
      import('leaflet').then((leaflet) => {
        try {
          // Fix for default icons in Leaflet
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          delete (leaflet.Icon.Default.prototype as any)._getIconUrl;
          leaflet.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
          });
          setL(leaflet);
          setLeafletLoaded(true);
        } catch (error) {
          console.warn('Leaflet configuration error:', error);
        }
      });
    }
  }, []);

  // Create icon factory function to ensure fresh icons
  const createIcon = useMemo(() => {
    if (!leafletLoaded || !L) return null;
    
    return (color: string) => new L.Icon({
      iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
  }, [leafletLoaded, L]);

  // Enhanced icons including expected position
  const icons = useMemo(() => {
    if (!createIcon) return null;
    
    return {
      start: createIcon('green'),
      current: createIcon('red'),
      visited: createIcon('grey'),
      upcoming: createIcon('blue'),
      expected: createIcon('orange') // New icon for expected position
    };
  }, [createIcon]);

  // Simple route path: start + all spot coordinates (straight lines)
  const routePath: [number, number][] = useMemo(() => {
    const validSpots = spots
      .map(spot => {
        // Handle both coordinate formats
        const lat = spot.latitude || spot.lat;
        const lng = spot.longitude || spot.lng;
        return lat && lng ? [lat, lng] as [number, number] : null;
      })
      .filter((coord): coord is [number, number] => coord !== null);
    
    return [
      locationCoordinates['Bangkok'], // Start point
      ...validSpots
    ];
  }, [spots]);

  // Calculate expected position based on current day and activity
  const getExpectedPosition = (): [number, number] | null => {
    if (!currentDay || currentActivityIndex === undefined) return null;
    
    // Find current day's activities
    const currentDayData = timeline.find(day => day.day === currentDay);
    if (!currentDayData || !currentDayData.activities[currentActivityIndex]) return null;
    
    // For now, use a simple interpolation between route points
    // In a real app, this would be more sophisticated based on actual activity locations
    const totalSteps = timeline.reduce((sum, day) => sum + day.activities.length, 0);
    let currentStep = 0;
    
    for (const day of timeline) {
      if (day.day < currentDay) {
        currentStep += day.activities.length;
      } else if (day.day === currentDay) {
        currentStep += currentActivityIndex + 1;
        break;
      }
    }
    
    // Calculate position along route
    const routeProgress = Math.min(currentStep - 1, routePath.length - 1);
    const progressPercent = routeProgress / Math.max(routePath.length - 1, 1);
    
    // Interpolate position along route
    if (routeProgress >= routePath.length - 1) {
      return routePath[routePath.length - 1];
    }
    
    const currentPoint = routePath[Math.floor(routeProgress)];
    const nextPoint = routePath[Math.ceil(routeProgress)];
    
    if (!currentPoint || !nextPoint) return currentPoint || null;
    
    const fraction = routeProgress - Math.floor(routeProgress);
    const lat = currentPoint[0] + (nextPoint[0] - currentPoint[0]) * fraction;
    const lng = currentPoint[1] + (nextPoint[1] - currentPoint[1]) * fraction;
    
    return [lat, lng];
  };

  // Determine if user is staying in the same location for multiple activities
  const isStayingInSameLocation = (): boolean => {
    if (!currentDay || currentActivityIndex === undefined) return false;
    
    const currentDayData = timeline.find(day => day.day === currentDay);
    if (!currentDayData) return false;
    
    const currentActivity = currentDayData.activities[currentActivityIndex];
    const nextActivity = currentDayData.activities[currentActivityIndex + 1];
    const previousActivity = currentDayData.activities[currentActivityIndex - 1];
    
    // Check if current activity involves staying (keywords like "dinner", "rest", "overnight", "check-in")
    const stayingKeywords = ['dinner', 'rest', 'overnight', 'check-in', 'lunch', 'hotel', 'accommodation', 'camp'];
    const isStayingActivity = stayingKeywords.some(keyword => 
      currentActivity?.detail.toLowerCase().includes(keyword)
    );
    
    // Check if multiple consecutive activities are in the same general area
    const hasConsecutiveActivitiesInSameArea = (
      previousActivity && stayingKeywords.some(keyword => 
        previousActivity.detail.toLowerCase().includes(keyword)
      )
    ) || (
      nextActivity && stayingKeywords.some(keyword => 
        nextActivity.detail.toLowerCase().includes(keyword)
      )
    );
    
    return isStayingActivity || hasConsecutiveActivitiesInSameArea;
  };

  // Calculate optimal zoom and center based on current situation
  const getMapViewSettings = (): { center: [number, number], zoom: number } => {
    const expectedPos = getExpectedPosition();
    const isStaying = isStayingInSameLocation();
    
    if (expectedPos && isStaying) {
      // Zoom in more when staying in the same location
      return {
        center: expectedPos,
        zoom: 14 // Higher zoom for detailed view
      };
    } else if (expectedPos) {
      // Medium zoom when moving between locations
      return {
        center: expectedPos,
        zoom: 11 // Medium zoom to see surrounding area
      };
    } else {
      // Default overview when no specific position
      return {
        center: [16.7563, 99.5018], // Center between Bangkok and Chiang Mai
        zoom: 7
      };
    }
  };

  const expectedPosition = getExpectedPosition();
  const mapViewSettings = getMapViewSettings();

  // Current visible portion of path (progressive reveal)
  const visibleRoute = useMemo(() => routePath.slice(0, progressIndex + 1), [routePath, progressIndex]);

  if (!isClient || !leafletLoaded || !icons) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-100 rounded-xl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full relative z-0">
      <MapContainer
        center={mapViewSettings.center}
        zoom={mapViewSettings.zoom}
        style={{ height: '100%', width: '100%', zIndex: 0 }}
        className="rounded-xl"
        key={`map-${progressIndex}`} // Force re-render when step changes
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Route Path */}
        {visibleRoute.length > 1 && (
          <Polyline
            key={`route-${progressIndex}`}
            positions={visibleRoute}
            color="#3b82f6"
            weight={4}
            opacity={0.7}
          />
        )}

        {/* Start Marker (Bangkok) */}
        <Marker 
          key="start-bangkok"
          position={locationCoordinates['Bangkok']} 
          icon={icons.start}
        >
          <Popup>
            <div className="text-center">
              <h3 className="font-bold">Bangkok</h3>
              <p className="text-sm">Starting Point</p>
              <p className="text-xs text-gray-600">Your journey begins here!</p>
            </div>
          </Popup>
        </Marker>

        {/* Expected Position Marker */}
        {expectedPosition && (
          <Marker 
            key={`expected-${currentDay}-${currentActivityIndex}`}
            position={expectedPosition} 
            icon={icons.expected}
          >
            <Popup>
              <div className="text-center">
                <h3 className="font-bold text-orange-600">Expected Position</h3>
                <p className="text-sm font-medium">Day {currentDay}</p>
                <p className="text-xs text-gray-600">
                  {timeline.find(d => d.day === currentDay)?.activities[currentActivityIndex]?.detail}
                </p>
                <div className="mt-2 text-xs text-orange-600">
                  📍 You should be here now
                </div>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Trip Spots with dynamic icons based on current step */}
        {spots.map((spot, index) => {
          // Handle both coordinate formats
          const lat = spot.latitude || spot.lat;
          const lng = spot.longitude || spot.lng;
          
          if (!lat || !lng) return null;

          // routePath index for this spot is index + 1
          const spotRouteIdx = index + 1;
          let icon = icons.upcoming;
          let status = '⏳ Upcoming';

          if (spotRouteIdx < progressIndex) {
            icon = icons.visited;
            status = '✅ Visited';
          } else if (spotRouteIdx === progressIndex) {
            icon = icons.current;
            status = '📍 Current';
          }

          return (
            <Marker 
              key={`spot-${index}-${progressIndex}`} // Include progressIndex in key to force re-render
              position={[lat, lng]} 
              icon={icon}
            >
              <Popup>
                <div>
                  <h3 className="font-bold">{spot.name}</h3>
                  <p className="text-sm font-medium text-blue-600">{spot.time}</p>
                  <p className="text-sm text-gray-600">{spot.notes}</p>
                  <div className="mt-2 text-xs">
                    Status: {status}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
