import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[{
      protocol: "https",
      hostname: "g5tnqosfnyx2sj1l.public.blob.vercel-storage.com"
    }]
  }
};

export default nextConfig;
