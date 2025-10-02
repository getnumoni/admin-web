import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const placeId = searchParams.get('place_id');

  if (!placeId) {
    return NextResponse.json({ error: 'Place ID parameter is required' }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${process.env.GOOGLE_MAPS_API_KEY}&fields=place_id,name,formatted_address,geometry`
    );

    const data = await response.json();

    if (data.status !== 'OK') {
      return NextResponse.json({ error: 'Place details API error', details: data }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Place details error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
