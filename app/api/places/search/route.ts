import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${process.env.GOOGLE_MAPS_API_KEY}&region=ng`
    );

    const data = await response.json();

    if (data.status !== 'OK') {
      return NextResponse.json({ error: 'Places API error', details: data }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Places search error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
