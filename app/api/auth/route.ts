import { NextResponse } from 'next/server';

export async function GET() {
  const { OAUTH_CLIENT_ID } = process.env;
  
  if (!OAUTH_CLIENT_ID) {
    return NextResponse.json({ error: 'Missing OAUTH_CLIENT_ID' }, { status: 500 });
  }

  return NextResponse.redirect(
    `https://github.com/login/oauth/authorize?client_id=${OAUTH_CLIENT_ID}&scope=repo,user`
  );
}
