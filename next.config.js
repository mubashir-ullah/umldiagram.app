/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  async rewrites() {
    return [];
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.umldiagram.app' }],
        destination: 'https://umldiagram.app/:path*',
        permanent: true,
      },
      // Retired gallery / blog
      { source: '/gallery', destination: '/tools', permanent: true },
      { source: '/gallery/class-diagram', destination: '/tools/class-diagram-maker', permanent: true },
      { source: '/gallery/sequence-diagram', destination: '/tools/sequence-diagram-maker', permanent: true },
      { source: '/gallery/activity-diagram', destination: '/tools/activity-diagram-maker', permanent: true },
      { source: '/gallery/use-case-diagram', destination: '/tools/use-case-diagram-maker', permanent: true },
      { source: '/gallery/:slug', destination: '/tools', permanent: true },
      { source: '/blog', destination: '/tools', permanent: true },
      { source: '/blog/getting-started-with-uml-diagrams', destination: '/', permanent: true },
      { source: '/blog/mastering-sequence-diagrams', destination: '/tools/sequence-diagram-maker', permanent: true },
      { source: '/blog/ai-powered-diagram-generation', destination: '/', permanent: true },
      { source: '/blog/best-practices-for-class-diagrams', destination: '/tools/class-diagram-maker', permanent: true },
      { source: '/blog/activity-diagrams-for-workflow-modeling', destination: '/tools/activity-diagram-maker', permanent: true },
      { source: '/blog/state-diagrams-modeling-system-behavior', destination: '/tools/state-diagram-maker', permanent: true },
      { source: '/blog/use-case-diagrams-guide', destination: '/tools/use-case-diagram-maker', permanent: true },
      { source: '/blog/plantuml-online', destination: '/tools/plantuml-online', permanent: true },
      { source: '/blog/:slug', destination: '/tools', permanent: true },
      // Removed alternate-keyword / cannibalizing tool pages → canonical intents
      { source: '/tools/uml-class-diagram-online', destination: '/tools/class-diagram-maker', permanent: true },
      { source: '/tools/class-diagram-generator', destination: '/tools/class-diagram-maker', permanent: true },
      { source: '/tools/class-diagram-from-code', destination: '/tools/class-diagram-maker', permanent: true },
      { source: '/tools/state-machine-diagram-maker', destination: '/tools/state-diagram-maker', permanent: true },
      { source: '/tools/uml-diagram-maker', destination: '/', permanent: true },
      { source: '/tools/uml-diagram-generator', destination: '/', permanent: true },
      { source: '/tools/uml-diagram-online', destination: '/', permanent: true },
      { source: '/tools/free-uml-diagram-tool', destination: '/', permanent: true },
      { source: '/tools/plantuml-editor', destination: '/tools/plantuml-online', permanent: true },
      { source: '/tools/plantuml-sequence-diagram', destination: '/tools/sequence-diagram-maker', permanent: true },
      { source: '/tools/plantuml-class-diagram', destination: '/tools/class-diagram-maker', permanent: true },
      { source: '/tools/mermaid-class-diagram', destination: '/tools/class-diagram-maker', permanent: true },
      { source: '/tools/mermaid-sequence-diagram', destination: '/tools/sequence-diagram-maker', permanent: true },
      { source: '/tools/erd-diagram-online', destination: '/tools/er-diagram-maker', permanent: true },
      { source: '/tools/database-diagram-maker', destination: '/tools/er-diagram-maker', permanent: true },
      { source: '/tools/sequence-diagram-from-text', destination: '/tools/sequence-diagram-maker', permanent: true },
      { source: '/tools/uml-diagram-from-xml', destination: '/tools/plantuml-online', permanent: true },
      { source: '/tools/architecture-diagram-maker', destination: '/tools/c4-diagram-maker', permanent: true },
      { source: '/tools/user-flow-diagram-maker', destination: '/tools/activity-diagram-maker', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
};

export default nextConfig;
