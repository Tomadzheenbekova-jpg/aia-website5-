/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Здесь позже можно указать домен, где будут храниться реальные фотографии
    // (например, домен CDN или Vercel Blob), если фото не лежат в /public.
    remotePatterns: process.env.NEXT_PUBLIC_SUPABASE_URL ? [{
      protocol: 'https', hostname: new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname,
      pathname: '/storage/v1/object/public/aia-media/**',
    }] : [],
  },
};

export default nextConfig;
