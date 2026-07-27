import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("navegação, diálogo e acessibilidade no desktop", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chromium");
  const firstResponse = await page.goto("/");
  const contentSecurityPolicy = firstResponse?.headers()["content-security-policy"];

  expect(contentSecurityPolicy).toBeDefined();
  const scriptSource = contentSecurityPolicy?.match(/script-src [^;]+/)?.[0];
  expect(scriptSource).toContain("script-src 'self' 'nonce-");
  expect(scriptSource).toContain("'strict-dynamic'");
  expect(scriptSource).not.toContain("'unsafe-inline'");
  expect(scriptSource).not.toContain("'unsafe-eval'");

  const nonceMatch = contentSecurityPolicy?.match(/'nonce-([^']+)'/);
  const nonce = nonceMatch?.[1];
  expect(nonce).toBeTruthy();

  const scriptNonces = await page.locator("script").evaluateAll(
    (scripts) => scripts.map((script) => script.nonce),
  );
  expect(scriptNonces.length).toBeGreaterThan(0);
  expect(scriptNonces.every((scriptNonce) => scriptNonce === nonce)).toBe(true);

  const secondResponse = await page.request.get("/");
  const secondContentSecurityPolicy = secondResponse.headers()["content-security-policy"];
  const secondNonce = secondContentSecurityPolicy.match(/'nonce-([^']+)'/)?.[1];
  expect(secondNonce).toBeTruthy();
  expect(secondNonce).not.toBe(nonce);

  const notFoundResponse = await page.request.get("/rota-inexistente");
  const notFoundContentSecurityPolicy =
    notFoundResponse.headers()["content-security-policy"];
  expect(notFoundResponse.status()).toBe(404);
  expect(notFoundContentSecurityPolicy).toContain("script-src 'self' 'nonce-");
  expect(notFoundContentSecurityPolicy.match(/script-src [^;]+/)?.[0])
    .not.toContain("'unsafe-inline'");

  const mainNavigation = page.getByRole("navigation", { name: "Navegação principal" });
  await expect(mainNavigation.getByRole("link")).toHaveCount(4);
  await expect(mainNavigation.getByRole("link", { name: "Ecossistema" }))
    .toHaveAttribute("href", "#ecossistema");

  const projectTrigger = page.getByRole("button", {
    name: "Abrir detalhes de Nocturne Studio",
  });
  await projectTrigger.click();

  const dialog = page.getByRole("dialog", { name: "Nocturne Studio" });
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
  await expect(mobileNavigation.getByRole("link")).toHaveCount(4);
  await expect(mobileNavigation.getByRole("link", { name: /Contato/ }))
    .toHaveAttribute("href", "#contato");

  await page.keyboard.press("Escape");
  await expect(mobileNavigation).toBeHidden();
  await expect(menuButton).toBeFocused();

  const journeyHeight = await page.locator(".journey").evaluate(
    (element) => element.getBoundingClientRect().height,
  );
  const viewportHeight = await page.evaluate(() => window.innerHeight);
  expect(journeyHeight).toBeLessThan(viewportHeight * 2);
  expect(await page.evaluate(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  )).toBe(true);
  await expect(page.locator(".journey-identity")).toHaveCSS("display", "none");

  const accessibility = await new AxeBuilder({ page }).analyze();
  expect(accessibility.violations).toEqual([]);
});
