/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: [
      'localhost',
      'hcinterior.in',
      'apidev.hcinterior.in',
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
   compress: true,
  
  // Optimize JavaScript bundles
  swcMinify: true, // Use SWC for faster minification
  
  // Experimental optimizations
  experimental: {
    optimizePackageImports: [
      'react-icons', // Tree-shake react-icons to only import used icons
      'date-fns', // Tree-shake date-fns to only import used functions
    ],
  },
  async rewrites() {

    // Define city routes
    const citiesRoutes = [
      { source: '/interior-designers-in-noida', destination: '/services-detail?city=noida', },
      { source: '/interior-designers-in-greater-noida', destination: '/services-detail?city=greater_noida', },
      { source: '/interior-designers-in-delhi', destination: '/services-detail?city=delhi', },
      { source: '/interior-designers-in-gurgaon', destination: '/services-detail?city=gurugram', },
      { source: '/best-interior-designers-in-faridabad', destination: '/services-detail?city=faridabad', },
      { source: '/interior-designers-in-ghaziabad', destination: '/services-detail?city=ghaziabad', },
      { source: '/interior-designers-in-manesar', destination: '/services-detail?city=manesar', },
      { source: '/interior-designers-in-dwarka', destination: '/services-detail?city=dwarka', },
    ];

    // Combine static and blog routes
    const combinedRoutes = [...citiesRoutes];

    return combinedRoutes;

  },
};

export default nextConfig;