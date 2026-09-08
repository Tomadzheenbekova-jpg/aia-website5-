/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Здесь позже можно указать домен, где будут храниться реальные фотографии
    // (например, домен CDN или Vercel Blob), если фото не лежат в /public.
    remotePatterns: [],
  },
};

export default nextConfig;
