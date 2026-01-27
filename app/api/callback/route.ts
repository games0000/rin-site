import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const { OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET } = process.env;

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  if (!OAUTH_CLIENT_ID || !OAUTH_CLIENT_SECRET) {
    return NextResponse.json({ error: 'Missing OAuth credentials' }, { status: 500 });
  }

  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: OAUTH_CLIENT_ID,
        client_secret: OAUTH_CLIENT_SECRET,
        code,
      }),
    });

    const data = await response.json();

    if (data.error) {
      return NextResponse.json({ error: data.error_description || data.error }, { status: 400 });
    }

    const token = data.access_token;

    // Decap CMS expects a postMessage with the provider and token
    const html = `
      <script>
        const receiveMessage = (message) => {
          window.opener.postMessage(
            'authorization:github:success:${JSON.stringify({ token, provider: 'github' })}',
            message.origin
          );
        }
        window.addEventListener("message", receiveMessage, false);
        // Fallback for some versions of CMS
        window.opener.postMessage(
          'authorization:github:success:${JSON.stringify({ token, provider: 'github' })}',
          '*'
        );
      </script>
      <h1>Authentication successful</h1>
      <p>You can close this window now.</p>
    `;
    
    return new NextResponse(html, { 
      headers: { 'Content-Type': 'text/html' } 
    });
  } catch (error) {
    console.error('OAuth Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
