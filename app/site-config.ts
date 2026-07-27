const localUrl = "http://localhost:3000";

function normalizeUrl(value: string | undefined) {
  if (!value) {
    return undefined;
  }

  const url = value.startsWith("http://") || value.startsWith("https://")
    ? value
    : `https://${value}`;

  return new URL(url);
}

const configuredUrl = normalizeUrl(
  process.env.NEXT_PUBLIC_SITE_URL
    ?? process.env.VERCEL_PROJECT_PRODUCTION_URL
    ?? process.env.VERCEL_URL,
);

export const siteUrl = configuredUrl ?? new URL(localUrl);
export const isPublicDeployment = configuredUrl !== undefined;
