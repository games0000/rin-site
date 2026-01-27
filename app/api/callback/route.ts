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
      return new NextResponse(`
        <html>
          <body>
            <h1>Error</h1>
            <p>${data.error_description || data.error}</p>
          </body>
        </html>
      `, { status: 400, headers: { 'Content-Type': 'text/html' } });
    }

    const token = data.access_token;

    // Decap CMS expects a postMessage with the provider and token
    const content = {
      token,
      provider: 'github'
    };

    const html = `
      <!DOCTYPE html>
      <html>
      <body>
      <script>
        const content = ${JSON.stringify(content)};
        const msg = 'authorization:github:success:' + JSON.stringify(content);
        
        function sendMsg() {
          if (window.opener) {
            console.log('Sending message to opener:', msg);
            window.opener.postMessage(msg, '*');
          } else {
            console.error('No window.opener found');
            document.getElementById('status').innerText = 'Error: No window.opener found. Please close this window and try again.';
          }
        }

        // Send immediately
        sendMsg();
        
        // Also listen for handshake
        window.addEventListener("message", (e) => {
          if (e.data === "authorizing:github") {
            console.log('Received handshake, sending message...');
            window.opener.postMessage(msg, e.origin);
          }
        }, false);
      </script>
      <div style="text-align: center; margin-top: 50px; font-family: sans-serif;">
        <h1 id="status">Authentication successful</h1>
        <p>You can close this window now.</p>
        <p style="font-size: 12px; color: #666;">If the window doesn't close automatically, check the console for errors.</p>
      </div>
      </body>
      </html>
    `;
    
    return new NextResponse(html, { 
      headers: { 'Content-Type': 'text/html' } 
    });
  } catch (error) {
    console.error('OAuth Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
