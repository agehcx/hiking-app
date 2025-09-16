import { NextApiRequest, NextApiResponse } from 'next';

interface RouteRequest {
  start: {
    lat: number;
    lng: number;
  };
  end: {
    lat: number;
    lng: number;
  };
  profile: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { start, end, profile }: RouteRequest = req.body;

    // Validate input
    if (!start?.lat || !start?.lng || !end?.lat || !end?.lng || !profile) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const apiKey = process.env.OPENROUTESERVICE_API_KEY || process.env.NEXT_PUBLIC_OPENROUTESERVICE_API_KEY;
    
    if (!apiKey) {
      console.error('OpenRouteService API key not found in environment variables');
      return res.status(500).json({ error: 'API key not configured' });
    }

    // OpenRouteService expects coordinates in lng,lat format
    const url = `https://api.openrouteservice.org/v2/directions/${profile}`;
    const params = new URLSearchParams({
      start: `${start.lng},${start.lat}`, // lng,lat format for OpenRouteService
      end: `${end.lng},${end.lat}`,       // lng,lat format for OpenRouteService
      format: 'json'
    });

    console.log(`Fetching route from: ${url}?${params}`);

    const response = await fetch(`${url}?${params}`, {
      headers: {
        'Authorization': apiKey,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`OpenRouteService API error: ${response.status} - ${errorText}`);
      return res.status(response.status).json({ 
        error: `OpenRouteService API error: ${response.status}`,
        details: errorText
      });
    }

    const data = await response.json();
    
    if (data.features && data.features[0] && data.features[0].geometry) {
      const route = data.features[0];
      return res.status(200).json({
        success: true,
        geometry: route.geometry.coordinates, // Already in lng,lat format
        duration: route.properties.summary.duration || 0,
        distance: route.properties.summary.distance || 0
      });
    }

    return res.status(404).json({ error: 'No route found' });

  } catch (error) {
    console.error('Error in route API:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}