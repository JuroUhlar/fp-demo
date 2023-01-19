
// const ContentSecurityPolicy = "base-uri 'self'; default-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.fptls.com https://fpjsfreferfrecdn.net https://*.fptls2.com https://eu.api.fpjs.io https://fpnpmcdn.net https://fpjscdn.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;";

// const securityHeaders = [
//   {
//     key: 'Content-Security-Policy',
//     value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
//   },
// ]

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // async headers() {
  //   return [
  //     {
  //       // Apply these headers to all routes in your application.
  //       source: '/:path*',
  //       headers: securityHeaders,
  //     },
  //   ]
  // },
}

module.exports = nextConfig;
