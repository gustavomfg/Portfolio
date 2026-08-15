import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const localSiteUrl = "http://localhost:3000";
const initialScriptBudgetBytes = 900_000;
const responsiveWidths = [320, 430, 700, 1000] as const;

function getExpectedSiteUrl() {
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.NODE_ENV === "production" && !configuredSiteUrl) {
    throw new Error("Defina NEXT_PUBLIC_SITE_URL para executar os smoke tests de produção.");
  }

  return (configuredSiteUrl ?? localSiteUrl).replace(/\/+$/, "");
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

test("navegação, diálogo e acessibilidade no desktop", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chromium");
  const expectedSiteUrl = getExpectedSiteUrl();
  const firstResponse = await page.goto("/");
  const contentSecurityPolicy = firstResponse?.headers()["content-security-policy"];

  await expect(page.getByRole("main")).toHaveCount(1);
  await expect(page).toHaveTitle(
    "Gustavo Maquias — Análise e Desenvolvimento de Sistemas",
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    expectedSiteUrl,
  );
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
    "content",
    "website",
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    new RegExp(`^${escapeRegExp(expectedSiteUrl)}/opengraph-image\\?[a-f0-9]+$`),
  );
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    "content",
    "summary_large_image",
  );

  const robotsResponse = await page.request.get("/robots.txt");
  expect(robotsResponse.ok()).toBe(true);
  const robotsText = await robotsResponse.text();
  expect(robotsText).toContain(
    `Sitemap: ${expectedSiteUrl}/sitemap.xml`,
  );

  const sitemapResponse = await page.request.get("/sitemap.xml");
  expect(sitemapResponse.ok()).toBe(true);
  expect(await sitemapResponse.text()).toContain(
    `<loc>${expectedSiteUrl}/</loc>`,
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

test("URLs públicas em produção", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chromium");
  test.skip(process.env.NODE_ENV !== "production");

  const expectedSiteUrl = getExpectedSiteUrl();
  expect(expectedSiteUrl).not.toMatch(/^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(?::|\/|$)/);

  await page.goto("/");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    expectedSiteUrl,
  );

  const robotsResponse = await page.request.get("/robots.txt");
  expect(robotsResponse.ok()).toBe(true);
  const robotsText = await robotsResponse.text();
  expect(robotsText).toContain("Allow: /");
  expect(robotsText).not.toContain("Disallow: /");
  expect(robotsText).toContain(
    `Sitemap: ${expectedSiteUrl}/sitemap.xml`,
  );

  const sitemapResponse = await page.request.get("/sitemap.xml");
  expect(sitemapResponse.ok()).toBe(true);
  expect(await sitemapResponse.text()).toContain(
    `<loc>${expectedSiteUrl}/</loc>`,
  );
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
  await expect(page.locator('.hero-lanyard[data-lanyard-state="fallback"]')).toBeVisible();
  await expect(page.locator(".hero-lanyard-canvas canvas")).toHaveCount(0);
  const dotGridSize = await page.locator(".dot-grid__canvas").evaluate((element) => {
    const canvas = element as HTMLCanvasElement;
    return {
      width: canvas.width,
      height: canvas.height,
    };
  });
  expect(dotGridSize.width).toBeGreaterThan(0);
  expect(dotGridSize.height).toBeGreaterThan(0);
  expect(await page.evaluate(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  )).toBe(true);

  const accessibility = await new AxeBuilder({ page }).analyze();
  expect(accessibility.violations).toEqual([]);
});

test("carousel navega por setas, tabs e mantém imagens acessíveis", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chromium");
  await page.setViewportSize({ width: 1000, height: 900 });
  await page.goto("/");

  const carousel = page.locator(".depth-carousel-shell");
  await expect(page.getByRole("heading", { name: "SysMon" })).toBeVisible();
  await carousel.scrollIntoViewIfNeeded();
  await expect(carousel.locator(".depth-carousel__img")).toHaveCount(2);
  await expect(carousel.locator(".depth-carousel__img").first()).toHaveAttribute("loading", "lazy");

  const position = carousel.locator(".depth-carousel__position");
  await expect(position).toHaveText("01 / 02");
  await carousel.getByRole("button", { name: "Próxima evidência" }).click();
  await expect(position).toHaveText("02 / 02");
  await expect(carousel.locator('.depth-carousel__card').nth(1)).toHaveAttribute("aria-hidden", "false");
  await expect(carousel.locator('button[role="tab"][aria-selected="true"]')).toHaveAttribute(
    "aria-label",
    "Mostrar 02 / Pulse V2",
  );

  await carousel.locator('button[role="tab"][aria-label="Mostrar 01 / System Monitor"]').click();
  await expect(position).toHaveText("01 / 02");
  await carousel.getByRole("button", { name: "Evidência anterior" }).click();
  await expect(position).toHaveText("02 / 02");
});

test("carousel respeita reduced motion", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chromium");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const carousel = page.locator(".depth-carousel-shell");
  await carousel.scrollIntoViewIfNeeded();
  await expect.poll(() => page.evaluate(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  )).toBe(true);

  const cardMotion = await carousel.locator(".depth-carousel__card").first().evaluate((card) => {
    const styles = getComputedStyle(card);
    return {
      transitionProperty: styles.transitionProperty,
      animationName: styles.animationName,
      willChange: styles.willChange,
    };
  });
  expect(cardMotion.transitionProperty).toBe("none");
  expect(cardMotion.animationName).toBe("none");
  expect(cardMotion.willChange).toBe("auto");

  await carousel.getByRole("button", { name: "Próxima evidência" }).click();
  await expect(carousel.locator(".depth-carousel__position")).toHaveText("02 / 02");
});

