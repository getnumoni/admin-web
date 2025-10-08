import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // Ensure only POST method is allowed
  if (request.method !== 'POST') {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    //get bank credentials from environment variables
    const payOnUsSecret = process.env.PAY_ON_US_SECRET_KEY;
    const payOnUsClientId = process.env.PAY_ON_US_CLIENT_ID;
    const payOnUsUrl = process.env.PAY_ON_US_URL;

    if (!payOnUsSecret || !payOnUsClientId || !payOnUsUrl) {
      return NextResponse.json({ error: " credentials not configured" }, { status: 500 });
    }

    //make api request and check method
    const response = await fetch(`${payOnUsUrl}/api/v1/access-token?apiClientId=${payOnUsClientId}&apiClientSecret=${payOnUsSecret}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiClientId: payOnUsClientId,
        apiClientSecret: payOnUsSecret
      })
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to generate pay on us token" }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Pay on us token generation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}