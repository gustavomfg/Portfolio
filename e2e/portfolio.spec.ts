import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("navegação, diálogo e acessibilidade no desktop", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chromium");
  const firstResponse = await page.goto("/");
  const contentSecurityPolicy = firstResponse?.headers()["content-security-policy"];

  await expect(page.getByRole("main")).toHaveCount(1);
  await expect(page).toHaveTitle(
    "Gustavo Maquias — Análise e Desenvolvimento de Sistemas",
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "http://localhost:3000",
  );
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
    "content",
    "website",
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    /^http:\/\/localhost:3000\/opengraph-image\?[a-f0-9]+$/,
  );
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    "content",
    "summary_large_image",
  );

  const robotsResponse = await page.request.get("/robots.txt");
  expect(robotsResponse.ok()).toBe(true);
  expect(await robotsResponse.text()).toContain(
    "Sitemap: http://localhost:3000/sitemap.xml",
  );

  const sitemapResponse = await page.request.get("/sitemap.xml");
  expect(sitemapResponse.ok()).toBe(true);
  expect(await sitemapResponse.text()).toContain(
    "<loc>http://localhost:3000/</loc>",
  );

  for (const imagePath of ["/opengraph-image", "/twitter-image"]) {
    const imageResponse = await page.request.get(imagePath);
    expect(imageResponse.ok()).toBe(true);
    expect(imageResponse.headers()["content-type"]).toContain("image/png");
  }

  expect(contentSecurityPolicy).toBeDefined();
  const scriptSource = contentSecurityPolicy?.match(/script-src [^;]+/)?.[0];
  expect(scriptSource).toContain("script-src 'self' 'unsafe-inline'");
  expect(scriptSource).not.toContain("'unsafe-eval'");
  expect(contentSecurityPolicy).toContain("object-src 'none'");
  expect(contentSecurityPolicy).toContain("frame-ancestors 'none'");

  const notFoundResponse = await page.request.get("/rota-inexistente");
  const notFoundContentSecurityPolicy =
    notFoundResponse.headers()["content-security-policy"];
  expect(notFoundResponse.status()).toBe(404);
  expect(notFoundContentSecurityPolicy).toContain("script-src 'self' 'unsafe-inline'");

  const mainNavigation = page.getByRole("navigation", { name: "Navegação principal" });
  await expect(mainNavigation.getByRole("link")).toHaveCount(3);
  await expect(mainNavigation.getByRole("link", { name: "Projetos" }))
    .toHaveAttribute("href", "#projetos");
  await expect(page.getByRole("link", { name: /Currículo/ }).first())
    .toHaveAttribute("href", "/curriculo-gustavo-maquias.pdf");
  const studioVersion = page.locator(".studio-feature-heading > span").nth(1);
  await expect(studioVersion).toBeVisible();
  await expect(studioVersion).toHaveText(/^v\d+\.\d+\.\d+(?:-[a-z0-9.-]+)?$/i);
  await expect(page.getByRole("heading", { name: "SysMon" })).toBeVisible();

  const projectTrigger = page.locator(".project-index-item").first().getByRole("button", {
    name: /Abrir detalhes de/,
  });
  await projectTrigger.click();

  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(page.getByRole("button", { name: "Fechar detalhes do projeto" })).toBeFocused();
  await expect(page.locator("#conteudo")).toHaveAttribute("inert", "");

  const openDialogAccessibility = await new AxeBuilder({ page }).analyze();
  expect(openDialogAccessibility.violations).toEqual([]);

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(projectTrigger).toBeFocused();

  const accessibility = await new AxeBuilder({ page }).analyze();
  expect(accessibility.violations).toEqual([]);
});

test("menu móvel, links e reduced motion", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile-chromium");
  await page.goto("/");

  const menuButton = page.getByRole("button", { name: "Abrir menu" });
  await menuButton.click();

  const mobileNavigation = page.getByRole("navigation", { name: "Navegação móvel" });
  await expect(mobileNavigation).toBeVisible();
  await expect(mobileNavigation.getByRole("link")).toHaveCount(3);
  await expect(mobileNavigation.getByRole("link", { name: /Contato/ }))
    .toHaveAttribute("href", "#contato");

  await page.keyboard.press("Escape");
  await expect(mobileNavigation).toBeHidden();
  await expect(menuButton).toBeFocused();

  await expect(page.locator(".hero")).toBeVisible();
  await expect(page.locator(".studio-feature")).toBeVisible();
  expect(await page.evaluate(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  )).toBe(true);

  const accessibility = await new AxeBuilder({ page }).analyze();
  expect(accessibility.violations).toEqual([]);
});
