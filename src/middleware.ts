import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * This middleware runs on every requests and redirects from fingerprinthub.com/* to demo.fingerprint.com/*
 */
export function middleware(request: NextRequest) {
  console.log('old url: ', request.nextUrl);
  console.log(request.url);
  // To-do: Change to fingerprinthub.com
  if (request.nextUrl.hostname === 'staging.fingerprinthub.com') {
    const newURL = request.nextUrl.clone();
    newURL.host = 'demo.fingerprint.com';
    // Uncomment for testing on localhost
    // newURL.protocol = 'https';
    // newURL.port = '';
    console.log('new url: ', newURL);
    return NextResponse.redirect(newURL);
  }
}
