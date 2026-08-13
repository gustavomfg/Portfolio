const localUrl = "http://localhost:3000";
const isDevelopment = process.env.NODE_ENV === "development";
const isProduction = process.env.NODE_ENV === "production";
const localHostnames = ["localhost", "127.0.0.1", "[::1]"];

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
    && localHostnames.includes(url.hostname);

  if (localHostnames.includes(url.hostname) && !isLocalDevelopment) {
    throw new Error(
      "A URL pública do portfólio não pode apontar para um endereço local fora do desenvolvimento.",
    );
  }

  if (url.protocol !== "https:" && !isLocalDevelopment) {
    throw new Error(
      "A URL pública do portfólio deve usar HTTPS.",
    );
  }

  return url;
}

const configuredUrl = normalizeUrl(
  process.env.NEXT_PUBLIC_SITE_URL,
);

if (isProduction && !configuredUrl) {
  throw new Error(
    "A URL pública do portfólio é obrigatória em produção. Defina NEXT_PUBLIC_SITE_URL.",
  );
}

const isPreviewDeployment =
  process.env.VERCEL_ENV !== undefined
  && process.env.VERCEL_ENV !== "production";

export const siteUrl = configuredUrl ?? new URL(localUrl);
export const isPublicDeployment = configuredUrl !== undefined && !isPreviewDeployment;