test("hero monta a cena 3D na primeira viewport", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chromium");
  await page.goto("/");

  await expect(page.locator(".hero-lanyard-canvas canvas")).toBeVisible({ timeout: 15_000 });
  await expect(page.locator('.hero-lanyard[data-lanyard-state="fallback"]')).toHaveCount(0);
  await expect(page.locator(".hero-lanyard-stage")).toHaveAttribute("data-lanyard-state", "ready");
});

test("hero mantém o canvas 3D após interação", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chromium");
  await page.goto("/");
  await expect(page.locator(".hero-lanyard-canvas canvas")).toBeVisible({ timeout: 15_000 });
  await page.locator(".hero-lanyard-entry > div").dispatchEvent("pointerenter");
  await expect(page.locator(".hero-lanyard-canvas canvas")).toBeVisible({ timeout: 15_000 });
  const canvasSize = await page.locator(".hero-lanyard-canvas canvas").evaluate((element) => {
    const canvas = element as HTMLCanvasElement;
    return {
      width: canvas.width,
      height: canvas.height,
    };
  });
  expect(canvasSize.width).toBeGreaterThan(0);
  expect(canvasSize.height).toBeGreaterThan(0);
});

test("carousel permanece utilizável quando imagens falham", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chromium");
  await page.route("**/_next/image**", (route) => route.abort());
  await page.route("**/sysmon/**", (route) => route.abort());
  await page.goto("/");

  const carousel = page.locator(".depth-carousel-shell");
  await carousel.scrollIntoViewIfNeeded();
  await expect(carousel.locator(".depth-carousel__img")).toHaveCount(2);
  await expect(carousel.locator(".depth-carousel__img").first()).toHaveAttribute(
    "alt",
    /Interface completa do SysMon/,
  );
  await carousel.getByRole("button", { name: "Próxima evidência" }).click();
  await expect(carousel.locator(".depth-carousel__position")).toHaveText("02 / 02");
});

test("contato expõe links e navegação ativa", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chromium");
  await page.goto("/");

  const contact = page.locator("#contato");
  await contact.scrollIntoViewIfNeeded();
  await expect(contact.getByRole("link")).toHaveCount(3);
  await expect(contact.getByRole("link", { name: /gustavomfgdev@gmail.com/ })).toHaveAttribute(
    "href",
    "mailto:gustavomfgdev@gmail.com",
  );
  await expect(contact.getByRole("link", { name: /linkedin.com\/in\/gustavomfg/ })).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/gustavomfg",
  );
  await expect(contact.getByRole("link", { name: /github.com\/gustavomfg/ })).toHaveAttribute(
    "href",
    "https://github.com/gustavomfg",
  );
  await expect(contact.locator(".contact-channel.is-primary")).toHaveCount(1);
  await expect(page.getByRole("navigation", { name: "Navegação principal" }).getByRole("link", { name: "Contato" }))
    .toHaveAttribute("aria-current", "location");
});

test("primeira viewport respeita orçamento de JavaScript", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chromium");
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await expect(page.locator(".hero-lanyard-canvas canvas")).toBeVisible({ timeout: 15_000 });

  const scriptMetrics = await page.evaluate(() => {
    const sceneRequest = performance.getEntriesByName("hero-lanyard-scene-request")[0];
    const resources = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
    const scripts = resources
      .filter((resource) => resource.initiatorType === "script" && resource.name.includes("/_next/"))
      .map((resource) => ({
        startTime: resource.startTime,
        bytes: Math.max(resource.transferSize, resource.encodedBodySize),
      }));
    const initial = scripts.filter((resource) => !sceneRequest || resource.startTime < sceneRequest.startTime);
    const scene = scripts.filter((resource) => sceneRequest && resource.startTime >= sceneRequest.startTime);
    return {
      initialBytes: initial.reduce((total, resource) => total + resource.bytes, 0),
      sceneBytes: scene.reduce((total, resource) => total + resource.bytes, 0),
      sceneRequest: Boolean(sceneRequest),
    };
  });
  expect(scriptMetrics.sceneRequest).toBe(true);
  expect(scriptMetrics.initialBytes).toBeLessThan(initialScriptBudgetBytes);
  expect(scriptMetrics.sceneBytes).toBeGreaterThan(0);
});

test("limites responsivos mantêm superfícies principais contidas", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chromium");

  for (const width of responsiveWidths) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.locator(".hero")).toBeVisible();
    await page.locator("#contato").scrollIntoViewIfNeeded();

    const dimensions = await page.evaluate(() => ({
      innerWidth: window.innerWidth,
      regions: Array.from(document.querySelectorAll(".hero, .depth-carousel-shell, #contato, .contact-links")).map((element) => {
        const rect = element.getBoundingClientRect();
        return { left: rect.left, right: rect.right };
      }),
    }));
    expect(dimensions.regions.length).toBeGreaterThan(0);
    for (const region of dimensions.regions) {
      expect(region.left, `region starts outside viewport at ${width}px`).toBeGreaterThanOrEqual(-1);
      expect(region.right, `region ends outside viewport at ${width}px`).toBeLessThanOrEqual(dimensions.innerWidth + 1);
    }
  }
});
