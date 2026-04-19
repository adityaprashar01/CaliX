import { test, expect } from "@playwright/test";

test("landing page renders brand line on mobile", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("CaliX");
  await expect(page.getByText("Level Up Your Body")).toBeVisible();
});
