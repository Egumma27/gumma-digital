/** @type {import('next').NextConfig} */
const nextConfig = {
  // The site has no server-side needs, so it exports to plain HTML and keeps
  // deploying to any static host — same as before the React port.
  // Build output lands in `out/`; publish that directory.
  output: "export",
};

export default nextConfig;
