/** @type {import('next').NextConfig} */
const nextConfig = {
  // !TODO: Config momentanea para evitar errores de CORS
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
    ],
  },
}

export default nextConfig
