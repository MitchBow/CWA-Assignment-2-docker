import { test, expect } from '@playwright/test';

test('courtroom page loads and shows key components', async ({ page }) => {
  await page.goto('http://ec2-52-90-166-209.compute-1.amazonaws.com/court-room', { timeout: 60000 });

  // 1️⃣ Header exists
  const header = page.locator('h1#title');
  await expect(header).toHaveText('Assignment 2');

  // 2️⃣ Login form exists
  const usernameInput = page.locator('input[placeholder="Username"]');
  const passwordInput = page.locator('input[placeholder="Password"]');
  await expect(usernameInput).toHaveCount(1);
  await expect(passwordInput).toHaveCount(1);

  // 3️⃣ Countdown Timer exists (use visible heading)
  const timerHeading = page.locator('text=Countdown Timer');
  await expect(timerHeading).toHaveCount(1);

  // 4️⃣ StageManager shows Stage 1
  const stageHeading = page.locator('h2', { hasText: 'Stage 1' });
  await expect(stageHeading).toHaveCount(1);

  // 5️⃣ Courtroom modal should not be visible initially
  const courtroomModal = page.locator('h1', { hasText: '⚖️ Courtroom' });
  await expect(courtroomModal).toHaveCount(0);

  // Optional: screenshot
  await page.screenshot({ path: 'courtroom_test.png' });
});
