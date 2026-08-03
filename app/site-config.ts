const localUrl = "http://localhost:3000";
const isDevelopment = process.env.NODE_ENV === "development";

function normalizeUrl(value: string | undefined) {
  if (!value) {
    return undefined;
  }

  const normalizedValue = value.startsWith("http://") || value.startsWith("https://")
    ? value
    : `https://${value}`;
  const url = new URL(normalizedValue);
  const isLocalDevelopment =
    isDevelopment
    && url.protocol === "http:"
    && ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);

  if (url.protocol !== "https:" && !isLocalDevelopment) {
    throw new Error(
      "A URL pública do portfólio deve usar HTTPS.",
    );
  }

  return url;
}

const configuredUrl = normalizeUrl(
  process.env.NEXT_PUBLIC_SITE_URL
    ?? process.env.VERCEL_PROJECT_PRODUCTION_URL,
);

if (process.env.VERCEL === "1" && !configuredUrl) {
  throw new Error(
    "A URL pública do portfólio não está configurada. Defina NEXT_PUBLIC_SITE_URL.",
  );
}

const isPreviewDeployment =
  process.env.VERCEL_ENV !== undefined
  && process.env.VERCEL_ENV !== "production";

export const siteUrl = configuredUrl ?? new URL(localUrl);
export const isPublicDeployment = configuredUrl !== undefined && !isPreviewDeployment;
