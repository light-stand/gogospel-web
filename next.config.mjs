import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./common/utils/i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["es", "en"],
    defaultLocale: "en",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bawvmoyvwwzdkjmsagqe.supabase.co",
        port: "",
        pathname: "/storage/v1/object/**",
      },
      {
        protocol: "https",
        hostname: "unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
