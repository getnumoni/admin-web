import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'Google Maps API key not configured' }, { status: 500 });
    }

    // Return the Google Maps JavaScript API script URL with the API key
    const scriptUrl = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`;

    return NextResponse.json({ scriptUrl });
  } catch (error) {
    console.error('Maps script error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
