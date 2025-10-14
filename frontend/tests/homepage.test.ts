import { test, expect } from '@playwright/test';

test('homepage loads and shows correct header and tabs', async ({ page }) => {
  await page.goto('http://ec2-52-90-166-209.compute-1.amazonaws.com/', { timeout: 60000 });

  // Check main header text
  const header = page.locator('h1#title');
  await expect(header).toHaveText('Assignment 2');

  // Check TabManager is visible (by looking for the main heading of TabManager)
  const tabManagerHeading = page.locator('h2', { hasText: 'Text to HTML Code Generator' });
  await expect(tabManagerHeading).toHaveCount(1);

  // Optional: take screenshot
  await page.screenshot({ path: 'homepage_test.png' });
});
