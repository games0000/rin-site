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
    console.log(`Exchanging code for token... Code: ${code.substring(0, 5)}...`);
    
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
    console.log('GitHub response:', JSON.stringify(data));

    if (data.error) {
      return new NextResponse(`
        <html>
          <body>
            <h1>Authentication Failed</h1>
            <p><strong>Error:</strong> ${data.error}</p>
            <p><strong>Description:</strong> ${data.error_description}</p>
            <hr />
            <h3>Debug Info:</h3>
            <ul>
              <li>Client ID (first 4 chars): ${OAUTH_CLIENT_ID?.substring(0, 4)}***</li>
              <li>Code provided: ${code ? 'Yes' : 'No'}</li>
              <li>Secret available: ${OAUTH_CLIENT_SECRET ? 'Yes' : 'No'}</li>
            </ul>
            <p><em>Please check your Vercel Environment Variables. If Client ID/Secret are correct, the code might have expired (do not refresh this page).</em></p>
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
        <button onclick="sendMsg()" style="padding: 10px 20px; font-size: 16px; cursor: pointer; background: #333; color: white; border: none; border-radius: 5px;">
          Click here if not redirected
        </button>
        <p style="font-size: 12px; color: #666; margin-top: 20px;">
          Debug info: Provider=${content.provider}
        </p>
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
